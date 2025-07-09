import { useState, useMemo } from "react";
import { Listing, SortBy, ViewMode, CurrentView } from "../types";

export function useFilters() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortBy>("newest");
  const [viewMode, setViewMode] = useState<ViewMode>("gallery");
  const [currentView, setCurrentView] = useState<CurrentView>("listings");

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories((prev) => [...prev, categoryId]);
    } else {
      setSelectedCategories((prev) => prev.filter((id) => id !== categoryId));
    }
  };

  const handleCurrencyChange = (currency: string, checked: boolean) => {
    if (checked) {
      setSelectedCurrencies((prev) => [...prev, currency]);
    } else {
      setSelectedCurrencies((prev) => prev.filter((c) => c !== currency));
    }
  };

  const getFilteredAndSortedListings = (
    listings: Listing[],
    isAdminMode: boolean,
  ) => {
    return useMemo(() => {
      let filtered = listings.filter((listing) => {
        const matchesSearch =
          listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          listing.description.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory =
          selectedCategories.length === 0 ||
          selectedCategories.includes(listing.category);

        const matchesCurrency =
          selectedCurrencies.length === 0 ||
          selectedCurrencies.includes(listing.currency);

        const matchesView =
          currentView === "listings" ? !listing.isOwner : listing.isOwner;

        return (
          matchesSearch && matchesCategory && matchesCurrency && matchesView
        );
      });

      // Sort listings
      filtered.sort((a, b) => {
        // Always put pinned items first if admin mode
        if (isAdminMode) {
          if (a.isPinned && !b.isPinned) return -1;
          if (!a.isPinned && b.isPinned) return 1;
        }

        switch (sortBy) {
          case "oldest":
            return a.id.localeCompare(b.id);
          case "price_low":
            return a.price - b.price;
          case "price_high":
            return b.price - a.price;
          case "popular":
            return b.views - a.views;
          case "newest":
          default:
            return b.id.localeCompare(a.id);
        }
      });

      return filtered;
    }, [
      listings,
      searchTerm,
      selectedCategories,
      selectedCurrencies,
      sortBy,
      currentView,
      isAdminMode,
    ]);
  };

  return {
    searchTerm,
    setSearchTerm,
    selectedCategories,
    setSelectedCategories,
    selectedCurrencies,
    setSelectedCurrencies,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    currentView,
    setCurrentView,
    handleCategoryChange,
    handleCurrencyChange,
    getFilteredAndSortedListings,
  };
}
