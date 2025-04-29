import React, { createContext, useContext, useState, ReactNode } from "react";
import { events, Event } from "@/lib/data";
import { newsArticles } from "@/lib/data";

// Define the types for our search results
type SearchResult = {
  type: "event" | "news" | "page";
  id: string;
  title: string;
  description: string;
  url: string;
  image?: string;
  date?: string;
  category?: string;
};

interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchResults: SearchResult[];
  isSearching: boolean;
  performSearch: (term: string) => void;
  resetSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const performSearch = (term: string) => {
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    setSearchTerm(term);

    // Simulate a slight delay to mimic a real search
    setTimeout(() => {
      const normalizedTerm = term.toLowerCase().trim();

      // Search events
      const eventResults = events
        .filter(
          (event) =>
            event.title.toLowerCase().includes(normalizedTerm) ||
            event.description.toLowerCase().includes(normalizedTerm)
        )
        .map((event) => ({
          type: "event" as const,
          id: event.id,
          title: event.title,
          description: event.description.substring(0, 120) + "...",
          url: `/events/${event.id}`,
          image: event.imageUrl,
          date: event.startDateTime,
          category: event.category.name,
        }));

      // Search news
      const newsResults = newsArticles
        .filter(
          (article) =>
            article.title.toLowerCase().includes(normalizedTerm) ||
            article.content.toLowerCase().includes(normalizedTerm) ||
            article.summary.toLowerCase().includes(normalizedTerm)
        )
        .map((article) => ({
          type: "news" as const,
          id: article.id,
          title: article.title,
          description: article.summary,
          url: `/news/${article.id}`,
          image: article.imageUrl,
          date: article.publishDate,
          category: article.category,
        }));

      // Static pages
      const pages = [
        {
          id: "home",
          title: "Home",
          url: "/",
          description: "VarsityHub home page",
        },
        {
          id: "events",
          title: "Events",
          url: "/events",
          description: "Browse all campus events",
        },
        {
          id: "sports",
          title: "Sports",
          url: "/sports",
          description: "Varsity sports teams and fixtures",
        },
        {
          id: "news",
          title: "News",
          url: "/news",
          description: "Campus news and announcements",
        },
        {
          id: "about",
          title: "About",
          url: "/about",
          description: "About VarsityHub and Varsity University",
        },
      ];

      const pageResults = pages
        .filter(
          (page) =>
            page.title.toLowerCase().includes(normalizedTerm) ||
            page.description.toLowerCase().includes(normalizedTerm)
        )
        .map((page) => ({
          type: "page" as const,
          id: page.id,
          title: page.title,
          description: page.description,
          url: page.url,
        }));

      // Combine all results
      const allResults = [...eventResults, ...newsResults, ...pageResults];

      setSearchResults(allResults);
      setIsSearching(false);
    }, 300);
  };

  const resetSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
  };

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        searchResults,
        isSearching,
        performSearch,
        resetSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
