import { useState, useMemo } from "react";
import { Listing, NewListing, SortBy } from "../types";

export function useListings(language: string) {
  const [listings, setListings] = useState<Listing[]>([
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
      title: "Tech Learning Hub",
      description: "Programming tutorials, code reviews, and career guidance",
      category: "education",
      price: 99,
      currency: "USD",
      serverLink: "https://discord.gg/example4",
      members: 6500,
      views: 780,
      clicks: 45,
      timeAgo: "2 days ago",
      serverName: "DevCommunity",
      isOwner: true,
      isPinned: false,
    },
    {
      id: "5",
      title: "IT Professionals Network",
      description:
        "Connect with IT professionals, share knowledge, and find job opportunities",
      category: "it",
      price: 175,
      currency: "EUR",
      serverLink: "https://discord.gg/example5",
      members: 9200,
      views: 1050,
      clicks: 68,
      timeAgo: "3 days ago",
      serverName: "TechPros Hub",
      isOwner: false,
      isPinned: false,
    },
  ]);

  const addListing = (newListing: NewListing) => {
    const listing: Listing = {
      id: Date.now().toString(),
      title: newListing.title,
      description: newListing.description,
      category: newListing.category,
      price: parseInt(newListing.price),
      currency: newListing.currency,
      serverLink: newListing.serverLink,
      serverName: "New Server",
      members: Math.floor(Math.random() * 10000) + 1000,
      views: Math.floor(Math.random() * 500) + 50,
      clicks: Math.floor(Math.random() * 50) + 5,
      timeAgo: "Just now",
      isOwner: true,
    };
    setListings((prev) => [listing, ...prev]);
  };

  const deleteListing = (id: string) => {
    setListings((prev) => prev.filter((listing) => listing.id !== id));
  };

  const togglePin = (id: string) => {
    setListings((prev) =>
      prev.map((listing) =>
        listing.id === id
          ? { ...listing, isPinned: !listing.isPinned }
          : listing,
      ),
    );
  };

  const editListing = (id: string, updatedListing: Partial<Listing>) => {
    setListings((prev) =>
      prev.map((listing) =>
        listing.id === id ? { ...listing, ...updatedListing } : listing,
      ),
    );
  };

  return {
    listings,
    addListing,
    deleteListing,
    togglePin,
    editListing,
  };
}
