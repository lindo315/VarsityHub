import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { events, categories, locations } from "@/lib/data";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EventList from "@/components/events/EventList";
import { SearchInput } from "@/components/ui/search";
import { Event } from "@/lib/data";
import {
  ChevronDown,
  Calendar,
  Filter,
  CalendarDays,
  X,
  MapPin,
  Search as SearchIcon,
  Check,
  Clock,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  format,
  isAfter,
  isBefore,
  addDays,
  isToday,
  isTomorrow,
  isThisWeek,
  isThisMonth,
} from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Events = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get("category") || "all";
  const searchParam = queryParams.get("search") || "";
  const viewParam = queryParams.get("view") || "grid";

  const [searchTerm, setSearchTerm] = useState(searchParam);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [filters, setFilters] = useState({
    category: categoryParam,
    date: "all",
    location: "all",
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam !== "all" ? [categoryParam] : []
  );
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Calculate today and future dates for filtering
  const today = new Date();
  const tomorrow = addDays(today, 1);
  const nextWeek = addDays(today, 7);
  const nextMonth = addDays(today, 30);

  useEffect(() => {
    // Update URL when filters change
    const params = new URLSearchParams();
    if (filters.category !== "all") {
      params.set("category", filters.category);
    }
    if (searchTerm) {
      params.set("search", searchTerm);
    }
    if (viewParam !== "grid") {
      params.set("view", viewParam);
    }

    const newUrl = `${location.pathname}${
      params.toString() ? `?${params.toString()}` : ""
    }`;
    navigate(newUrl, { replace: true });

    // Apply filters
    filterEvents();
  }, [filters, searchTerm, selectedCategories, selectedLocations, viewParam]);

  const filterEvents = () => {
    let result = [...events];

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (event) =>
          event.title.toLowerCase().includes(term) ||
          event.description.toLowerCase().includes(term) ||
          event.location.name.toLowerCase().includes(term) ||
          event.category.name.toLowerCase().includes(term)
      );
    }

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      result = result.filter((event) =>
        selectedCategories.includes(event.category.id)
      );
    }
    // Or by category parameter if no selected categories
    else if (filters.category !== "all") {
      result = result.filter((event) => event.category.id === filters.category);
    }

    // Filter by selected locations
    if (selectedLocations.length > 0) {
      result = result.filter((event) =>
        selectedLocations.includes(event.location.id)
      );
    }

    // Filter by date
    if (filters.date !== "all") {
      switch (filters.date) {
        case "today":
          result = result.filter((event) =>
            isToday(new Date(event.startDateTime))
          );
          break;
        case "tomorrow":
          result = result.filter((event) =>
            isTomorrow(new Date(event.startDateTime))
          );
          break;
        case "this-week":
          result = result.filter(
            (event) =>
              isAfter(new Date(event.startDateTime), today) &&
              isBefore(new Date(event.startDateTime), nextWeek)
          );
          break;
        case "this-month":
          result = result.filter(
            (event) =>
              isAfter(new Date(event.startDateTime), today) &&
              isBefore(new Date(event.startDateTime), nextMonth)
          );
          break;
      }
    }

    setFilteredEvents(result);
  };

  const handleCategoryToggle = (categoryId: string) => {
    const updatedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];

    setSelectedCategories(updatedCategories);
  };

  const handleLocationToggle = (locationId: string) => {
    const updatedLocations = selectedLocations.includes(locationId)
      ? selectedLocations.filter((id) => id !== locationId)
      : [...selectedLocations, locationId];

    setSelectedLocations(updatedLocations);
  };

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters({ ...filters, ...newFilters });
  };

  const handleDateFilterChange = (dateFilter: string) => {
    setFilters({ ...filters, date: dateFilter });
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);

    // Apply different filters based on tab
    if (tab === "today") {
      handleDateFilterChange("today");
    } else if (tab === "tomorrow") {
      handleDateFilterChange("tomorrow");
    } else if (tab === "upcoming") {
      handleDateFilterChange("this-week");
    } else {
      // All events
      handleDateFilterChange("all");
    }
  };

  const resetAllFilters = () => {
    setFilters({
      category: "all",
      date: "all",
      location: "all",
    });
    setSelectedCategories([]);
    setSelectedLocations([]);
    setSearchTerm("");
  };

  const toggleViewMode = (mode: string) => {
    navigate(`${location.pathname}?view=${mode}`);
  };

  // Group events by date for list view
  const eventsByDate = useMemo(() => {
    const grouped: Record<string, Event[]> = {};

    filteredEvents.forEach((event) => {
      const date = format(new Date(event.startDateTime), "yyyy-MM-dd");
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(event);
    });

    // Sort dates
    return Object.keys(grouped)
      .sort()
      .map((date) => ({
        date,
        formattedDate: format(new Date(date), "EEEE, MMMM d, yyyy"),
        events: grouped[date].sort(
          (a, b) =>
            new Date(a.startDateTime).getTime() -
            new Date(b.startDateTime).getTime()
        ),
      }));
  }, [filteredEvents]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        {/* Header */}
        <section className="bg-varsity-blue text-white py-12">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4">Campus Events</h1>
              <p className="text-white/80 text-lg mb-8">
                Discover and register for upcoming events at Varsity University
              </p>

              <div className="relative max-w-2xl mx-auto">
                <SearchInput
                  placeholder="Search events by title, description, location..."
                  className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  onSearch={handleSearch}
                  value={searchTerm}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Tab navigation */}
        <div className="border-b bg-white sticky top-16 z-10 shadow-sm">
          <div className="container">
            <div className="flex items-center justify-between">
              <Tabs
                value={activeTab}
                onValueChange={handleTabChange}
                className="w-full"
              >
                <TabsList className="bg-transparent h-14">
                  <TabsTrigger
                    value="all"
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-varsity-blue rounded-none h-full px-4"
                  >
                    All Events
                  </TabsTrigger>
                  <TabsTrigger
                    value="today"
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-varsity-blue rounded-none h-full px-4"
                  >
                    Today
                  </TabsTrigger>
                  <TabsTrigger
                    value="tomorrow"
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-varsity-blue rounded-none h-full px-4"
                  >
                    Tomorrow
                  </TabsTrigger>
                  <TabsTrigger
                    value="upcoming"
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-varsity-blue rounded-none h-full px-4"
                  >
                    This Week
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-9">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel>Filter By Date</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      checked={filters.date === "all"}
                      onCheckedChange={() => handleDateFilterChange("all")}
                    >
                      All Dates
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filters.date === "today"}
                      onCheckedChange={() => handleDateFilterChange("today")}
                    >
                      Today
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filters.date === "tomorrow"}
                      onCheckedChange={() => handleDateFilterChange("tomorrow")}
                    >
                      Tomorrow
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filters.date === "this-week"}
                      onCheckedChange={() =>
                        handleDateFilterChange("this-week")
                      }
                    >
                      This Week
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filters.date === "this-month"}
                      onCheckedChange={() =>
                        handleDateFilterChange("this-month")
                      }
                    >
                      This Month
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="border-l h-6 mx-1"></div>

                <Button
                  variant={viewParam === "list" ? "default" : "outline"}
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => toggleViewMode("list")}
                >
                  <Calendar className="h-4 w-4" />
                </Button>
                <Button
                  variant={
                    viewParam === "grid" || viewParam === null
                      ? "default"
                      : "outline"
                  }
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => toggleViewMode("grid")}
                >
                  <div className="grid grid-cols-2 gap-0.5">
                    <div className="h-1.5 w-1.5 rounded-sm bg-current"></div>
                    <div className="h-1.5 w-1.5 rounded-sm bg-current"></div>
                    <div className="h-1.5 w-1.5 rounded-sm bg-current"></div>
                    <div className="h-1.5 w-1.5 rounded-sm bg-current"></div>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar filters */}
            <div className="md:w-1/4 shrink-0">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">
                      Filters
                    </CardTitle>
                    {(selectedCategories.length > 0 ||
                      selectedLocations.length > 0 ||
                      filters.date !== "all" ||
                      searchTerm) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={resetAllFilters}
                        className="h-8 px-2 text-xs"
                      >
                        <X className="h-3 w-3 mr-1" />
                        Clear all
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Active filters */}
                  {(selectedCategories.length > 0 ||
                    selectedLocations.length > 0 ||
                    filters.date !== "all" ||
                    searchTerm) && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-gray-500">
                        Active Filters
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {searchTerm && (
                          <Badge
                            variant="secondary"
                            className="rounded-full flex items-center gap-1 pl-2 pr-1 bg-gray-100"
                          >
                            <SearchIcon className="h-3 w-3 mr-1" />
                            {searchTerm}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-5 w-5 p-0 rounded-full hover:bg-gray-200"
                              onClick={() => setSearchTerm("")}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        )}

                        {filters.date !== "all" && (
                          <Badge
                            variant="secondary"
                            className="rounded-full flex items-center gap-1 pl-2 pr-1 bg-gray-100"
                          >
                            <CalendarDays className="h-3 w-3 mr-1" />
                            {filters.date === "today" && "Today"}
                            {filters.date === "tomorrow" && "Tomorrow"}
                            {filters.date === "this-week" && "This Week"}
                            {filters.date === "this-month" && "This Month"}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-5 w-5 p-0 rounded-full hover:bg-gray-200"
                              onClick={() => handleDateFilterChange("all")}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        )}

                        {selectedCategories.map((id) => {
                          const category = categories.find((c) => c.id === id);
                          return category ? (
                            <Badge
                              key={id}
                              variant="secondary"
                              className="rounded-full flex items-center gap-1 pl-2 pr-1 bg-gray-100"
                            >
                              {category.name}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-5 w-5 p-0 rounded-full hover:bg-gray-200"
                                onClick={() => handleCategoryToggle(id)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </Badge>
                          ) : null;
                        })}

                        {selectedLocations.map((id) => {
                          const location = locations.find((l) => l.id === id);
                          return location ? (
                            <Badge
                              key={id}
                              variant="secondary"
                              className="rounded-full flex items-center gap-1 pl-2 pr-1 bg-gray-100"
                            >
                              <MapPin className="h-3 w-3 mr-1" />
                              {location.name}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-5 w-5 p-0 rounded-full hover:bg-gray-200"
                                onClick={() => handleLocationToggle(id)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </Badge>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}

                  {/* Category filter */}
                  <Accordion
                    type="single"
                    collapsible
                    defaultValue="categories"
                  >
                    <AccordionItem value="categories" className="border-none">
                      <AccordionTrigger className="py-2 hover:no-underline">
                        <span className="text-sm font-medium">Categories</span>
                      </AccordionTrigger>
                      <AccordionContent className="pt-1 pb-3">
                        <div className="space-y-2">
                          {categories.map((category) => (
                            <div
                              key={category.id}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={`category-${category.id}`}
                                checked={selectedCategories.includes(
                                  category.id
                                )}
                                onCheckedChange={() =>
                                  handleCategoryToggle(category.id)
                                }
                              />
                              <label
                                htmlFor={`category-${category.id}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                              >
                                <category.icon className="h-4 w-4 mr-2 text-gray-500" />
                                {category.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  {/* Location filter */}
                  <Accordion type="single" collapsible defaultValue="locations">
                    <AccordionItem value="locations" className="border-none">
                      <AccordionTrigger className="py-2 hover:no-underline">
                        <span className="text-sm font-medium">Locations</span>
                      </AccordionTrigger>
                      <AccordionContent className="pt-1 pb-3">
                        <div className="space-y-2">
                          {locations.map((location) => (
                            <div
                              key={location.id}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={`location-${location.id}`}
                                checked={selectedLocations.includes(
                                  location.id
                                )}
                                onCheckedChange={() =>
                                  handleLocationToggle(location.id)
                                }
                              />
                              <label
                                htmlFor={`location-${location.id}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {location.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  {/* Date filter */}
                  <Accordion type="single" collapsible defaultValue="dates">
                    <AccordionItem value="dates" className="border-none">
                      <AccordionTrigger className="py-2 hover:no-underline">
                        <span className="text-sm font-medium">Date</span>
                      </AccordionTrigger>
                      <AccordionContent className="pt-1 pb-3">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="date-all"
                              checked={filters.date === "all"}
                              onCheckedChange={() =>
                                handleDateFilterChange("all")
                              }
                            />
                            <label
                              htmlFor="date-all"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              All Dates
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="date-today"
                              checked={filters.date === "today"}
                              onCheckedChange={() =>
                                handleDateFilterChange("today")
                              }
                            />
                            <label
                              htmlFor="date-today"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Today
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="date-tomorrow"
                              checked={filters.date === "tomorrow"}
                              onCheckedChange={() =>
                                handleDateFilterChange("tomorrow")
                              }
                            />
                            <label
                              htmlFor="date-tomorrow"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Tomorrow
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="date-week"
                              checked={filters.date === "this-week"}
                              onCheckedChange={() =>
                                handleDateFilterChange("this-week")
                              }
                            />
                            <label
                              htmlFor="date-week"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              This Week
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="date-month"
                              checked={filters.date === "this-month"}
                              onCheckedChange={() =>
                                handleDateFilterChange("this-month")
                              }
                            />
                            <label
                              htmlFor="date-month"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              This Month
                            </label>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </div>

            {/* Main content - Events */}
            <div className="md:w-3/4">
              {/* Results count */}
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  {filteredEvents.length}{" "}
                  {filteredEvents.length === 1 ? "Event" : "Events"} Found
                </h2>

                <Select value="newest" onValueChange={() => {}}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="a-z">A-Z</SelectItem>
                    <SelectItem value="z-a">Z-A</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Grid view */}
              {(viewParam === "grid" || !viewParam) && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEvents.length > 0 ? (
                    <EventList events={filteredEvents} />
                  ) : (
                    <div className="col-span-3 py-12 text-center">
                      <div className="bg-white p-8 rounded-lg shadow-sm">
                        <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-xl font-medium mb-2">
                          No Events Found
                        </h3>
                        <p className="text-gray-500 mb-6">
                          No events match your current search and filter
                          criteria.
                        </p>
                        <Button onClick={resetAllFilters}>
                          Reset All Filters
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* List view */}
              {viewParam === "list" && (
                <div className="space-y-10">
                  {eventsByDate.length > 0 ? (
                    eventsByDate.map((group) => (
                      <div key={group.date}>
                        <h3 className="text-lg font-semibold mb-4 sticky top-28 bg-gray-50 py-2 z-10">
                          {group.formattedDate}
                          {isToday(new Date(group.date)) && (
                            <Badge className="ml-2 bg-varsity-blue">
                              Today
                            </Badge>
                          )}
                          {isTomorrow(new Date(group.date)) && (
                            <Badge className="ml-2 bg-varsity-gold text-black">
                              Tomorrow
                            </Badge>
                          )}
                        </h3>
                        <div className="space-y-3">
                          {group.events.map((event) => (
                            <Card
                              key={event.id}
                              className="overflow-hidden hover:shadow-md transition-all border-0 shadow-sm"
                            >
                              <CardContent className="p-0">
                                <div className="flex flex-col md:flex-row">
                                  <div className="md:w-1/4 lg:w-1/5 aspect-video md:aspect-auto relative">
                                    <img
                                      src={event.imageUrl}
                                      alt={event.title}
                                      className="w-full h-full object-cover"
                                    />
                                    <Badge className="absolute top-2 left-2 bg-varsity-gold text-black">
                                      {event.category.name}
                                    </Badge>
                                  </div>
                                  <div className="p-4 md:p-5 w-full md:w-3/4 lg:w-4/5 flex flex-col">
                                    <div className="mb-3">
                                      <h4 className="text-lg font-bold mb-1">
                                        <Link
                                          to={`/events/${event.id}`}
                                          className="hover:text-varsity-blue"
                                        >
                                          {event.title}
                                        </Link>
                                      </h4>
                                      <p className="text-sm text-gray-600 line-clamp-2">
                                        {event.description}
                                      </p>
                                    </div>
                                    <div className="mt-auto">
                                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                                        <div className="flex items-center text-gray-600">
                                          <CalendarDays className="h-4 w-4 mr-2 text-gray-400" />
                                          <span>
                                            {format(
                                              new Date(event.startDateTime),
                                              "MMM d, yyyy"
                                            )}
                                          </span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                          <Clock className="h-4 w-4 mr-2 text-gray-400" />
                                          <span>
                                            {format(
                                              new Date(event.startDateTime),
                                              "h:mm a"
                                            )}
                                          </span>
                                        </div>
                                        <div className="flex items-center text-gray-600 col-span-2 md:col-span-1">
                                          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                                          <span className="truncate">
                                            {event.location.name}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-12 text-center">
                      <div className="bg-white p-8 rounded-lg shadow-sm">
                        <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-xl font-medium mb-2">
                          No Events Found
                        </h3>
                        <p className="text-gray-500 mb-6">
                          No events match your current search and filter
                          criteria.
                        </p>
                        <Button onClick={resetAllFilters}>
                          Reset All Filters
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Events;
