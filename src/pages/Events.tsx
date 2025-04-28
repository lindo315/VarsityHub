import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { events } from "@/lib/data";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EventList from "@/components/events/EventList";
import EventFilters from "@/components/events/EventFilters";
import { SearchInput } from "@/components/ui/search";
import { Event } from "@/lib/data";

const Events = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get("category") || "all";

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);
  const [filters, setFilters] = useState({
    category: categoryParam,
    date: "all",
  });

  useEffect(() => {
    let result = [...events];

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (event) =>
          event.title.toLowerCase().includes(term) ||
          event.description.toLowerCase().includes(term)
      );
    }

    // Filter by category
    if (filters.category !== "all") {
      result = result.filter((event) => event.category.id === filters.category);
    }

    // Filter by date
    if (filters.date !== "all") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const nextWeek = new Date(today);
      nextWeek.setDate(nextWeek.getDate() + 7);

      const nextMonth = new Date(today);
      nextMonth.setMonth(nextMonth.getMonth() + 1);

      switch (filters.date) {
        case "today":
          result = result.filter((event) => {
            const eventDate = new Date(event.startDateTime);
            return (
              eventDate.getDate() === today.getDate() &&
              eventDate.getMonth() === today.getMonth() &&
              eventDate.getFullYear() === today.getFullYear()
            );
          });
          break;
        case "tomorrow":
          result = result.filter((event) => {
            const eventDate = new Date(event.startDateTime);
            return (
              eventDate.getDate() === tomorrow.getDate() &&
              eventDate.getMonth() === tomorrow.getMonth() &&
              eventDate.getFullYear() === tomorrow.getFullYear()
            );
          });
          break;
        case "this-week":
          result = result.filter((event) => {
            const eventDate = new Date(event.startDateTime);
            return eventDate >= today && eventDate < nextWeek;
          });
          break;
        case "this-month":
          result = result.filter((event) => {
            const eventDate = new Date(event.startDateTime);
            return eventDate >= today && eventDate < nextMonth;
          });
          break;
      }
    }

    setFilteredEvents(result);
  }, [searchTerm, filters]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8 container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Events</h1>
          <p className="text-gray-500">
            Discover and register for upcoming events at varsity University
          </p>
        </div>

        <div className="mb-6">
          <SearchInput
            placeholder="Search events..."
            className="max-w-md"
            onSearch={handleSearch}
          />
        </div>

        <EventFilters onFilterChange={handleFilterChange} filters={filters} />

        <EventList events={filteredEvents} />
      </main>
      <Footer />
    </div>
  );
};

export default Events;
