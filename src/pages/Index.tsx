import { useState } from "react";
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
  timeAgo: string;
  serverName: string;
  isOwner?: boolean;
}

const Index = () => {
  const [language, setLanguage] = useState("en");
  const [darkMode, setDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState("listings");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("newest");
  const [isAddListingOpen, setIsAddListingOpen] = useState(false);

  const [newListing, setNewListing] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    currency: "USD",
    serverLink: "",
  });

  const categories = [
    { id: "gaming", name: language === "en" ? "Gaming" : "Игры" },
    { id: "finance", name: language === "en" ? "Finance" : "Финансы" },
    { id: "education", name: language === "en" ? "Education" : "Образование" },
    { id: "music", name: language === "en" ? "Music" : "Музыка" },
    { id: "it", name: language === "en" ? "IT" : "ИТ" },
  ];

  const currencies = ["USD", "EUR", "RUB", "BTC"];

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
      timeAgo: language === "en" ? "2 hours ago" : "2 часа назад",
      serverName: "GameHub",
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
      timeAgo: language === "en" ? "4 hours ago" : "4 часа назад",
      serverName: "CryptoTalk",
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
    setIsAddListingOpen(false);
  };

  const handleDeleteListing = (id: string) => {
    setListings((prev) => prev.filter((listing) => listing.id !== id));
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedCurrencies([]);
    setSortBy("newest");
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
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Icon
                  name="MessageSquare"
                  className="text-[#5865F2]"
                  size={32}
                />
                <h1 className="text-2xl font-bold">Discord Ads Board</h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">EN</SelectItem>
                  <SelectItem value="ru">RU</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center space-x-2">
                <Icon name="Sun" size={16} />
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                <Icon name="Moon" size={16} />
              </div>

              <Dialog
                open={isAddListingOpen}
                onOpenChange={setIsAddListingOpen}
              >
                <DialogTrigger asChild>
                  <Button className="bg-[#5865F2] hover:bg-[#4752C4] text-white">
                    <Icon name="Plus" className="mr-2" size={16} />
                    {language === "en" ? "Add Listing" : "Добавить объявление"}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
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
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              language === "en"
                                ? "Gaming, IT, Finance"
                                : "Игры, ИТ, Финансы"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
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
                className="flex items-center space-x-2"
              >
                <Icon name="List" size={16} />
                <span>{language === "en" ? "Listings" : "Объявления"}</span>
              </TabsTrigger>
              <TabsTrigger
                value="profile"
                className="flex items-center space-x-2"
              >
                <Icon name="User" size={16} />
                <span>
                  {language === "en" ? "My Listings" : "Мои объявления"}
                </span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="listings" className="mt-0">
              {/* Filters */}
              <div className="py-6 space-y-4">
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-64">
                    <Label className="text-sm font-medium mb-2 block">
                      {language === "en" ? "Categories" : "Категории"}
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
                            className="text-sm cursor-pointer"
                          >
                            {category.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex-1 min-w-48">
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
                            className="text-sm cursor-pointer"
                          >
                            {currency}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex-1 min-w-48">
                    <Label className="text-sm font-medium mb-2 block">
                      {language === "en" ? "Sorting" : "Сортировка"}
                    </Label>
                    <div className="flex items-center space-x-4">
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="newest">
                            {language === "en"
                              ? "Newest First"
                              : "Сначала новые"}
                          </SelectItem>
                          <SelectItem value="cheapest">
                            {language === "en"
                              ? "Cheapest First"
                              : "Сначала дешёвые"}
                          </SelectItem>
                          <SelectItem value="expensive">
                            {language === "en"
                              ? "Most Expensive"
                              : "Сначала дорогие"}
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <Button
                        variant="outline"
                        onClick={resetFilters}
                        className="flex items-center space-x-2"
                      >
                        <Icon name="RotateCcw" size={16} />
                        <span>{language === "en" ? "Reset" : "Сброс"}</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Listings */}
              <div className="pb-8">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg font-semibold mb-2">
                              {listing.title}
                            </CardTitle>
                            <p
                              className={`text-sm ${
                                darkMode ? "text-gray-300" : "text-gray-600"
                              }`}
                            >
                              {listing.description}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-[#5865F2]">
                              {listing.price.toLocaleString()}{" "}
                              {listing.currency}
                            </div>
                            <div
                              className={`text-xs ${
                                darkMode ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              {listing.timeAgo}
                            </div>
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
                              <span className="text-sm font-medium">
                                {listing.serverName}
                              </span>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {
                                categories.find(
                                  (cat) => cat.id === listing.category,
                                )?.name
                              }
                            </Badge>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <Icon name="Users" size={14} />
                                <span>{listing.members.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Icon name="Eye" size={14} />
                                <span>{listing.views}</span>
                              </div>
                            </div>

                            <Button
                              size="sm"
                              className="bg-[#5865F2] hover:bg-[#4752C4] text-white"
                            >
                              <Icon
                                name="MessageCircle"
                                className="mr-1"
                                size={14}
                              />
                              {language === "en" ? "Contact" : "Связаться"}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
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
                      darkMode ? "text-gray-400" : "text-gray-500"
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
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                              <CardTitle className="text-lg font-semibold mb-2">
                                {listing.title}
                              </CardTitle>
                              <p
                                className={`text-sm ${
                                  darkMode ? "text-gray-300" : "text-gray-600"
                                }`}
                              >
                                {listing.description}
                              </p>
                            </div>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteListing(listing.id)}
                            >
                              <Icon name="Trash2" size={14} />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="text-xl font-bold text-[#5865F2]">
                                {listing.price.toLocaleString()}{" "}
                                {listing.currency}
                              </div>
                              <Badge variant="secondary" className="text-xs">
                                {
                                  categories.find(
                                    (cat) => cat.id === listing.category,
                                  )?.name
                                }
                              </Badge>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1">
                                  <Icon name="Users" size={14} />
                                  <span>
                                    {listing.members.toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Icon name="Eye" size={14} />
                                  <span>{listing.views}</span>
                                </div>
                              </div>

                              <Button size="sm" variant="outline">
                                <Icon name="Edit" className="mr-1" size={14} />
                                {language === "en" ? "Edit" : "Редактировать"}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </nav>
    </div>
  );
};

export default Index;
