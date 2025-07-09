import { useState, useMemo } from "react";
import { Listing, NewListing, SortBy } from "../types";

export function useListings(language: string) {
  const [listings, setListings] = useState<Listing[]>([
    {
      id: "1",
      title:
        language === "en"
          ? "Gaming Community Advertisement"
          : "Реклама игрового сообщества",
      description:
        language === "en"
          ? "We are looking for partnerships to advertise on large gaming servers. Target audience: 18-35 years old, interested in MMORPG and FPS games."
          : "Мы ищем партнерство для рекламы на крупных игровых серверах. Целевая аудитория: 18-35 лет, интересующиеся MMORPG и FPS играми.",
      category: "gaming",
      price: 500,
      currency: "USD",
      serverLink: "https://discord.gg/example1",
      serverName: "GameHub Discord",
      members: 15420,
      views: 1234,
      clicks: 89,
      timeAgo: language === "en" ? "2 hours ago" : "2 часа назад",
      isPinned: true,
    },
    {
      id: "2",
      title:
        language === "en"
          ? "Cryptocurrency Project Marketing"
          : "Маркетинг криптопроекта",
      description:
        language === "en"
          ? "We need advertising placement for our new DeFi platform. We offer competitive rates and flexible payment terms."
          : "Нужно размещение рекламы нашей новой DeFi-платформы. Предлагаем конкурентные ставки и гибкие условия оплаты.",
      category: "finance",
      price: 1200,
      currency: "USD",
      serverLink: "https://discord.gg/example2",
      serverName: "CryptoTrade Pro",
      members: 8950,
      views: 892,
      clicks: 67,
      timeAgo: language === "en" ? "5 hours ago" : "5 часов назад",
    },
    {
      id: "3",
      title:
        language === "en"
          ? "Educational Platform Promotion"
          : "Продвижение образовательной платформы",
      description:
        language === "en"
          ? "We are promoting an online programming school and are looking for educational Discord servers for partnerships."
          : "Мы продвигаем онлайн-школу программирования и ищем образовательные Discord-серверы для партнерства.",
      category: "education",
      price: 300,
      currency: "EUR",
      serverLink: "https://discord.gg/example3",
      serverName: "CodeAcademy Hub",
      members: 12300,
      views: 567,
      clicks: 45,
      timeAgo: language === "en" ? "1 day ago" : "1 день назад",
    },
    {
      id: "4",
      title:
        language === "en" ? "My Gaming Server Ad" : "Моё игровое объявление",
      description:
        language === "en"
          ? "Promote your projects on my Minecraft server with 5000+ active players"
          : "Рекламируйте свои проекты на моём Minecraft-сервере с 5000+ активных игроков",
      category: "gaming",
      price: 150,
      currency: "USD",
      serverLink: "https://discord.gg/myserver",
      serverName: "MyMinecraft Server",
      members: 5240,
      views: 234,
      clicks: 23,
      timeAgo: language === "en" ? "3 days ago" : "3 дня назад",
      isOwner: true,
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
      timeAgo: language === "en" ? "Just now" : "Только что",
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
