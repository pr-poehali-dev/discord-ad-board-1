import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/ui/icon";
import { Listing, ViewMode } from "./types";

interface ListingCardProps {
  listing: Listing;
  language: string;
  darkMode: boolean;
  isAdminMode: boolean;
  viewMode: ViewMode;
  onEdit?: (listing: Listing) => void;
  onDelete: (id: string) => void;
  onTogglePin: (id: string) => void;
  t: (key: string) => string;
}

export function ListingCard({
  listing,
  language,
  darkMode,
  isAdminMode,
  viewMode,
  onEdit,
  onDelete,
  onTogglePin,
  t,
}: ListingCardProps) {
  if (viewMode === "gallery") {
    return (
      <Card
        className={`transition-all duration-300 hover:shadow-lg ${
          darkMode ? "bg-[#36393F] border-gray-600" : "bg-white border-gray-200"
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
                      onCheckedChange={() => onTogglePin(listing.id)}
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
                      onClick={() => onDelete(listing.id)}
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
              {listing.isOwner && onEdit && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEdit(listing)}
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
          {/* Content section */}
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
                    onCheckedChange={() => onTogglePin(listing.id)}
                    className="data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500"
                  />
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onDelete(listing.id)}
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

            {/* Mobile metadata - stacked vertically */}
            <div className="block sm:hidden space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon
                    name="MessageSquare"
                    className="text-[#5865F2]"
                    size={14}
                  />
                  <span
                    className={`text-sm ${darkMode ? "text-white" : "text-gray-900"}`}
                  >
                    {listing.serverName}
                  </span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {listing.category}
                </Badge>
              </div>

              <div className="flex items-center space-x-3 text-xs">
                <div className="flex items-center space-x-1">
                  <Icon
                    name="Users"
                    size={12}
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
                    size={12}
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
                    size={12}
                    className={darkMode ? "text-gray-300" : "text-gray-600"}
                  />
                  <span
                    className={darkMode ? "text-gray-200" : "text-gray-700"}
                  >
                    {listing.clicks}
                  </span>
                </div>
                <span
                  className={`text-xs ${darkMode ? "text-gray-300" : "text-gray-500"}`}
                >
                  {listing.timeAgo}
                </span>
              </div>
            </div>

            {/* Desktop metadata - horizontal layout */}
            <div className="hidden sm:block">
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
                    className={`text-xs ${darkMode ? "text-gray-300" : "text-gray-500"}`}
                  >
                    {listing.timeAgo}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Price and actions section */}
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
                <span className="hidden sm:inline">
                  {language === "en" ? "Visit" : "Перейти"}
                </span>
                <span className="sm:hidden">
                  {language === "en" ? "Go" : "→"}
                </span>
              </Button>
              {listing.isOwner && onEdit && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEdit(listing)}
                  className="text-xs sm:text-sm px-2 sm:px-3"
                >
                  <Icon name="Edit" className="mr-1" size={12} />
                  <span className="hidden sm:inline">
                    {language === "en" ? "Edit" : "Редактировать"}
                  </span>
                  <span className="sm:hidden">
                    {language === "en" ? "Edit" : "Ред."}
                  </span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
