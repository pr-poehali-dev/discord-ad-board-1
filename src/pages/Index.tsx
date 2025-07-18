import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Icon from "@/components/ui/icon";

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

const Index = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || "en");
  const [darkMode, setDarkMode] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [currentView, setCurrentView] = useState("listings");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("newest");
  const [isAddListingMobileOpen, setIsAddListingMobileOpen] = useState(false);
  const [isAddListingDesktopOpen, setIsAddListingDesktopOpen] = useState(false);
  const [isEditListingOpen, setIsEditListingOpen] = useState(false);
  const [editingListing, setEditingListing] = useState<Listing | null>(null);
  const [viewMode, setViewMode] = useState<"gallery" | "list">("gallery");

  const [newListing, setNewListing] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    currency: "USD",
    serverLink: "",
  });

  const [editListing, setEditListing] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    currency: "USD",
    serverLink: "",
  });

  const categories = [
    { id: "gaming", name: t("categories.gaming") },
    { id: "finance", name: t("categories.finance") },
    { id: "education", name: t("categories.education") },
    { id: "music", name: t("categories.music") },
    { id: "it", name: t("categories.it") },
  ];

  const currencies = ["USD", "EUR", "RUB", "LTC"];

  const [listings, setListings] = useState<Listing[]>([
    {
      id: "1",
      title:
        language === "en"
          ? "Gaming Community Advertisement"
          : "Реклама в игровом сообществе",
      description:
        language === "en"
          ? "Active gaming community. High engagement among target audience aged 18-25."
          : "Активное сообщество геймеров. Высокий охват среди целевой аудитории 18-25 лет.",
      category: "gaming",
      price: 5000,
      currency: "RUB",
      serverLink: "https://discord.gg/gamehub",
      members: 15000,
      views: 124,
      clicks: 23,
      timeAgo: language === "en" ? "2 hours ago" : "2 часа назад",
      serverName: "GameHub",
      isPinned: true,
    },
    {
      id: "2",
      title:
        language === "en" ? "Cryptocurrency Channel" : "Криптовалютный канал",
      description:
        language === "en"
          ? "Investor and trader audience. Daily activity 2000+ participants."
          : "Аудитория инвесторов и трейдеров. Ежедневная активность 2000+ участников.",
      category: "finance",
      price: 3500,
      currency: "RUB",
      serverLink: "https://discord.gg/cryptotalk",
      members: 8500,
      views: 89,
      clicks: 15,
      timeAgo: language === "en" ? "4 hours ago" : "4 часа назад",
      serverName: "CryptoTalk",
      isPinned: false,
    },
  ]);

  const filteredListings = listings
    .filter((listing) => {
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(listing.category);
      const currencyMatch =
        selectedCurrencies.length === 0 ||
        selectedCurrencies.includes(listing.currency);
      return categoryMatch && currencyMatch;
    })
    .sort((a, b) => {
      // Закрепленные объявления всегда первые
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;

      // Если оба закреплены или оба не закреплены, сортируем по выбранному критерию
      if (sortBy === "newest") return 0;
      if (sortBy === "cheapest") return a.price - b.price;
      if (sortBy === "expensive") return b.price - a.price;
      return 0;
    });

  const userListings = listings.filter((listing) => listing.isOwner);

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  const handleCurrencyToggle = (currencyId: string) => {
    setSelectedCurrencies((prev) =>
      prev.includes(currencyId)
        ? prev.filter((id) => id !== currencyId)
        : [...prev, currencyId],
    );
  };

  const handleAddListing = () => {
    const listing: Listing = {
      id: Date.now().toString(),
      title: newListing.title,
      description: newListing.description,
      category: newListing.category,
      price: parseFloat(newListing.price),
      currency: newListing.currency,
      serverLink: newListing.serverLink,
      members: Math.floor(Math.random() * 20000) + 1000,
      views: Math.floor(Math.random() * 200) + 10,
      clicks: 0,
      timeAgo: language === "en" ? "Just now" : "Только что",
      serverName: newListing.title.split(" ")[0] || "Server",
      isOwner: true,
    };

    setListings((prev) => [listing, ...prev]);
    setNewListing({
      title: "",
      description: "",
      category: "",
      price: "",
      currency: "USD",
      serverLink: "",
    });
    setIsAddListingMobileOpen(false);
    setIsAddListingDesktopOpen(false);
  };

  const handleDeleteListing = (id: string) => {
    setListings((prev) => prev.filter((listing) => listing.id !== id));
  };

  const handleEditListing = (listing: Listing) => {
    setEditingListing(listing);
    setEditListing({
      title: listing.title,
      description: listing.description,
      category: listing.category,
      price: listing.price.toString(),
      currency: listing.currency,
      serverLink: listing.serverLink,
    });
    setIsEditListingOpen(true);
  };

  const handleTogglePin = (id: string) => {
    setListings((prev) =>
      prev.map((listing) =>
        listing.id === id
          ? { ...listing, isPinned: !listing.isPinned }
          : listing,
      ),
    );
  };

  const handleUpdateListing = () => {
    if (!editingListing) return;

    setListings((prev) =>
      prev.map((listing) =>
        listing.id === editingListing.id
          ? {
              ...listing,
              title: editListing.title,
              description: editListing.description,
              category: editListing.category,
              price: parseFloat(editListing.price),
              currency: editListing.currency,
              serverLink: editListing.serverLink,
            }
          : listing,
      ),
    );

    setIsEditListingOpen(false);
    setEditingListing(null);
    setEditListing({
      title: "",
      description: "",
      category: "",
      price: "",
      currency: "USD",
      serverLink: "",
    });
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedCurrencies([]);
    setSortBy("newest");
  };

  const handleClick = (listingId: string) => {
    setListings((prev) =>
      prev.map((listing) =>
        listing.id === listingId
          ? { ...listing, clicks: listing.clicks + 1 }
          : listing,
      ),
    );
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-[#2C2F33] text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header */}
      <header
        className={`border-b transition-colors duration-300 ${
          darkMode ? "bg-[#23272A] border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="flex items-center space-x-2">
                <Icon
                  name="MessageSquare"
                  className="text-[#5865F2]"
                  size={24}
                />
                <h1 className="text-lg sm:text-2xl font-bold">
                  {t("header.title")}
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger
                  className={`w-16 sm:w-20 ${
                    darkMode
                      ? "bg-[#36393F] border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent
                  className={
                    darkMode
                      ? "bg-[#36393F] border-gray-600"
                      : "bg-white border-gray-300"
                  }
                >
                  <SelectItem
                    value="en"
                    className={
                      darkMode
                        ? "text-white hover:bg-gray-600"
                        : "text-gray-900 hover:bg-gray-100"
                    }
                  >
                    EN
                  </SelectItem>
                  <SelectItem
                    value="ru"
                    className={
                      darkMode
                        ? "text-white hover:bg-gray-600"
                        : "text-gray-900 hover:bg-gray-100"
                    }
                  >
                    RU
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Admin mode toggle button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsAdminMode(!isAdminMode)}
                className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                  isAdminMode
                    ? "text-red-500 bg-red-50 dark:bg-red-900/30"
                    : darkMode
                      ? "text-gray-300"
                      : "text-gray-600"
                }`}
                title={t("header.adminMode")}
              >
                <Icon name={isAdminMode ? "ShieldCheck" : "Shield"} size={16} />
              </Button>

              {/* Theme toggle button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                <Icon
                  name={darkMode ? "Sun" : "Moon"}
                  size={16}
                  className="transition-all duration-200"
                />
              </Button>

              {/* Mobile Add Button */}
              <Sheet
                open={isAddListingMobileOpen}
                onOpenChange={setIsAddListingMobileOpen}
              >
                <SheetTrigger asChild>
                  <Button className="bg-[#5865F2] hover:bg-[#4752C4] text-white sm:hidden p-2">
                    <Icon name="Plus" size={16} />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="bottom"
                  className="h-[90vh] overflow-y-auto"
                >
                  <SheetHeader>
                    <SheetTitle>
                      {language === "en" ? "New Listing" : "Новое объявление"}
                    </SheetTitle>
                  </SheetHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <Label htmlFor="mobile-title">
                        {language === "en" ? "Title" : "Заголовок"}
                      </Label>
                      <Input
                        id="mobile-title"
                        placeholder={
                          language === "en"
                            ? "Brief description of the offer"
                            : "Краткое описание предложения"
                        }
                        value={newListing.title}
                        onChange={(e) =>
                          setNewListing({
                            ...newListing,
                            title: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="mobile-description">
                        {language === "en" ? "Description" : "Описание"}
                      </Label>
                      <Textarea
                        id="mobile-description"
                        placeholder={
                          language === "en"
                            ? "Detailed description of the advertising offer"
                            : "Детальное описание рекламного предложения"
                        }
                        value={newListing.description}
                        onChange={(e) =>
                          setNewListing({
                            ...newListing,
                            description: e.target.value,
                          })
                        }
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="mobile-serverLink">
                        {language === "en"
                          ? "Discord Server Link"
                          : "Ссылка на Discord сервер"}
                      </Label>
                      <Input
                        id="mobile-serverLink"
                        placeholder="https://discord.gg/server"
                        value={newListing.serverLink}
                        onChange={(e) =>
                          setNewListing({
                            ...newListing,
                            serverLink: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="mobile-category">
                        {language === "en" ? "Category" : "Категория"}
                      </Label>
                      <Select
                        value={newListing.category}
                        onValueChange={(value) =>
                          setNewListing({ ...newListing, category: value })
                        }
                      >
                        <SelectTrigger
                          className={
                            darkMode
                              ? "bg-[#36393F] border-gray-600 text-white"
                              : "bg-white border-gray-300 text-gray-900"
                          }
                        >
                          <SelectValue
                            placeholder={
                              language === "en"
                                ? "Gaming, IT, Finance"
                                : "Игры, ИТ, Финансы"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent
                          className={
                            darkMode
                              ? "bg-[#36393F] border-gray-600"
                              : "bg-white border-gray-300"
                          }
                        >
                          {categories.map((category) => (
                            <SelectItem
                              key={category.id}
                              value={category.id}
                              className={
                                darkMode
                                  ? "text-white hover:bg-gray-600"
                                  : "text-gray-900 hover:bg-gray-100"
                              }
                            >
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="mobile-price">
                          {language === "en" ? "Price" : "Цена"}
                        </Label>
                        <Input
                          id="mobile-price"
                          type="number"
                          placeholder="5,000"
                          value={newListing.price}
                          onChange={(e) =>
                            setNewListing({
                              ...newListing,
                              price: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="mobile-currency">
                          {language === "en" ? "Currency" : "Валюта"}
                        </Label>
                        <Select
                          value={newListing.currency}
                          onValueChange={(value) =>
                            setNewListing({ ...newListing, currency: value })
                          }
                        >
                          <SelectTrigger
                            className={
                              darkMode
                                ? "bg-[#36393F] border-gray-600 text-white"
                                : "bg-white border-gray-300 text-gray-900"
                            }
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent
                            className={
                              darkMode
                                ? "bg-[#36393F] border-gray-600"
                                : "bg-white border-gray-300"
                            }
                          >
                            {currencies.map((currency) => (
                              <SelectItem
                                key={currency}
                                value={currency}
                                className={
                                  darkMode
                                    ? "text-white hover:bg-gray-600"
                                    : "text-gray-900 hover:bg-gray-100"
                                }
                              >
                                {currency}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button
                      onClick={handleAddListing}
                      className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white"
                      disabled={
                        !newListing.title ||
                        !newListing.description ||
                        !newListing.category ||
                        !newListing.price
                      }
                    >
                      {language === "en" ? "Publish" : "Опубликовать"}
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Desktop Add Button */}
              <Dialog
                open={isAddListingDesktopOpen}
                onOpenChange={setIsAddListingDesktopOpen}
              >
                <DialogTrigger asChild>
                  <Button className="bg-[#5865F2] hover:bg-[#4752C4] text-white hidden sm:flex">
                    <Icon name="Plus" className="mr-2" size={16} />
                    {t("header.addListing")}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {language === "en" ? "New Listing" : "Новое объявление"}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">
                        {language === "en" ? "Title" : "Заголовок"}
                      </Label>
                      <Input
                        id="title"
                        placeholder={
                          language === "en"
                            ? "Brief description of the offer"
                            : "Краткое описание предложения"
                        }
                        value={newListing.title}
                        onChange={(e) =>
                          setNewListing({
                            ...newListing,
                            title: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">
                        {language === "en" ? "Description" : "Описание"}
                      </Label>
                      <Textarea
                        id="description"
                        placeholder={
                          language === "en"
                            ? "Detailed description of the advertising offer"
                            : "Детальное описание рекламного предложения"
                        }
                        value={newListing.description}
                        onChange={(e) =>
                          setNewListing({
                            ...newListing,
                            description: e.target.value,
                          })
                        }
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="serverLink">
                        {language === "en"
                          ? "Discord Server Link"
                          : "Ссылка на Discord сервер"}
                      </Label>
                      <Input
                        id="serverLink"
                        placeholder="https://discord.gg/server"
                        value={newListing.serverLink}
                        onChange={(e) =>
                          setNewListing({
                            ...newListing,
                            serverLink: e.target.value,
                          })
                        }
                      />
                    </div>

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
                        <SelectTrigger
                          className={
                            darkMode
                              ? "bg-[#36393F] border-gray-600 text-white"
                              : "bg-white border-gray-300 text-gray-900"
                          }
                        >
                          <SelectValue
                            placeholder={
                              language === "en"
                                ? "Gaming, IT, Finance"
                                : "Игры, ИТ, Финансы"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent
                          className={
                            darkMode
                              ? "bg-[#36393F] border-gray-600"
                              : "bg-white border-gray-300"
                          }
                        >
                          {categories.map((category) => (
                            <SelectItem
                              key={category.id}
                              value={category.id}
                              className={
                                darkMode
                                  ? "text-white hover:bg-gray-600"
                                  : "text-gray-900 hover:bg-gray-100"
                              }
                            >
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex space-x-2">
                      <div className="flex-1">
                        <Label htmlFor="price">
                          {language === "en" ? "Price" : "Цена"}
                        </Label>
                        <Input
                          id="price"
                          type="number"
                          placeholder="5,000"
                          value={newListing.price}
                          onChange={(e) =>
                            setNewListing({
                              ...newListing,
                              price: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="w-24">
                        <Label>&nbsp;</Label>
                        <Select
                          value={newListing.currency}
                          onValueChange={(value) =>
                            setNewListing({ ...newListing, currency: value })
                          }
                        >
                          <SelectTrigger
                            className={
                              darkMode
                                ? "bg-[#36393F] border-gray-600 text-white"
                                : "bg-white border-gray-300 text-gray-900"
                            }
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent
                            className={
                              darkMode
                                ? "bg-[#36393F] border-gray-600"
                                : "bg-white border-gray-300"
                            }
                          >
                            {currencies.map((currency) => (
                              <SelectItem
                                key={currency}
                                value={currency}
                                className={
                                  darkMode
                                    ? "text-white hover:bg-gray-600"
                                    : "text-gray-900 hover:bg-gray-100"
                                }
                              >
                                {currency}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button
                      onClick={handleAddListing}
                      className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white"
                      disabled={
                        !newListing.title ||
                        !newListing.description ||
                        !newListing.category ||
                        !newListing.price
                      }
                    >
                      {language === "en" ? "Publish" : "Опубликовать"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav
        className={`border-b transition-colors duration-300 ${
          darkMode ? "bg-[#23272A] border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={currentView} onValueChange={setCurrentView}>
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger
                value="listings"
                className="flex items-center space-x-1 sm:space-x-2"
              >
                <Icon name="List" size={16} />
                <span className="text-xs sm:text-sm">
                  {t("navigation.listings")}
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="profile"
                className="flex items-center space-x-1 sm:space-x-2"
              >
                <Icon name="User" size={16} />
                <span className="text-xs sm:text-sm">
                  {t("navigation.profile")}
                </span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="listings" className="mt-0">
              {/* Filters */}
              <div className="py-4 sm:py-6 space-y-4">
                <div className="space-y-4 sm:space-y-0 sm:flex sm:flex-wrap sm:gap-4">
                  <div className="w-full sm:flex-1 sm:min-w-64">
                    <Label className="text-sm font-medium mb-2 block">
                      {t("filters.categories")}
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <div
                          key={category.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={category.id}
                            checked={selectedCategories.includes(category.id)}
                            onCheckedChange={() =>
                              handleCategoryToggle(category.id)
                            }
                          />
                          <label
                            htmlFor={category.id}
                            className="text-xs sm:text-sm cursor-pointer"
                          >
                            {category.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="w-full sm:flex-1 sm:min-w-48">
                    <Label className="text-sm font-medium mb-2 block">
                      {language === "en" ? "Currency" : "Валюта"}
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {currencies.map((currency) => (
                        <div
                          key={currency}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={currency}
                            checked={selectedCurrencies.includes(currency)}
                            onCheckedChange={() =>
                              handleCurrencyToggle(currency)
                            }
                          />
                          <label
                            htmlFor={currency}
                            className="text-xs sm:text-sm cursor-pointer"
                          >
                            {currency}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="w-full sm:flex-1 sm:min-w-48">
                    <Label className="text-sm font-medium mb-2 block">
                      {language === "en" ? "Sorting" : "Сортировка"}
                    </Label>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger
                          className={`w-full sm:w-48 ${
                            darkMode
                              ? "bg-[#36393F] border-gray-600 text-white"
                              : "bg-white border-gray-300 text-gray-900"
                          }`}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent
                          className={
                            darkMode
                              ? "bg-[#36393F] border-gray-600"
                              : "bg-white border-gray-300"
                          }
                        >
                          <SelectItem
                            value="newest"
                            className={
                              darkMode
                                ? "text-white hover:bg-gray-600"
                                : "text-gray-900 hover:bg-gray-100"
                            }
                          >
                            {language === "en"
                              ? "Newest First"
                              : "Сначала новые"}
                          </SelectItem>
                          <SelectItem
                            value="cheapest"
                            className={
                              darkMode
                                ? "text-white hover:bg-gray-600"
                                : "text-gray-900 hover:bg-gray-100"
                            }
                          >
                            {language === "en"
                              ? "Cheapest First"
                              : "Сначала дешёвые"}
                          </SelectItem>
                          <SelectItem
                            value="expensive"
                            className={
                              darkMode
                                ? "text-white hover:bg-gray-600"
                                : "text-gray-900 hover:bg-gray-100"
                            }
                          >
                            {language === "en"
                              ? "Most Expensive"
                              : "Сначала дорогие"}
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <Button
                        variant="outline"
                        onClick={resetFilters}
                        className={`flex items-center justify-center space-x-2 w-full sm:w-auto ${
                          darkMode
                            ? "bg-[#36393F] border-gray-600 text-white hover:bg-gray-600"
                            : "bg-white border-gray-300 text-gray-900 hover:bg-gray-100"
                        }`}
                      >
                        <Icon name="RotateCcw" size={16} />
                        <span>{t("header.reset")}</span>
                      </Button>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant={
                            viewMode === "gallery" ? "default" : "outline"
                          }
                          onClick={() => setViewMode("gallery")}
                          className={`p-2 ${
                            viewMode === "gallery"
                              ? "bg-[#5865F2] text-white hover:bg-[#4752C4]"
                              : darkMode
                                ? "bg-[#36393F] border-gray-600 text-white hover:bg-gray-600"
                                : "bg-white border-gray-300 text-gray-900 hover:bg-gray-100"
                          }`}
                          title={t("header.gallery")}
                        >
                          <Icon name="Grid3x3" size={16} />
                        </Button>
                        <Button
                          variant={viewMode === "list" ? "default" : "outline"}
                          onClick={() => setViewMode("list")}
                          className={`p-2 ${
                            viewMode === "list"
                              ? "bg-[#5865F2] text-white hover:bg-[#4752C4]"
                              : darkMode
                                ? "bg-[#36393F] border-gray-600 text-white hover:bg-gray-600"
                                : "bg-white border-gray-300 text-gray-900 hover:bg-gray-100"
                          }`}
                          title={t("header.list")}
                        >
                          <Icon name="List" size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Listings */}
              <div className="pb-8">
                {viewMode === "gallery" ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredListings.map((listing) => (
                      <Card
                        key={listing.id}
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
                                      onCheckedChange={() =>
                                        handleTogglePin(listing.id)
                                      }
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
                                      onClick={() =>
                                        handleDeleteListing(listing.id)
                                      }
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
                                {listing.price.toLocaleString()}{" "}
                                {listing.currency}
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
                                  className={`text-xs sm:text-sm font-medium cursor-pointer hover:text-[#5865F2] transition-colors ${
                                    darkMode ? "text-gray-100" : "text-gray-900"
                                  }`}
                                  onClick={() => {
                                    handleClick(listing.id);
                                    window.open(listing.serverLink, "_blank");
                                  }}
                                >
                                  {listing.serverName}
                                </span>
                              </div>
                              <Badge
                                variant="secondary"
                                className={`text-xs ${
                                  darkMode
                                    ? "bg-gray-600 text-gray-100"
                                    : "bg-gray-200 text-gray-800"
                                }`}
                              >
                                {
                                  categories.find(
                                    (cat) => cat.id === listing.category,
                                  )?.name
                                }
                              </Badge>
                            </div>

                            <div className="flex items-center justify-between text-xs sm:text-sm">
                              <div className="flex items-center space-x-2 sm:space-x-4">
                                <div className="flex items-center space-x-1">
                                  <Icon
                                    name="Users"
                                    size={14}
                                    className={
                                      darkMode
                                        ? "text-gray-300"
                                        : "text-gray-600"
                                    }
                                  />
                                  <span
                                    className={
                                      darkMode
                                        ? "text-gray-200"
                                        : "text-gray-700"
                                    }
                                  >
                                    {listing.members.toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Icon
                                    name="Eye"
                                    size={14}
                                    className={
                                      darkMode
                                        ? "text-gray-300"
                                        : "text-gray-600"
                                    }
                                  />
                                  <span
                                    className={
                                      darkMode
                                        ? "text-gray-200"
                                        : "text-gray-700"
                                    }
                                  >
                                    {listing.views}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Icon
                                    name="MousePointerClick"
                                    size={14}
                                    className={
                                      darkMode
                                        ? "text-gray-300"
                                        : "text-gray-600"
                                    }
                                  />
                                  <span
                                    className={
                                      darkMode
                                        ? "text-gray-200"
                                        : "text-gray-700"
                                    }
                                  >
                                    {listing.clicks}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center space-x-2">
                                {isAdminMode && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleEditListing(listing)}
                                    className="text-xs sm:text-sm px-2 sm:px-3"
                                  >
                                    <Icon
                                      name="Edit"
                                      className="mr-1"
                                      size={14}
                                    />
                                    <span className="hidden sm:inline">
                                      {t("listing.edit")}
                                    </span>
                                    <span className="sm:hidden">
                                      {t("listing.edit")}
                                    </span>
                                  </Button>
                                )}
                                <Button
                                  size="sm"
                                  className="bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs sm:text-sm px-2 sm:px-3"
                                  onClick={() => handleClick(listing.id)}
                                >
                                  <Icon
                                    name="MessageCircle"
                                    className="mr-1"
                                    size={14}
                                  />
                                  <span className="hidden sm:inline">
                                    {t("listing.contact")}
                                  </span>
                                  <span className="sm:hidden">
                                    {t("listing.contactShort")}
                                  </span>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredListings.map((listing) => (
                      <Card
                        key={listing.id}
                        className={`transition-all duration-300 hover:shadow-lg ${
                          darkMode
                            ? "bg-[#36393F] border-gray-600"
                            : "bg-white border-gray-200"
                        }`}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-0">
                            <div className="flex-1 w-full">
                              <CardTitle
                                className={`text-base sm:text-lg font-semibold mb-2 ${
                                  darkMode ? "text-white" : "text-gray-900"
                                }`}
                              >
                                {listing.title}
                              </CardTitle>
                              <p
                                className={`text-sm mb-3 ${
                                  darkMode ? "text-gray-300" : "text-gray-600"
                                }`}
                              >
                                {listing.description}
                              </p>

                              {/* Mobile: Vertical layout */}
                              <div className="flex flex-col gap-2 sm:hidden">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    <Icon
                                      name="MessageSquare"
                                      className="text-[#5865F2]"
                                      size={14}
                                    />
                                    <span
                                      className={`text-sm font-medium cursor-pointer hover:text-[#5865F2] transition-colors ${
                                        darkMode
                                          ? "text-gray-100"
                                          : "text-gray-900"
                                      }`}
                                      onClick={() => {
                                        handleClick(listing.id);
                                        window.open(
                                          listing.serverLink,
                                          "_blank",
                                        );
                                      }}
                                    >
                                      {listing.serverName}
                                    </span>
                                  </div>
                                  <Badge
                                    variant="secondary"
                                    className={`text-xs ${
                                      darkMode
                                        ? "bg-gray-600 text-gray-100"
                                        : "bg-gray-200 text-gray-800"
                                    }`}
                                  >
                                    {
                                      categories.find(
                                        (cat) => cat.id === listing.category,
                                      )?.name
                                    }
                                  </Badge>
                                </div>
                                <div className="flex items-center space-x-4 text-sm">
                                  <div className="flex items-center space-x-1">
                                    <Icon
                                      name="Users"
                                      size={12}
                                      className={
                                        darkMode
                                          ? "text-gray-300"
                                          : "text-gray-600"
                                      }
                                    />
                                    <span
                                      className={
                                        darkMode
                                          ? "text-gray-200"
                                          : "text-gray-700"
                                      }
                                    >
                                      {listing.members.toLocaleString()}
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Icon
                                      name="Eye"
                                      size={12}
                                      className={
                                        darkMode
                                          ? "text-gray-300"
                                          : "text-gray-600"
                                      }
                                    />
                                    <span
                                      className={
                                        darkMode
                                          ? "text-gray-200"
                                          : "text-gray-700"
                                      }
                                    >
                                      {listing.views}
                                    </span>
                                  </div>
                                  <div
                                    className={`text-xs ml-auto ${
                                      darkMode
                                        ? "text-gray-300"
                                        : "text-gray-500"
                                    }`}
                                  >
                                    {listing.timeAgo}
                                  </div>
                                </div>
                              </div>

                              {/* Desktop: Horizontal layout */}
                              <div className="hidden sm:flex items-center space-x-6 text-sm">
                                <div className="flex items-center space-x-2">
                                  <Icon
                                    name="MessageSquare"
                                    className="text-[#5865F2]"
                                    size={16}
                                  />
                                  <span
                                    className={`font-medium cursor-pointer hover:text-[#5865F2] transition-colors ${
                                      darkMode
                                        ? "text-gray-100"
                                        : "text-gray-900"
                                    }`}
                                    onClick={() => {
                                      handleClick(listing.id);
                                      window.open(listing.serverLink, "_blank");
                                    }}
                                  >
                                    {listing.serverName}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Icon
                                    name="Users"
                                    size={14}
                                    className={
                                      darkMode
                                        ? "text-gray-300"
                                        : "text-gray-600"
                                    }
                                  />
                                  <span
                                    className={
                                      darkMode
                                        ? "text-gray-200"
                                        : "text-gray-700"
                                    }
                                  >
                                    {listing.members.toLocaleString()}
                                  </span>
                                </div>
                                <Badge
                                  variant="secondary"
                                  className={`text-xs ${
                                    darkMode
                                      ? "bg-gray-600 text-gray-100"
                                      : "bg-gray-200 text-gray-800"
                                  }`}
                                >
                                  {
                                    categories.find(
                                      (cat) => cat.id === listing.category,
                                    )?.name
                                  }
                                </Badge>
                                <div className="flex items-center space-x-1">
                                  <Icon
                                    name="Eye"
                                    size={14}
                                    className={
                                      darkMode
                                        ? "text-gray-300"
                                        : "text-gray-600"
                                    }
                                  />
                                  <span
                                    className={
                                      darkMode
                                        ? "text-gray-200"
                                        : "text-gray-700"
                                    }
                                  >
                                    {listing.views}
                                  </span>
                                </div>
                              </div>
                            </div>
                            {/* Price and actions section */}
                            <div className="flex items-center justify-between w-full sm:w-auto sm:flex-col sm:items-end sm:text-right">
                              <div className="text-lg sm:text-xl font-bold text-[#5865F2] sm:mb-1">
                                {listing.price.toLocaleString()}{" "}
                                {listing.currency}
                              </div>

                              <div className="flex items-center space-x-2">
                                <div className="hidden sm:block">
                                  <div
                                    className={`text-xs mb-2 ${
                                      darkMode
                                        ? "text-gray-300"
                                        : "text-gray-500"
                                    }`}
                                  >
                                    {listing.timeAgo}
                                  </div>
                                  {listing.isPinned && (
                                    <Badge
                                      variant="secondary"
                                      className="mb-2 text-xs bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-100 dark:border-yellow-600"
                                    >
                                      <Icon
                                        name="Pin"
                                        size={10}
                                        className="mr-1"
                                      />
                                      {t("listing.pinned")}
                                    </Badge>
                                  )}
                                </div>

                                {/* Mobile: Show pinned badge next to price */}
                                {listing.isPinned && (
                                  <Badge
                                    variant="secondary"
                                    className="sm:hidden text-xs bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-100 dark:border-yellow-600"
                                  >
                                    <Icon
                                      name="Pin"
                                      size={8}
                                      className="mr-1"
                                    />
                                    {t("listing.pinned")}
                                  </Badge>
                                )}

                                {/* Mobile: Compact admin controls */}
                                {isAdminMode && (
                                  <div className="flex items-center space-x-1 sm:space-x-2">
                                    <Checkbox
                                      id={`pin-${listing.id}`}
                                      checked={listing.isPinned || false}
                                      onCheckedChange={() =>
                                        handleTogglePin(listing.id)
                                      }
                                      className="data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500"
                                    />
                                    <label
                                      htmlFor={`pin-${listing.id}`}
                                      className="text-xs text-gray-600 dark:text-gray-400 cursor-pointer"
                                      title={t("listing.pin")}
                                    >
                                      <Icon name="Pin" size={10} />
                                    </label>
                                    <Button
                                      size="sm"
                                      variant="destructive"
                                      onClick={() =>
                                        handleDeleteListing(listing.id)
                                      }
                                      className="p-1 sm:p-2"
                                    >
                                      <Icon name="Trash2" size={10} />
                                    </Button>
                                  </div>
                                )}

                                <Button
                                  size="sm"
                                  className="bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs sm:text-sm px-2 sm:px-3"
                                  onClick={() => handleClick(listing.id)}
                                >
                                  <Icon
                                    name="MessageCircle"
                                    className="mr-1"
                                    size={10}
                                  />
                                  <span className="hidden sm:inline">
                                    {t("listing.contact")}
                                  </span>
                                  <span className="sm:hidden">
                                    {t("listing.contactShort")}
                                  </span>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="profile" className="mt-0">
              <div className="py-6">
                <h2 className="text-xl font-semibold mb-4">
                  {language === "en" ? "My Listings" : "Мои объявления"}
                </h2>

                {userListings.length === 0 ? (
                  <div
                    className={`text-center py-8 ${
                      darkMode ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    <Icon name="FileText" size={48} className="mx-auto mb-4" />
                    <p>
                      {language === "en"
                        ? "No listings yet"
                        : "Пока нет объявлений"}
                    </p>
                  </div>
                ) : (
                  <>
                    {viewMode === "gallery" ? (
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {userListings.map((listing) => (
                          <Card
                            key={listing.id}
                            className={`transition-all duration-300 ${
                              darkMode
                                ? "bg-[#36393F] border-gray-600"
                                : "bg-white border-gray-200"
                            }`}
                          >
                            <CardHeader className="pb-3">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <CardTitle
                                    className={`text-base sm:text-lg font-semibold mb-2 ${
                                      darkMode ? "text-white" : "text-gray-900"
                                    }`}
                                  >
                                    {listing.title}
                                  </CardTitle>
                                  <p
                                    className={`text-xs sm:text-sm ${
                                      darkMode
                                        ? "text-gray-100"
                                        : "text-gray-600"
                                    }`}
                                  >
                                    {listing.description}
                                  </p>
                                </div>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() =>
                                    handleDeleteListing(listing.id)
                                  }
                                  className="p-2"
                                >
                                  <Icon name="Trash2" size={14} />
                                </Button>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <div className="text-lg sm:text-xl font-bold text-[#5865F2]">
                                    {listing.price.toLocaleString()}{" "}
                                    {listing.currency}
                                  </div>
                                  <Badge
                                    variant="secondary"
                                    className={`text-xs ${
                                      darkMode
                                        ? "bg-gray-600 text-gray-100"
                                        : "bg-gray-200 text-gray-800"
                                    }`}
                                  >
                                    {
                                      categories.find(
                                        (cat) => cat.id === listing.category,
                                      )?.name
                                    }
                                  </Badge>
                                </div>

                                <div className="flex items-center justify-between text-xs sm:text-sm">
                                  <div className="flex items-center space-x-2 sm:space-x-4">
                                    <div className="flex items-center space-x-1">
                                      <Icon
                                        name="Users"
                                        size={14}
                                        className={
                                          darkMode
                                            ? "text-gray-300"
                                            : "text-gray-600"
                                        }
                                      />
                                      <span
                                        className={
                                          darkMode
                                            ? "text-gray-200"
                                            : "text-gray-700"
                                        }
                                      >
                                        {listing.members.toLocaleString()}
                                      </span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <Icon
                                        name="Eye"
                                        size={14}
                                        className={
                                          darkMode
                                            ? "text-gray-300"
                                            : "text-gray-600"
                                        }
                                      />
                                      <span
                                        className={
                                          darkMode
                                            ? "text-gray-200"
                                            : "text-gray-700"
                                        }
                                      >
                                        {listing.views}
                                      </span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <Icon
                                        name="MousePointerClick"
                                        size={14}
                                        className={
                                          darkMode
                                            ? "text-gray-300"
                                            : "text-gray-600"
                                        }
                                      />
                                      <span
                                        className={
                                          darkMode
                                            ? "text-gray-200"
                                            : "text-gray-700"
                                        }
                                      >
                                        {listing.clicks}
                                      </span>
                                    </div>
                                  </div>

                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleEditListing(listing)}
                                    className="text-xs sm:text-sm px-2 sm:px-3"
                                  >
                                    <Icon
                                      name="Edit"
                                      className="mr-1"
                                      size={14}
                                    />
                                    <span className="hidden sm:inline">
                                      {language === "en"
                                        ? "Edit"
                                        : "Редактировать"}
                                    </span>
                                    <span className="sm:hidden">
                                      {language === "en" ? "Edit" : "Ред."}
                                    </span>
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {userListings.map((listing) => (
                          <Card
                            key={listing.id}
                            className={`transition-all duration-300 ${
                              darkMode
                                ? "bg-[#36393F] border-gray-600"
                                : "bg-white border-gray-200"
                            }`}
                          >
                            <CardHeader className="pb-3">
                              <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-0">
                                <div className="flex-1 w-full">
                                  <CardTitle
                                    className={`text-base sm:text-lg font-semibold mb-2 ${
                                      darkMode ? "text-white" : "text-gray-900"
                                    }`}
                                  >
                                    {listing.title}
                                  </CardTitle>
                                  <p
                                    className={`text-sm mb-3 ${
                                      darkMode
                                        ? "text-gray-300"
                                        : "text-gray-600"
                                    }`}
                                  >
                                    {listing.description}
                                  </p>
                                  {/* Mobile: Vertical layout */}
                                  <div className="flex flex-col gap-2 sm:hidden">
                                    <div className="flex items-center justify-between">
                                      <Badge
                                        variant="secondary"
                                        className={`text-xs ${
                                          darkMode
                                            ? "bg-gray-600 text-gray-100"
                                            : "bg-gray-200 text-gray-800"
                                        }`}
                                      >
                                        {
                                          categories.find(
                                            (cat) =>
                                              cat.id === listing.category,
                                          )?.name
                                        }
                                      </Badge>
                                    </div>
                                    <div className="flex items-center space-x-4 text-sm">
                                      <div className="flex items-center space-x-1">
                                        <Icon
                                          name="Users"
                                          size={12}
                                          className={
                                            darkMode
                                              ? "text-gray-300"
                                              : "text-gray-600"
                                          }
                                        />
                                        <span
                                          className={
                                            darkMode
                                              ? "text-gray-200"
                                              : "text-gray-700"
                                          }
                                        >
                                          {listing.members.toLocaleString()}
                                        </span>
                                      </div>
                                      <div className="flex items-center space-x-1">
                                        <Icon
                                          name="Eye"
                                          size={12}
                                          className={
                                            darkMode
                                              ? "text-gray-300"
                                              : "text-gray-600"
                                          }
                                        />
                                        <span
                                          className={
                                            darkMode
                                              ? "text-gray-200"
                                              : "text-gray-700"
                                          }
                                        >
                                          {listing.views}
                                        </span>
                                      </div>
                                      <div className="flex items-center space-x-1">
                                        <Icon
                                          name="MousePointerClick"
                                          size={12}
                                          className={
                                            darkMode
                                              ? "text-gray-300"
                                              : "text-gray-600"
                                          }
                                        />
                                        <span
                                          className={
                                            darkMode
                                              ? "text-gray-200"
                                              : "text-gray-700"
                                          }
                                        >
                                          {listing.clicks}
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Desktop: Horizontal layout */}
                                  <div className="hidden sm:flex items-center space-x-6 text-sm">
                                    <div className="flex items-center space-x-1">
                                      <Icon
                                        name="Users"
                                        size={14}
                                        className={
                                          darkMode
                                            ? "text-gray-300"
                                            : "text-gray-600"
                                        }
                                      />
                                      <span
                                        className={
                                          darkMode
                                            ? "text-gray-200"
                                            : "text-gray-700"
                                        }
                                      >
                                        {listing.members.toLocaleString()}
                                      </span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <Icon
                                        name="Eye"
                                        size={14}
                                        className={
                                          darkMode
                                            ? "text-gray-300"
                                            : "text-gray-600"
                                        }
                                      />
                                      <span
                                        className={
                                          darkMode
                                            ? "text-gray-200"
                                            : "text-gray-700"
                                        }
                                      >
                                        {listing.views}
                                      </span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <Icon
                                        name="MousePointerClick"
                                        size={14}
                                        className={
                                          darkMode
                                            ? "text-gray-300"
                                            : "text-gray-600"
                                        }
                                      />
                                      <span
                                        className={
                                          darkMode
                                            ? "text-gray-200"
                                            : "text-gray-700"
                                        }
                                      >
                                        {listing.clicks}
                                      </span>
                                    </div>
                                    <Badge
                                      variant="secondary"
                                      className={`text-xs ${
                                        darkMode
                                          ? "bg-gray-600 text-gray-100"
                                          : "bg-gray-200 text-gray-800"
                                      }`}
                                    >
                                      {
                                        categories.find(
                                          (cat) => cat.id === listing.category,
                                        )?.name
                                      }
                                    </Badge>
                                  </div>
                                </div>
                                {/* Price and actions section */}
                                <div className="flex items-center justify-between w-full sm:w-auto sm:flex-col sm:items-end sm:text-right">
                                  <div className="text-lg sm:text-xl font-bold text-[#5865F2] sm:mb-2">
                                    {listing.price.toLocaleString()}{" "}
                                    {listing.currency}
                                  </div>
                                  <div className="flex items-center space-x-1 sm:space-x-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleEditListing(listing)}
                                      className="text-xs sm:text-sm px-2 sm:px-3"
                                    >
                                      <Icon
                                        name="Edit"
                                        className="mr-1"
                                        size={12}
                                      />
                                      <span className="hidden sm:inline">
                                        {language === "en"
                                          ? "Edit"
                                          : "Редактировать"}
                                      </span>
                                      <span className="sm:hidden">
                                        {language === "en" ? "Edit" : "Ред."}
                                      </span>
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="destructive"
                                      onClick={() =>
                                        handleDeleteListing(listing.id)
                                      }
                                      className="p-1 sm:p-2"
                                    >
                                      <Icon name="Trash2" size={10} />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardHeader>
                          </Card>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </nav>

      {/* Edit Listing Modal */}
      <Dialog open={isEditListingOpen} onOpenChange={setIsEditListingOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {language === "en" ? "Edit Listing" : "Редактировать объявление"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-title">
                {language === "en" ? "Title" : "Заголовок"}
              </Label>
              <Input
                id="edit-title"
                placeholder={
                  language === "en"
                    ? "Brief description of the offer"
                    : "Краткое описание предложения"
                }
                value={editListing.title}
                onChange={(e) =>
                  setEditListing({ ...editListing, title: e.target.value })
                }
              />
            </div>

            <div>
              <Label htmlFor="edit-description">
                {language === "en" ? "Description" : "Описание"}
              </Label>
              <Textarea
                id="edit-description"
                placeholder={
                  language === "en"
                    ? "Detailed description of the advertising offer"
                    : "Детальное описание рекламного предложения"
                }
                value={editListing.description}
                onChange={(e) =>
                  setEditListing({
                    ...editListing,
                    description: e.target.value,
                  })
                }
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="edit-serverLink">
                {language === "en"
                  ? "Discord Server Link"
                  : "Ссылка на Discord сервер"}
              </Label>
              <Input
                id="edit-serverLink"
                placeholder="https://discord.gg/server"
                value={editListing.serverLink}
                onChange={(e) =>
                  setEditListing({
                    ...editListing,
                    serverLink: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <Label htmlFor="edit-category">
                {language === "en" ? "Category" : "Категория"}
              </Label>
              <Select
                value={editListing.category}
                onValueChange={(value) =>
                  setEditListing({ ...editListing, category: value })
                }
              >
                <SelectTrigger
                  className={
                    darkMode
                      ? "bg-[#36393F] border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }
                >
                  <SelectValue
                    placeholder={
                      language === "en"
                        ? "Gaming, IT, Finance"
                        : "Игры, ИТ, Финансы"
                    }
                  />
                </SelectTrigger>
                <SelectContent
                  className={
                    darkMode
                      ? "bg-[#36393F] border-gray-600"
                      : "bg-white border-gray-300"
                  }
                >
                  {categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id}
                      className={
                        darkMode
                          ? "text-white hover:bg-gray-600"
                          : "text-gray-900 hover:bg-gray-100"
                      }
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex space-x-2">
              <div className="flex-1">
                <Label htmlFor="edit-price">
                  {language === "en" ? "Price" : "Цена"}
                </Label>
                <Input
                  id="edit-price"
                  type="number"
                  placeholder="5,000"
                  value={editListing.price}
                  onChange={(e) =>
                    setEditListing({ ...editListing, price: e.target.value })
                  }
                />
              </div>
              <div className="w-24">
                <Label>&nbsp;</Label>
                <Select
                  value={editListing.currency}
                  onValueChange={(value) =>
                    setEditListing({ ...editListing, currency: value })
                  }
                >
                  <SelectTrigger
                    className={
                      darkMode
                        ? "bg-[#36393F] border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent
                    className={
                      darkMode
                        ? "bg-[#36393F] border-gray-600"
                        : "bg-white border-gray-300"
                    }
                  >
                    {currencies.map((currency) => (
                      <SelectItem
                        key={currency}
                        value={currency}
                        className={
                          darkMode
                            ? "text-white hover:bg-gray-600"
                            : "text-gray-900 hover:bg-gray-100"
                        }
                      >
                        {currency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsEditListingOpen(false)}
                className="flex-1"
              >
                {language === "en" ? "Cancel" : "Отмена"}
              </Button>
              <Button
                onClick={handleUpdateListing}
                className="flex-1 bg-[#5865F2] hover:bg-[#4752C4] text-white"
                disabled={
                  !editListing.title ||
                  !editListing.description ||
                  !editListing.category ||
                  !editListing.price
                }
              >
                {language === "en" ? "Update" : "Обновить"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
