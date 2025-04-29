import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useSearch } from "@/contexts/SearchContext";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Newspaper,
  FileText,
  Loader2,
  Search as SearchIcon,
} from "lucide-react";

interface GlobalSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const GlobalSearch = ({ open, onOpenChange }: GlobalSearchProps) => {
  const {
    searchTerm,
    setSearchTerm,
    searchResults,
    isSearching,
    performSearch,
  } = useSearch();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the input when the dialog opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const handleSelect = (url: string) => {
    onOpenChange(false);
    navigate(url);
  };

  // Different icons based on result type
  const getIcon = (type: string) => {
    switch (type) {
      case "event":
        return <Calendar className="h-4 w-4 text-varsity-blue" />;
      case "news":
        return <Newspaper className="h-4 w-4 text-varsity-blue" />;
      case "page":
        return <FileText className="h-4 w-4 text-varsity-blue" />;
      default:
        return <SearchIcon className="h-4 w-4 text-varsity-blue" />;
    }
  };

  // Get avatar fallback based on type
  const getAvatarFallback = (type: string) => {
    switch (type) {
      case "event":
        return "E";
      case "news":
        return "N";
      case "page":
        return "P";
      default:
        return "?";
    }
  };

  // Group results by type
  const eventResults = searchResults.filter(
    (result) => result.type === "event"
  );
  const newsResults = searchResults.filter((result) => result.type === "news");
  const pageResults = searchResults.filter((result) => result.type === "page");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 max-w-3xl mx-auto">
        <Command>
          <CommandInput
            ref={inputRef}
            placeholder="Search for events, news, pages..."
            value={searchTerm}
            onValueChange={(value) => {
              setSearchTerm(value);
              performSearch(value);
            }}
          />

          <CommandList className="max-h-[70vh] overflow-auto">
            {isSearching ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="h-6 w-6 animate-spin text-varsity-blue" />
              </div>
            ) : (
              <>
                <CommandEmpty>No results found.</CommandEmpty>

                {eventResults.length > 0 && (
                  <CommandGroup heading="Events">
                    {eventResults.map((result) => (
                      <CommandItem
                        key={`event-${result.id}`}
                        onSelect={() => handleSelect(result.url)}
                        className="py-3"
                      >
                        <div className="flex w-full items-start gap-2">
                          <Avatar className="h-10 w-10 flex-shrink-0 bg-gray-100">
                            {result.image ? (
                              <img
                                src={result.image}
                                alt={result.title}
                                className="object-cover h-full w-full"
                              />
                            ) : (
                              <AvatarFallback className="bg-varsity-blue/10 text-varsity-blue">
                                {getAvatarFallback(result.type)}
                              </AvatarFallback>
                            )}
                          </Avatar>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <h4 className="font-medium line-clamp-1">
                                {result.title}
                              </h4>
                              {result.date && (
                                <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                                  {format(new Date(result.date), "MMM d, yyyy")}
                                </span>
                              )}
                            </div>

                            <p className="text-sm text-gray-500 line-clamp-1">
                              {result.description}
                            </p>

                            {result.category && (
                              <Badge variant="outline" className="mt-1 text-xs">
                                {result.category}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}

                {newsResults.length > 0 && (
                  <CommandGroup heading="News">
                    {newsResults.map((result) => (
                      <CommandItem
                        key={`news-${result.id}`}
                        onSelect={() => handleSelect(result.url)}
                        className="py-3"
                      >
                        <div className="flex w-full items-start gap-2">
                          <Avatar className="h-10 w-10 flex-shrink-0 bg-gray-100">
                            {result.image ? (
                              <img
                                src={result.image}
                                alt={result.title}
                                className="object-cover h-full w-full"
                              />
                            ) : (
                              <AvatarFallback className="bg-varsity-gold/10 text-varsity-gold">
                                {getAvatarFallback(result.type)}
                              </AvatarFallback>
                            )}
                          </Avatar>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <h4 className="font-medium line-clamp-1">
                                {result.title}
                              </h4>
                              {result.date && (
                                <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                                  {format(new Date(result.date), "MMM d, yyyy")}
                                </span>
                              )}
                            </div>

                            <p className="text-sm text-gray-500 line-clamp-1">
                              {result.description}
                            </p>

                            {result.category && (
                              <Badge variant="outline" className="mt-1 text-xs">
                                {result.category}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}

                {pageResults.length > 0 && (
                  <CommandGroup heading="Pages">
                    {pageResults.map((result) => (
                      <CommandItem
                        key={`page-${result.id}`}
                        onSelect={() => handleSelect(result.url)}
                        className="py-2"
                      >
                        <div className="flex items-center gap-2">
                          {getIcon(result.type)}
                          <div>
                            <h4 className="font-medium">{result.title}</h4>
                            <p className="text-xs text-gray-500">
                              {result.description}
                            </p>
                          </div>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </>
            )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export default GlobalSearch;
