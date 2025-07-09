export interface Listing {
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

export interface NewListing {
  title: string;
  description: string;
  category: string;
  price: string;
  currency: string;
  serverLink: string;
}

export type ViewMode = "gallery" | "list";
export type CurrentView = "listings" | "myListings";
export type SortBy =
  | "newest"
  | "oldest"
  | "price_low"
  | "price_high"
  | "popular";
