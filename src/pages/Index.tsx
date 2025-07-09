import { useTranslation } from "react-i18next";
import { Sheet } from "@/components/ui/sheet";
import { HeaderSection } from "@/components/home/HeaderSection";
import { FilterControls } from "@/components/home/FilterControls";
import { ListingCard } from "@/components/home/ListingCard";
import { CreateListingDialog } from "@/components/home/CreateListingDialog";
import { CreateListingSheet } from "@/components/home/CreateListingSheet";
import { useSettings } from "@/components/home/hooks/useSettings";
import { useListings } from "@/components/home/hooks/useListings";
import { useFilters } from "@/components/home/hooks/useFilters";
import { useDialogs } from "@/components/home/hooks/useDialogs";

const Index = () => {
  const { t } = useTranslation();

  // Custom hooks for state management
  const {
    language,
    darkMode,
    isAdminMode,
    setDarkMode,
    setIsAdminMode,
    changeLanguage,
  } = useSettings();

  const { listings, addListing, deleteListing, togglePin } =
    useListings(language);

  const {
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
  } = useFilters();

  const {
    isAddListingMobileOpen,
    setIsAddListingMobileOpen,
    isAddListingDesktopOpen,
    setIsAddListingDesktopOpen,
    handleEditListing,
  } = useDialogs();

  // Categories and currencies
  const categories = [
    { id: "gaming", name: t("categories.gaming") },
    { id: "finance", name: t("categories.finance") },
    { id: "education", name: t("categories.education") },
    { id: "music", name: t("categories.music") },
    { id: "it", name: t("categories.it") },
  ];

  const currencies = ["USD", "EUR", "RUB", "LTC"];

  // Get filtered and sorted listings
  const filteredListings = getFilteredAndSortedListings(listings, isAdminMode);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-[#2F3136] text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header */}
      <HeaderSection
        language={language}
        darkMode={darkMode}
        isAdminMode={isAdminMode}
        currentView={currentView}
        isAddListingMobileOpen={isAddListingMobileOpen}
        setLanguage={() => {}}
        setDarkMode={setDarkMode}
        setIsAdminMode={setIsAdminMode}
        setCurrentView={setCurrentView}
        setIsAddListingMobileOpen={setIsAddListingMobileOpen}
        setIsAddListingDesktopOpen={setIsAddListingDesktopOpen}
        changeLanguage={changeLanguage}
      />

      {/* Filter Controls */}
      <FilterControls
        language={language}
        darkMode={darkMode}
        searchTerm={searchTerm}
        selectedCategories={selectedCategories}
        selectedCurrencies={selectedCurrencies}
        sortBy={sortBy}
        viewMode={viewMode}
        categories={categories}
        currencies={currencies}
        setSearchTerm={setSearchTerm}
        setSelectedCategories={setSelectedCategories}
        setSelectedCurrencies={setSelectedCurrencies}
        setSortBy={setSortBy}
        setViewMode={setViewMode}
        handleCategoryChange={handleCategoryChange}
        handleCurrencyChange={handleCurrencyChange}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            {currentView === "listings"
              ? language === "en"
                ? "Public Listings"
                : "Публичные объявления"
              : language === "en"
                ? "My Listings"
                : "Мои объявления"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {language === "en"
              ? `${filteredListings.length} listing(s) found`
              : `Найдено ${filteredListings.length} объявлений`}
          </p>
        </div>

        {/* Listings Grid/List */}
        <div className="pb-8">
          {viewMode === "gallery" ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredListings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  language={language}
                  darkMode={darkMode}
                  isAdminMode={isAdminMode}
                  viewMode={viewMode}
                  onEdit={listing.isOwner ? handleEditListing : undefined}
                  onDelete={deleteListing}
                  onTogglePin={togglePin}
                  t={t}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredListings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  language={language}
                  darkMode={darkMode}
                  isAdminMode={isAdminMode}
                  viewMode={viewMode}
                  onEdit={listing.isOwner ? handleEditListing : undefined}
                  onDelete={deleteListing}
                  onTogglePin={togglePin}
                  t={t}
                />
              ))}
            </div>
          )}

          {filteredListings.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-500 text-lg mb-2">
                {language === "en"
                  ? "No listings found"
                  : "Объявления не найдены"}
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {language === "en"
                  ? "Try adjusting your search or filters"
                  : "Попробуйте изменить поиск или фильтры"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Create Listing Dialog (Desktop) */}
      <CreateListingDialog
        open={isAddListingDesktopOpen}
        onOpenChange={setIsAddListingDesktopOpen}
        language={language}
        darkMode={darkMode}
        onSave={addListing}
      />

      {/* Create Listing Sheet (Mobile) */}
      <Sheet
        open={isAddListingMobileOpen}
        onOpenChange={setIsAddListingMobileOpen}
      >
        <CreateListingSheet
          language={language}
          darkMode={darkMode}
          onClose={() => setIsAddListingMobileOpen(false)}
          onSave={addListing}
        />
      </Sheet>
    </div>
  );
};

export default Index;
