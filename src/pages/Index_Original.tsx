import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Icon from "@/components/ui/icon";

// Types
interface Listing {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  currency: string;
  serverLink: string;
  members: number;
  views: number;
  clicks: number;
  timeAgo: string;
  serverName: string;
  isOwner?: boolean;
  isPinned?: boolean;
}

interface NewListing {
  title: string;
  description: string;
  category: string;
  price: string;
  currency: string;
  serverLink: string;
}

type ViewMode = "gallery" | "list";
type CurrentView = "listings" | "myListings";
type SortBy = "newest" | "oldest" | "price_low" | "price_high" | "popular";

const Index = () => {
  const { t, i18n } = useTranslation();

  // State management
  const [language, setLanguage] = useState<string>("en");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<CurrentView>("listings");
  const [viewMode, setViewMode] = useState<ViewMode>("gallery");
  const [sortBy, setSortBy] = useState<SortBy>("newest");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>([]);
  const [isAddListingMobileOpen, setIsAddListingMobileOpen] = useState(false);
  const [isAddListingDesktopOpen, setIsAddListingDesktopOpen] = useState(false);
  const [listings, setListings] = useState<Listing[]>([]);
  const [newListing, setNewListing] = useState<NewListing>({
    title: "",
    description: "",
    category: "",
    price: "",
    currency: "USD",
    serverLink: "",
  });

  // Categories and currencies
  const categories = [
    { id: "gaming", name: t("categories.gaming") },
    { id: "finance", name: t("categories.finance") },
    { id: "education", name: t("categories.education") },
    { id: "music", name: t("categories.music") },
    { id: "it", name: t("categories.it") },
  ];

  const currencies = ["USD", "EUR", "RUB", "LTC"];

  // Sample data
  useEffect(() => {
    const sampleListings: Listing[] = [
      {
        id: "1",
        title: "Premium Gaming Community",
        description:
          "A thriving gaming community with active members and great engagement",
        category: "gaming",
        price: 299,
        currency: "USD",
        serverLink: "https://discord.gg/example1",
        members: 15420,
        views: 1250,
        clicks: 85,
        timeAgo: "2 hours ago",
        serverName: "GameHub Elite",
        isOwner: true,
        isPinned: true,
      },
      {
        id: "2",
        title: "Crypto Trading Hub",
        description:
          "Professional cryptocurrency trading signals and market analysis",
        category: "finance",
        price: 199,
        currency: "EUR",
        serverLink: "https://discord.gg/example2",
        members: 8750,
        views: 950,
        clicks: 62,
        timeAgo: "5 hours ago",
        serverName: "CryptoTraders Pro",
        isOwner: false,
        isPinned: false,
      },
      {
        id: "3",
        title: "Music Production Studio",
        description:
          "Learn music production, share beats, and collaborate with other artists",
        category: "music",
        price: 149,
        currency: "USD",
        serverLink: "https://discord.gg/example3",
        members: 12300,
        views: 1180,
        clicks: 73,
        timeAgo: "1 day ago",
        serverName: "BeatMakers United",
        isOwner: false,
        isPinned: false,
      },
      {
        id: "4",
        title: "Programming & Development",
        description:
          "Coding tutorials, project collaboration, and career guidance",
        category: "it",
        price: 89,
        currency: "USD",
        serverLink: "https://discord.gg/example4",
        members: 22100,
        views: 1850,
        clicks: 142,
        timeAgo: "3 days ago",
        serverName: "CodeCrafters",
        isOwner: true,
        isPinned: false,
      },
      {
        id: "5",
        title: "Educational Resources Hub",
        description:
          "Study materials, tutoring, and academic support for all levels",
        category: "education",
        price: 59,
        currency: "EUR",
        serverLink: "https://discord.gg/example5",
        members: 18900,
        views: 1420,
        clicks: 95,
        timeAgo: "1 week ago",
        serverName: "StudyBuddy Network",
        isOwner: false,
        isPinned: false,
      },
    ];
    setListings(sampleListings);
  }, []);

  // Language change handler
  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  // Filter handlers
  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId),
      );
    }
  };

  const handleCurrencyChange = (currency: string, checked: boolean) => {
    if (checked) {
      setSelectedCurrencies([...selectedCurrencies, currency]);
    } else {
      setSelectedCurrencies(selectedCurrencies.filter((c) => c !== currency));
    }
  };

  // Listing handlers
  const addListing = (listing: NewListing) => {
    const newListingWithId: Listing = {
      id: Date.now().toString(),
      ...listing,
      price: parseInt(listing.price),
      members: Math.floor(Math.random() * 20000) + 1000,
      views: Math.floor(Math.random() * 2000) + 100,
      clicks: Math.floor(Math.random() * 200) + 10,
      timeAgo: "Just now",
      serverName: `Server ${Date.now()}`,
      isOwner: true,
      isPinned: false,
    };
    setListings([newListingWithId, ...listings]);
    setNewListing({
      title: "",
      description: "",
      category: "",
      price: "",
      currency: "USD",
      serverLink: "",
    });
  };

  const deleteListing = (id: string) => {
    setListings(listings.filter((listing) => listing.id !== id));
  };

  const togglePin = (id: string) => {
    setListings(
      listings.map((listing) =>
        listing.id === id
          ? { ...listing, isPinned: !listing.isPinned }
          : listing,
      ),
    );
  };

  const handleEditListing = (listing: Listing) => {
    // Edit functionality would go here
    console.log("Edit listing:", listing);
  };

  // Get filtered and sorted listings
  const getFilteredAndSortedListings = () => {
    let filtered = listings;

    // Filter by current view
    if (currentView === "myListings") {
      filtered = filtered.filter((listing) => listing.isOwner);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (listing) =>
          listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          listing.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          listing.serverName.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((listing) =>
        selectedCategories.includes(listing.category),
      );
    }

    // Filter by currencies
    if (selectedCurrencies.length > 0) {
      filtered = filtered.filter((listing) =>
        selectedCurrencies.includes(listing.currency),
      );
    }

    // Sort listings
    filtered.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;

      switch (sortBy) {
        case "newest":
          return new Date(b.timeAgo).getTime() - new Date(a.timeAgo).getTime();
        case "oldest":
          return new Date(a.timeAgo).getTime() - new Date(b.timeAgo).getTime();
        case "price_low":
          return a.price - b.price;
        case "price_high":
          return b.price - a.price;
        case "popular":
          return b.views - a.views;
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredListings = getFilteredAndSortedListings();

  // Listing Card Component
  const ListingCard = ({ listing }: { listing: Listing }) => {
    if (viewMode === "gallery") {
      return (
        <Card
          className={`transition-all duration-300 hover:shadow-lg ${
            darkMode
              ? "bg-[#36393F] border-gray-600"
              : "bg-white border-gray-200"
          }`}
        >
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-2">
              <div className="flex-1 w-full">
                <div className="flex items-start justify-between">
                  <CardTitle
                    className={`text-base sm:text-lg font-semibold mb-2 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {listing.title}
                  </CardTitle>
                  {isAdminMode && (
                    <div className="flex items-center space-x-2 ml-2">
                      <Checkbox
                        id={`pin-${listing.id}`}
                        checked={listing.isPinned || false}
                        onCheckedChange={() => togglePin(listing.id)}
                        className="data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500"
                      />
                      <label
                        htmlFor={`pin-${listing.id}`}
                        className="text-xs text-gray-600 dark:text-gray-400 cursor-pointer"
                        title={t("listing.pin")}
                      >
                        <Icon name="Pin" size={12} />
                      </label>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteListing(listing.id)}
                        className="p-2"
                      >
                        <Icon name="Trash2" size={14} />
                      </Button>
                    </div>
                  )}
                </div>
                <p
                  className={`text-xs sm:text-sm ${
                    darkMode ? "text-gray-100" : "text-gray-600"
                  }`}
                >
                  {listing.description}
                </p>
              </div>
              <div className="text-right w-full sm:w-auto">
                <div className="text-lg sm:text-xl font-bold text-[#5865F2]">
                  {listing.price.toLocaleString()} {listing.currency}
                </div>
                <div
                  className={`text-xs ${
                    darkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  {listing.timeAgo}
                </div>
                {listing.isPinned && (
                  <Badge
                    variant="secondary"
                    className="mt-1 text-xs bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-100 dark:border-yellow-600"
                  >
                    <Icon name="Pin" size={10} className="mr-1" />
                    {t("listing.pinned")}
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon
                    name="MessageSquare"
                    className="text-[#5865F2]"
                    size={16}
                  />
                  <span
                    className={`text-sm font-medium ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {listing.serverName}
                  </span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {listing.category}
                </Badge>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Icon
                      name="Users"
                      size={14}
                      className={darkMode ? "text-gray-300" : "text-gray-600"}
                    />
                    <span
                      className={darkMode ? "text-gray-200" : "text-gray-700"}
                    >
                      {listing.members.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon
                      name="Eye"
                      size={14}
                      className={darkMode ? "text-gray-300" : "text-gray-600"}
                    />
                    <span
                      className={darkMode ? "text-gray-200" : "text-gray-700"}
                    >
                      {listing.views}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon
                      name="MousePointerClick"
                      size={14}
                      className={darkMode ? "text-gray-300" : "text-gray-600"}
                    />
                    <span
                      className={darkMode ? "text-gray-200" : "text-gray-700"}
                    >
                      {listing.clicks}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <Button
                  size="sm"
                  className="bg-[#5865F2] hover:bg-[#4752C4] text-white flex-1 mr-2"
                  onClick={() => window.open(listing.serverLink, "_blank")}
                >
                  <Icon name="ExternalLink" className="mr-1" size={14} />
                  {language === "en" ? "Visit Server" : "Перейти на сервер"}
                </Button>
                {listing.isOwner && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditListing(listing)}
                    className="px-3"
                  >
                    <Icon name="Edit" size={14} />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    // List view
    return (
      <Card
        className={`transition-all duration-300 hover:shadow-md ${
          darkMode ? "bg-[#36393F] border-gray-600" : "bg-white border-gray-200"
        }`}
      >
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <CardTitle
                  className={`text-base sm:text-lg font-semibold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {listing.title}
                </CardTitle>
                {isAdminMode && (
                  <div className="flex items-center space-x-2 ml-2">
                    <Checkbox
                      id={`pin-list-${listing.id}`}
                      checked={listing.isPinned || false}
                      onCheckedChange={() => togglePin(listing.id)}
                      className="data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500"
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteListing(listing.id)}
                      className="p-1"
                    >
                      <Icon name="Trash2" size={12} />
                    </Button>
                  </div>
                )}
              </div>

              <p
                className={`text-xs sm:text-sm mb-3 ${
                  darkMode ? "text-gray-100" : "text-gray-600"
                }`}
              >
                {listing.description}
              </p>

              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Icon
                    name="MessageSquare"
                    className="text-[#5865F2]"
                    size={16}
                  />
                  <span className={darkMode ? "text-white" : "text-gray-900"}>
                    {listing.serverName}
                  </span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {listing.category}
                </Badge>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Icon
                      name="Users"
                      size={14}
                      className={darkMode ? "text-gray-300" : "text-gray-600"}
                    />
                    <span
                      className={darkMode ? "text-gray-200" : "text-gray-700"}
                    >
                      {listing.members.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon
                      name="Eye"
                      size={14}
                      className={darkMode ? "text-gray-300" : "text-gray-600"}
                    />
                    <span
                      className={darkMode ? "text-gray-200" : "text-gray-700"}
                    >
                      {listing.views}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon
                      name="MousePointerClick"
                      size={14}
                      className={darkMode ? "text-gray-300" : "text-gray-600"}
                    />
                    <span
                      className={darkMode ? "text-gray-200" : "text-gray-700"}
                    >
                      {listing.clicks}
                    </span>
                  </div>
                  <span
                    className={`text-xs ${
                      darkMode ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    {listing.timeAgo}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between w-full sm:w-auto sm:flex-col sm:items-end sm:text-right">
              <div className="text-lg sm:text-xl font-bold text-[#5865F2] sm:mb-2">
                {listing.price.toLocaleString()} {listing.currency}
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Button
                  size="sm"
                  className="bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs sm:text-sm px-2 sm:px-3"
                  onClick={() => window.open(listing.serverLink, "_blank")}
                >
                  <Icon name="ExternalLink" className="mr-1" size={12} />
                  {language === "en" ? "Visit" : "Перейти"}
                </Button>
                {listing.isOwner && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditListing(listing)}
                    className="text-xs sm:text-sm px-2 sm:px-3"
                  >
                    <Icon name="Edit" className="mr-1" size={12} />
                    {language === "en" ? "Edit" : "Ред."}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
    );
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-[#2F3136] text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2F3136]">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Icon name="Server" size={24} className="text-[#5865F2]" />
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Discord Ads
                </h1>
              </div>

              <div className="hidden sm:flex items-center space-x-2">
                <Button
                  variant={currentView === "listings" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentView("listings")}
                  className={
                    currentView === "listings"
                      ? "bg-[#5865F2] hover:bg-[#4752C4]"
                      : ""
                  }
                >
                  <Icon name="Globe" className="mr-1" size={14} />
                  {language === "en" ? "Public" : "Публичные"}
                </Button>
                <Button
                  variant={currentView === "myListings" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentView("myListings")}
                  className={
                    currentView === "myListings"
                      ? "bg-[#5865F2] hover:bg-[#4752C4]"
                      : ""
                  }
                >
                  <Icon name="User" className="mr-1" size={14} />
                  {language === "en" ? "My Listings" : "Мои объявления"}
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Label
                  htmlFor="language-switch"
                  className="text-sm font-medium"
                >
                  {language === "en" ? "EN" : "RU"}
                </Label>
                <Select value={language} onValueChange={changeLanguage}>
                  <SelectTrigger className="w-16 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">EN</SelectItem>
                    <SelectItem value="ru">RU</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Icon
                  name="Sun"
                  size={16}
                  className={darkMode ? "text-gray-400" : "text-yellow-500"}
                />
                <Switch
                  id="dark-mode"
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                  className="data-[state=checked]:bg-[#5865F2]"
                />
                <Icon
                  name="Moon"
                  size={16}
                  className={darkMode ? "text-blue-400" : "text-gray-400"}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Label htmlFor="admin-mode" className="text-sm font-medium">
                  {language === "en" ? "Admin" : "Админ"}
                </Label>
                <Switch
                  id="admin-mode"
                  checked={isAdminMode}
                  onCheckedChange={setIsAdminMode}
                  className="data-[state=checked]:bg-red-500"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Dialog
                  open={isAddListingDesktopOpen}
                  onOpenChange={setIsAddListingDesktopOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="hidden sm:flex bg-[#5865F2] hover:bg-[#4752C4] text-white">
                      <Icon name="Plus" className="mr-1" size={16} />
                      {language === "en" ? "Add Listing" : "Добавить"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>
                        {language === "en"
                          ? "Add New Listing"
                          : "Добавить объявление"}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title">
                          {language === "en" ? "Title" : "Заголовок"}
                        </Label>
                        <Input
                          id="title"
                          value={newListing.title}
                          onChange={(e) =>
                            setNewListing({
                              ...newListing,
                              title: e.target.value,
                            })
                          }
                          placeholder={
                            language === "en"
                              ? "Enter listing title"
                              : "Введите заголовок объявления"
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">
                          {language === "en" ? "Description" : "Описание"}
                        </Label>
                        <Textarea
                          id="description"
                          value={newListing.description}
                          onChange={(e) =>
                            setNewListing({
                              ...newListing,
                              description: e.target.value,
                            })
                          }
                          placeholder={
                            language === "en"
                              ? "Enter listing description"
                              : "Введите описание объявления"
                          }
                          rows={3}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="category">
                            {language === "en" ? "Category" : "Категория"}
                          </Label>
                          <Select
                            value={newListing.category}
                            onValueChange={(value) =>
                              setNewListing({ ...newListing, category: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue
                                placeholder={
                                  language === "en"
                                    ? "Select category"
                                    : "Выберите категорию"
                                }
                              />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem
                                  key={category.id}
                                  value={category.id}
                                >
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="serverLink">
                            {language === "en"
                              ? "Server Link"
                              : "Ссылка на сервер"}
                          </Label>
                          <Input
                            id="serverLink"
                            value={newListing.serverLink}
                            onChange={(e) =>
                              setNewListing({
                                ...newListing,
                                serverLink: e.target.value,
                              })
                            }
                            placeholder="https://discord.gg/..."
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="price">
                            {language === "en" ? "Price" : "Цена"}
                          </Label>
                          <Input
                            id="price"
                            type="number"
                            value={newListing.price}
                            onChange={(e) =>
                              setNewListing({
                                ...newListing,
                                price: e.target.value,
                              })
                            }
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <Label htmlFor="currency">
                            {language === "en" ? "Currency" : "Валюта"}
                          </Label>
                          <Select
                            value={newListing.currency}
                            onValueChange={(value) =>
                              setNewListing({ ...newListing, currency: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {currencies.map((currency) => (
                                <SelectItem key={currency} value={currency}>
                                  {currency}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          onClick={() => setIsAddListingDesktopOpen(false)}
                        >
                          {language === "en" ? "Cancel" : "Отмена"}
                        </Button>
                        <Button
                          onClick={() => {
                            if (newListing.title && newListing.description) {
                              addListing(newListing);
                              setIsAddListingDesktopOpen(false);
                            }
                          }}
                          className="bg-[#5865F2] hover:bg-[#4752C4]"
                        >
                          {language === "en" ? "Add Listing" : "Добавить"}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Sheet
                  open={isAddListingMobileOpen}
                  onOpenChange={setIsAddListingMobileOpen}
                >
                  <SheetTrigger asChild>
                    <Button className="sm:hidden bg-[#5865F2] hover:bg-[#4752C4] text-white">
                      <Icon name="Plus" size={16} />
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="right"
                    className="h-[90vh] overflow-y-auto"
                  >
                    <div className="p-4">
                      <p className="text-center text-gray-500">
                        {language === "en"
                          ? "Mobile form coming soon"
                          : "Мобильная форма скоро"}
                      </p>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>

          <div className="sm:hidden flex items-center justify-center space-x-2 mt-4">
            <Button
              variant={currentView === "listings" ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentView("listings")}
              className={`flex-1 ${
                currentView === "listings"
                  ? "bg-[#5865F2] hover:bg-[#4752C4]"
                  : ""
              }`}
            >
              <Icon name="Globe" className="mr-1" size={14} />
              {language === "en" ? "Public" : "Публичные"}
            </Button>
            <Button
              variant={currentView === "myListings" ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentView("myListings")}
              className={`flex-1 ${
                currentView === "myListings"
                  ? "bg-[#5865F2] hover:bg-[#4752C4]"
                  : ""
              }`}
            >
              <Icon name="User" className="mr-1" size={14} />
              {language === "en" ? "My Listings" : "Мои объявления"}
            </Button>
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-white dark:bg-[#2F3136] border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Icon
                name="Search"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <Input
                placeholder={
                  language === "en"
                    ? "Search listings..."
                    : "Поиск объявлений..."
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 ${
                  darkMode
                    ? "bg-[#36393F] border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                }`}
              />
            </div>

            {/* Filters */}
            <Tabs defaultValue="filters" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="filters">
                  <Icon name="Filter" className="mr-2" size={16} />
                  {language === "en" ? "Filters" : "Фильтры"}
                </TabsTrigger>
                <TabsTrigger value="sort">
                  <Icon name="ArrowUpDown" className="mr-2" size={16} />
                  {language === "en" ? "Sort & View" : "Сортировка"}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="filters" className="space-y-4">
                {/* Categories */}
                <div>
                  <h3 className="font-medium mb-2 text-gray-900 dark:text-white">
                    {language === "en" ? "Categories" : "Категории"}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <div
                        key={category.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={category.id}
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={(checked) =>
                            handleCategoryChange(
                              category.id,
                              checked as boolean,
                            )
                          }
                          className="data-[state=checked]:bg-[#5865F2] data-[state=checked]:border-[#5865F2]"
                        />
                        <label
                          htmlFor={category.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-gray-700 dark:text-gray-300"
                        >
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                  {selectedCategories.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {selectedCategories.map((categoryId) => {
                        const category = categories.find(
                          (c) => c.id === categoryId,
                        );
                        return (
                          <Badge
                            key={categoryId}
                            variant="secondary"
                            className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
                            onClick={() =>
                              setSelectedCategories(
                                selectedCategories.filter(
                                  (id) => id !== categoryId,
                                ),
                              )
                            }
                          >
                            {category?.name}
                            <Icon name="X" size={12} className="ml-1" />
                          </Badge>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Currencies */}
                <div>
                  <h3 className="font-medium mb-2 text-gray-900 dark:text-white">
                    {language === "en" ? "Currencies" : "Валюты"}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {currencies.map((currency) => (
                      <div
                        key={currency}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={currency}
                          checked={selectedCurrencies.includes(currency)}
                          onCheckedChange={(checked) =>
                            handleCurrencyChange(currency, checked as boolean)
                          }
                          className="data-[state=checked]:bg-[#5865F2] data-[state=checked]:border-[#5865F2]"
                        />
                        <label
                          htmlFor={currency}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-gray-700 dark:text-gray-300"
                        >
                          {currency}
                        </label>
                      </div>
                    ))}
                  </div>
                  {selectedCurrencies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {selectedCurrencies.map((currency) => (
                        <Badge
                          key={currency}
                          variant="secondary"
                          className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
                          onClick={() =>
                            setSelectedCurrencies(
                              selectedCurrencies.filter((c) => c !== currency),
                            )
                          }
                        >
                          {currency}
                          <Icon name="X" size={12} className="ml-1" />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="sort" className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  {/* Sort */}
                  <div className="flex-1">
                    <h3 className="font-medium mb-2 text-gray-900 dark:text-white">
                      {language === "en" ? "Sort by" : "Сортировка"}
                    </h3>
                    <Select
                      value={sortBy}
                      onValueChange={(value) => setSortBy(value as SortBy)}
                    >
                      <SelectTrigger
                        className={`${
                          darkMode
                            ? "bg-[#36393F] border-gray-600 text-white"
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent
                        className={`${
                          darkMode
                            ? "bg-[#36393F] border-gray-600"
                            : "bg-white border-gray-300"
                        }`}
                      >
                        <SelectItem value="newest">
                          {language === "en" ? "Newest First" : "Сначала новые"}
                        </SelectItem>
                        <SelectItem value="oldest">
                          {language === "en"
                            ? "Oldest First"
                            : "Сначала старые"}
                        </SelectItem>
                        <SelectItem value="price_low">
                          {language === "en"
                            ? "Price: Low to High"
                            : "Цена: по возрастанию"}
                        </SelectItem>
                        <SelectItem value="price_high">
                          {language === "en"
                            ? "Price: High to Low"
                            : "Цена: по убыванию"}
                        </SelectItem>
                        <SelectItem value="popular">
                          {language === "en" ? "Most Popular" : "Популярные"}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* View Mode */}
                  <div>
                    <h3 className="font-medium mb-2 text-gray-900 dark:text-white">
                      {language === "en" ? "View" : "Вид"}
                    </h3>
                    <div className="flex rounded-lg bg-gray-100 dark:bg-gray-700 p-1">
                      <Button
                        variant={viewMode === "gallery" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("gallery")}
                        className={`${
                          viewMode === "gallery"
                            ? "bg-white dark:bg-gray-600 shadow-sm"
                            : "hover:bg-gray-200 dark:hover:bg-gray-600"
                        }`}
                      >
                        <Icon name="Grid3X3" size={16} className="mr-1" />
                        {language === "en" ? "Gallery" : "Галерея"}
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                        className={`${
                          viewMode === "list"
                            ? "bg-white dark:bg-gray-600 shadow-sm"
                            : "hover:bg-gray-200 dark:hover:bg-gray-600"
                        }`}
                      >
                        <Icon name="List" size={16} className="mr-1" />
                        {language === "en" ? "List" : "Список"}
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

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
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
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
    </div>
  );
};

export default Index;
