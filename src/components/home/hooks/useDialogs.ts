import { useState } from "react";
import { Listing } from "../types";

export function useDialogs() {
  const [isAddListingMobileOpen, setIsAddListingMobileOpen] = useState(false);
  const [isAddListingDesktopOpen, setIsAddListingDesktopOpen] = useState(false);
  const [isEditListingOpen, setIsEditListingOpen] = useState(false);
  const [editingListing, setEditingListing] = useState<Listing | null>(null);

  const handleEditListing = (listing: Listing) => {
    setEditingListing(listing);
    setIsEditListingOpen(true);
  };

  const closeEditDialog = () => {
    setIsEditListingOpen(false);
    setEditingListing(null);
  };

  return {
    isAddListingMobileOpen,
    setIsAddListingMobileOpen,
    isAddListingDesktopOpen,
    setIsAddListingDesktopOpen,
    isEditListingOpen,
    setIsEditListingOpen,
    editingListing,
    setEditingListing,
    handleEditListing,
    closeEditDialog,
  };
}
