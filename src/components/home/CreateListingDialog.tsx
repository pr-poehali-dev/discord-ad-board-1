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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";
import { NewListing } from "./types";

interface Category {
  id: string;
  name: string;
}

interface CreateListingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  language: string;
  darkMode: boolean;
  onSave?: (listing: NewListing) => void;
}

export function CreateListingDialog({
  open,
  onOpenChange,
  language,
  darkMode,
  onSave,
}: CreateListingDialogProps) {
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
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`sm:max-w-[500px] ${
          darkMode
            ? "bg-[#36393F] border-gray-600 text-white"
            : "bg-white border-gray-300 text-gray-900"
        }`}
      >
        <DialogHeader>
          <DialogTitle className={darkMode ? "text-white" : "text-gray-900"}>
            {language === "en"
              ? "Create New Listing"
              : "Создать новое объявление"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
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
                className={
                  darkMode
                    ? "bg-[#40444B] border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                }
              />
            </div>

            <div className="col-span-2">
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
                className={
                  darkMode
                    ? "bg-[#40444B] border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                }
              />
            </div>

            <div className="col-span-2">
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
                className={
                  darkMode
                    ? "bg-[#40444B] border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
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
                      ? "bg-[#40444B] border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }
                >
                  <SelectValue
                    placeholder={
                      language === "en"
                        ? "Select category"
                        : "Выберите категорию"
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
                <SelectTrigger
                  className={
                    darkMode
                      ? "bg-[#40444B] border-gray-600 text-white"
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

            <div className="col-span-2">
              <Label htmlFor="price">
                {language === "en" ? "Price" : "Цена"}
              </Label>
              <Input
                id="price"
                type="number"
                placeholder="100"
                value={newListing.price}
                onChange={(e) =>
                  setNewListing({
                    ...newListing,
                    price: e.target.value,
                  })
                }
                className={
                  darkMode
                    ? "bg-[#40444B] border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                }
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className={
                darkMode
                  ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }
            >
              {language === "en" ? "Cancel" : "Отмена"}
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-[#5865F2] hover:bg-[#4752C4] text-white"
              disabled={!newListing.title || !newListing.price}
            >
              <Icon name="Plus" className="mr-1" size={16} />
              {language === "en" ? "Create Listing" : "Создать объявление"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
