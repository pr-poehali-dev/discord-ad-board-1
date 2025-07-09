import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import { ViewMode, SortBy } from "./types";

interface Category {
  id: string;
  name: string;
}

interface FilterControlsProps {
  language: string;
  darkMode: boolean;
  searchTerm: string;
  selectedCategories: string[];
  selectedCurrencies: string[];
  sortBy: SortBy;
  viewMode: ViewMode;
  categories: Category[];
  currencies: string[];
  setSearchTerm: (term: string) => void;
  setSelectedCategories: (categories: string[]) => void;
  setSelectedCurrencies: (currencies: string[]) => void;
  setSortBy: (sort: SortBy) => void;
  setViewMode: (mode: ViewMode) => void;
  handleCategoryChange: (categoryId: string, checked: boolean) => void;
  handleCurrencyChange: (currency: string, checked: boolean) => void;
}

export function FilterControls({
  language,
  darkMode,
  searchTerm,
  selectedCategories,
  selectedCurrencies,
  sortBy,
  viewMode,
  categories,
  currencies,
  setSearchTerm,
  setSelectedCategories,
  setSelectedCurrencies,
  setSortBy,
  setViewMode,
  handleCategoryChange,
  handleCurrencyChange,
}: FilterControlsProps) {
  return (
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
                language === "en" ? "Search listings..." : "Поиск объявлений..."
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
                          handleCategoryChange(category.id, checked as boolean)
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
                    <div key={currency} className="flex items-center space-x-2">
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
                        {language === "en" ? "Oldest First" : "Сначала старые"}
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
  );
}
