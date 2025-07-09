import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Icon from "@/components/ui/icon";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { CreateListingSheet } from "./CreateListingSheet";
import { CurrentView } from "./types";

interface HeaderSectionProps {
  language: string;
  darkMode: boolean;
  isAdminMode: boolean;
  currentView: CurrentView;
  isAddListingMobileOpen: boolean;
  setLanguage: (lang: string) => void;
  setDarkMode: (dark: boolean) => void;
  setIsAdminMode: (admin: boolean) => void;
  setCurrentView: (view: CurrentView) => void;
  setIsAddListingMobileOpen: (open: boolean) => void;
  setIsAddListingDesktopOpen: (open: boolean) => void;
  changeLanguage: (lang: string) => void;
}

export function HeaderSection({
  language,
  darkMode,
  isAdminMode,
  currentView,
  isAddListingMobileOpen,
  setLanguage,
  setDarkMode,
  setIsAdminMode,
  setCurrentView,
  setIsAddListingMobileOpen,
  setIsAddListingDesktopOpen,
  changeLanguage,
}: HeaderSectionProps) {
  return (
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
              <Label htmlFor="language-switch" className="text-sm font-medium">
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
              <Button
                onClick={() => setIsAddListingDesktopOpen(true)}
                className="hidden sm:flex bg-[#5865F2] hover:bg-[#4752C4] text-white"
              >
                <Icon name="Plus" className="mr-1" size={16} />
                {language === "en" ? "Add Listing" : "Добавить"}
              </Button>

              <Sheet
                open={isAddListingMobileOpen}
                onOpenChange={setIsAddListingMobileOpen}
              >
                <SheetTrigger asChild>
                  <Button className="sm:hidden bg-[#5865F2] hover:bg-[#4752C4] text-white">
                    <Icon name="Plus" size={16} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="h-[90vh] overflow-y-auto">
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
            className={`flex-1 ${currentView === "listings" ? "bg-[#5865F2] hover:bg-[#4752C4]" : ""}`}
          >
            <Icon name="Globe" className="mr-1" size={14} />
            {language === "en" ? "Public" : "Публичные"}
          </Button>
          <Button
            variant={currentView === "myListings" ? "default" : "outline"}
            size="sm"
            onClick={() => setCurrentView("myListings")}
            className={`flex-1 ${currentView === "myListings" ? "bg-[#5865F2] hover:bg-[#4752C4]" : ""}`}
          >
            <Icon name="User" className="mr-1" size={14} />
            {language === "en" ? "My Listings" : "Мои объявления"}
          </Button>
        </div>
      </div>
    </div>
  );
}
