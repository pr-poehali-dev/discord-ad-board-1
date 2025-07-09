import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import Icon from "@/components/ui/icon";
import { NewListing } from "./types";

interface Category {
  id: string;
  name: string;
}

interface CreateListingSheetProps {
  language: string;
  darkMode: boolean;
  onClose: () => void;
  onSave?: (listing: NewListing) => void;
}

export function CreateListingSheet({
  language,
  darkMode,
  onClose,
  onSave,
}: CreateListingSheetProps) {
  const [newListing, setNewListing] = useState<NewListing>({
    title: "",
    description: "",
    category: "",
    price: "",
    currency: "USD",
    serverLink: "",
  });

  const categories: Category[] = [
    { id: "gaming", name: language === "en" ? "Gaming" : "Игры" },
    { id: "finance", name: language === "en" ? "Finance" : "Финансы" },
    { id: "education", name: language === "en" ? "Education" : "Образование" },
    { id: "music", name: language === "en" ? "Music" : "Музыка" },
    { id: "it", name: "IT" },
  ];

  const currencies = ["USD", "EUR", "RUB", "LTC"];

  const handleSubmit = () => {
    if (onSave) {
      onSave(newListing);
    }
    setNewListing({
      title: "",
      description: "",
      category: "",
      price: "",
      currency: "USD",
      serverLink: "",
    });
    onClose();
  };

  return (
    <SheetContent side="right" className="h-[90vh] overflow-y-auto">
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
              placeholder="100"
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

        <div className="flex space-x-2 pt-4">
          <Button variant="outline" onClick={onClose} className="flex-1">
            {language === "en" ? "Cancel" : "Отмена"}
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-[#5865F2] hover:bg-[#4752C4] text-white"
            disabled={!newListing.title || !newListing.price}
          >
            <Icon name="Plus" className="mr-1" size={16} />
            {language === "en" ? "Add" : "Добавить"}
          </Button>
        </div>
      </div>
    </SheetContent>
  );
}
