import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format, isToday, isTomorrow, addDays } from "date-fns";
import Hero from "@/components/home/Hero";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { events, newsArticles, sportsFixtures, sportsTeams } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Calendar,
  CalendarDays,
  ChevronRight,
  Clock,
  MapPin,
  Newspaper,
  Trophy,
  GraduationCap,
  BookOpen,
  Users,
  Bell,
  Search,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Index = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Get upcoming events (next 7 days)
  const today = new Date();
  const nextWeek = addDays(today, 7);

  const upcomingEvents = events
    .filter(
      (event) =>
        new Date(event.startDateTime) >= today &&
        new Date(event.startDateTime) <= nextWeek
    )
    .sort(
      (a, b) =>
        new Date(a.startDateTime).getTime() -
        new Date(b.startDateTime).getTime()
    )
    .slice(0, 6);

  // Get today's events
  const todaysEvents = upcomingEvents.filter((event) =>
    isToday(new Date(event.startDateTime))
  );

  // Get tomorrow's events
  const tomorrowsEvents = upcomingEvents.filter((event) =>
    isTomorrow(new Date(event.startDateTime))
  );

  // Get featured events
  const featuredEvents = events.filter((event) => event.isFeatured).slice(0, 3);

  // Get latest news
  const latestNews = [...newsArticles].sort(
    (a, b) =>
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );

  // Get upcoming sports matches
  const upcomingSports = sportsFixtures
    .filter((fixture) => new Date(fixture.fixtureDate) >= today)
    .sort(
      (a, b) =>
        new Date(a.fixtureDate).getTime() - new Date(b.fixtureDate).getTime()
    )
    .slice(0, 4);

  // Format date as: "April 29, 2025 • Tuesday"
  const formattedDate = format(currentDateTime, "MMMM d, yyyy • EEEE");
  // Format time as: "14:30"
  const formattedTime = format(currentDateTime, "HH:mm");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <Hero />

        {/* Date-Time & Quick Actions Bar */}
        <section className="bg-white border-b shadow-sm py-3">
          <div className="container">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-varsity-blue" />
                  <span className="text-sm font-medium">{formattedDate}</span>
                </div>
                <div className="hidden md:flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-varsity-blue" />
                  <span className="text-sm font-medium">{formattedTime}</span>
                </div>
              </div>
              <div className="flex space-x-4">
                <Link to="/events">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Calendar className="h-4 w-4" />
                    <span className="hidden sm:inline">Events</span>
                  </Button>
                </Link>
                <Link to="/news">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Newspaper className="h-4 w-4" />
                    <span className="hidden sm:inline">News</span>
                  </Button>
                </Link>
                <Link to="/sports">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Trophy className="h-4 w-4" />
                    <span className="hidden sm:inline">Sports</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Section with Tabs */}
        <section className="py-12 bg-white">
          <div className="container">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left Column - Featured Content */}
              <div className="md:w-2/3">
                <Tabs defaultValue="featured" className="w-full">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Campus Highlights</h2>
                    <TabsList>
                      <TabsTrigger value="featured">Featured</TabsTrigger>
                      <TabsTrigger value="today">Today</TabsTrigger>
                      <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="featured" className="mt-0">
                    <Carousel className="w-full">
                      <CarouselContent>
                        {featuredEvents.map((event) => (
                          <CarouselItem
                            key={event.id}
                            className="md:basis-1/2 lg:basis-1/2"
                          >
                            <Link to={`/events/${event.id}`}>
                              <Card className="overflow-hidden h-full hover:shadow-md transition-all border-0 shadow-sm">
                                <div className="aspect-video bg-gray-100 relative">
                                  <img
                                    src={event.imageUrl}
                                    alt={event.title}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/70 to-transparent" />
                                  <div className="absolute bottom-0 left-0 w-full p-4 text-white">
                                    <Badge className="mb-2 bg-varsity-gold text-black">
                                      {event.category.name}
                                    </Badge>
                                    <h3 className="font-bold text-xl mb-1 line-clamp-1">
                                      {event.title}
                                    </h3>
                                    <div className="flex items-center text-white/90 text-sm">
                                      <CalendarDays className="h-4 w-4 mr-1" />
                                      {format(
                                        new Date(event.startDateTime),
                                        "EEE, MMM d • h:mm a"
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </Card>
                            </Link>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="left-2" />
                      <CarouselNext className="right-2" />
                    </Carousel>

                    <div className="mt-6">
                      <Link
                        to="/events"
                        className="inline-flex items-center text-varsity-blue hover:underline"
                      >
                        View all featured events
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </TabsContent>

                  <TabsContent value="today" className="mt-0">
                    {todaysEvents.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {todaysEvents.map((event) => (
                          <Link key={event.id} to={`/events/${event.id}`}>
                            <Card className="overflow-hidden hover:shadow-md transition-all h-full border-0 shadow-sm">
                              <CardContent className="p-0">
                                <div className="flex flex-col h-full">
                                  <div className="h-36 bg-gray-100 relative">
                                    <img
                                      src={event.imageUrl}
                                      alt={event.title}
                                      className="w-full h-full object-cover"
                                    />
                                    <Badge className="absolute top-2 left-2 bg-varsity-gold text-black">
                                      {event.category.name}
                                    </Badge>
                                  </div>
                                  <div className="p-4 flex-1 flex flex-col">
                                    <h3 className="font-bold text-lg mb-2 line-clamp-1">
                                      {event.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-1">
                                      {event.description}
                                    </p>
                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                      <div className="flex items-center">
                                        <Clock className="h-4 w-4 mr-1" />
                                        {format(
                                          new Date(event.startDateTime),
                                          "h:mm a"
                                        )}
                                      </div>
                                      <div className="flex items-center">
                                        <MapPin className="h-4 w-4 mr-1" />
                                        {event.location.name}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-xl font-medium mb-2">
                          No Events Today
                        </h3>
                        <p className="text-gray-500 mb-4">
                          There are no events scheduled for today.
                        </p>
                        <Link to="/events">
                          <Button>Browse All Events</Button>
                        </Link>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="tomorrow" className="mt-0">
                    {tomorrowsEvents.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {tomorrowsEvents.map((event) => (
                          <Link key={event.id} to={`/events/${event.id}`}>
                            <Card className="overflow-hidden hover:shadow-md transition-all h-full border-0 shadow-sm">
                              <CardContent className="p-0">
                                <div className="flex flex-col h-full">
                                  <div className="h-36 bg-gray-100 relative">
                                    <img
                                      src={event.imageUrl}
                                      alt={event.title}
                                      className="w-full h-full object-cover"
                                    />
                                    <Badge className="absolute top-2 left-2 bg-varsity-gold text-black">
                                      {event.category.name}
                                    </Badge>
                                  </div>
                                  <div className="p-4 flex-1 flex flex-col">
                                    <h3 className="font-bold text-lg mb-2 line-clamp-1">
                                      {event.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-1">
                                      {event.description}
                                    </p>
                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                      <div className="flex items-center">
                                        <Clock className="h-4 w-4 mr-1" />
                                        {format(
                                          new Date(event.startDateTime),
                                          "h:mm a"
                                        )}
                                      </div>
                                      <div className="flex items-center">
                                        <MapPin className="h-4 w-4 mr-1" />
                                        {event.location.name}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-xl font-medium mb-2">
                          No Events Tomorrow
                        </h3>
                        <p className="text-gray-500 mb-4">
                          There are no events scheduled for tomorrow.
                        </p>
                        <Link to="/events">
                          <Button>Browse All Events</Button>
                        </Link>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>

              {/* Right Column - News & Announcements */}
              <div className="md:w-1/3 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold flex items-center">
                    <Newspaper className="h-5 w-5 mr-2 text-varsity-blue" />
                    Latest News
                  </h2>
                  <Link to="/news">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-varsity-blue"
                    >
                      View All
                    </Button>
                  </Link>
                </div>

                <div className="space-y-4 flex-1">
                  <Link to={`/news/${latestNews[0].id}`}>
                    <Card className="overflow-hidden hover:shadow-md transition-all border-0 shadow-sm">
                      <div className="h-48 bg-gray-100 relative">
                        <img
                          src={latestNews[0].imageUrl}
                          alt={latestNews[0].title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-0 left-0 w-full p-4 text-white">
                          <Badge className="mb-2">
                            {latestNews[0].category}
                          </Badge>
                          <h3 className="font-bold text-lg mb-1">
                            {latestNews[0].title}
                          </h3>
                          <div className="flex items-center text-white/90 text-xs">
                            <CalendarDays className="h-3 w-3 mr-1" />
                            {format(
                              new Date(latestNews[0].publishDate),
                              "MMMM d, yyyy"
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>

                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    {latestNews.slice(1, 4).map((article, index) => (
                      <React.Fragment key={article.id}>
                        <Link to={`/news/${article.id}`} className="block">
                          <div className="flex gap-3 py-3 group">
                            <div className="flex-none">
                              <Badge className="bg-varsity-blue">
                                {article.category}
                              </Badge>
                            </div>
                            <div>
                              <h3 className="font-medium line-clamp-2 group-hover:text-varsity-blue transition-colors">
                                {article.title}
                              </h3>
                              <div className="text-xs text-gray-500 mt-1">
                                {format(
                                  new Date(article.publishDate),
                                  "MMM d, yyyy"
                                )}
                              </div>
                            </div>
                          </div>
                        </Link>
                        {index < latestNews.slice(1, 4).length - 1 && (
                          <div className="border-t border-gray-100"></div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sports Section */}
        <section className="py-10 bg-gray-50 border-t border-b border-gray-200">
          <div className="container">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center">
                <Trophy className="h-6 w-6 mr-2 text-varsity-blue" />
                Varsity Sports
              </h2>
              <Link to="/sports">
                <Button variant="outline" className="group">
                  View All Teams
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Teams */}
              <div className="lg:col-span-1">
                <h3 className="text-lg font-semibold mb-4">Our Teams</h3>
                <div className="bg-white rounded-lg shadow-sm p-4">
                  {sportsTeams.map((team, index) => (
                    <React.Fragment key={team.id}>
                      <div className="flex items-center py-3">
                        <div className="flex-shrink-0">
                          <Avatar className="h-10 w-10 bg-varsity-blue text-white">
                            <AvatarFallback>{team.sport[0]}</AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="ml-3">
                          <p className="font-medium">{team.name}</p>
                          <p className="text-xs text-gray-500">
                            Coach: {team.coach}
                          </p>
                        </div>
                      </div>
                      {index < sportsTeams.length - 1 && (
                        <div className="border-t border-gray-100"></div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Upcoming fixtures */}
              <div className="lg:col-span-3">
                <h3 className="text-lg font-semibold mb-4">
                  Upcoming Fixtures
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {upcomingSports.map((fixture) => (
                    <Card
                      key={fixture.id}
                      className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-all"
                    >
                      <CardContent className="p-0">
                        <div className="flex">
                          <div
                            className={cn(
                              "w-2 flex-shrink-0",
                              fixture.isHomeGame
                                ? "bg-varsity-gold"
                                : "bg-varsity-blue"
                            )}
                          />
                          <div className="p-4 w-full">
                            <div className="flex justify-between items-start mb-2">
                              <Badge className="bg-varsity-blue">
                                {fixture.team.sport}
                              </Badge>
                              <Badge
                                className={
                                  fixture.isHomeGame
                                    ? "bg-varsity-gold text-black"
                                    : "bg-gray-200 text-gray-700"
                                }
                              >
                                {fixture.isHomeGame ? "Home" : "Away"}
                              </Badge>
                            </div>

                            <h4 className="font-bold mb-3">
                              {fixture.isHomeGame ? (
                                <>
                                  {fixture.team.name}{" "}
                                  <span className="text-gray-500">vs</span>{" "}
                                  {fixture.opponent}
                                </>
                              ) : (
                                <>
                                  {fixture.opponent}{" "}
                                  <span className="text-gray-500">vs</span>{" "}
                                  {fixture.team.name}
                                </>
                              )}
                            </h4>

                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div className="flex items-center text-gray-600">
                                <CalendarDays className="h-4 w-4 mr-1 text-gray-400" />
                                {format(
                                  new Date(fixture.fixtureDate),
                                  "EEE, MMM d"
                                )}
                              </div>
                              <div className="flex items-center text-gray-600">
                                <Clock className="h-4 w-4 mr-1 text-gray-400" />
                                {format(
                                  new Date(fixture.fixtureDate),
                                  "h:mm a"
                                )}
                              </div>
                              <div className="flex items-center text-gray-600 col-span-2">
                                <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                                {fixture.location.name}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Campus Stats & Resources */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-2">
                VarsityHub at a Glance
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Your central hub for all campus events, sports, news, and
                resources to enhance your university experience
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-gray-50 p-6 rounded-lg text-center border border-gray-100 hover:border-varsity-blue/30 hover:shadow-md transition-all">
                <div className="inline-flex items-center justify-center bg-varsity-blue/10 w-16 h-16 rounded-full mb-4">
                  <GraduationCap className="h-8 w-8 text-varsity-blue" />
                </div>
                <div className="text-3xl font-bold text-varsity-blue mb-1">
                  35,000+
                </div>
                <div className="text-sm text-gray-600">Students</div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg text-center border border-gray-100 hover:border-varsity-blue/30 hover:shadow-md transition-all">
                <div className="inline-flex items-center justify-center bg-varsity-blue/10 w-16 h-16 rounded-full mb-4">
                  <BookOpen className="h-8 w-8 text-varsity-blue" />
                </div>
                <div className="text-3xl font-bold text-varsity-blue mb-1">
                  12
                </div>
                <div className="text-sm text-gray-600">Colleges</div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg text-center border border-gray-100 hover:border-varsity-blue/30 hover:shadow-md transition-all">
                <div className="inline-flex items-center justify-center bg-varsity-blue/10 w-16 h-16 rounded-full mb-4">
                  <Users className="h-8 w-8 text-varsity-blue" />
                </div>
                <div className="text-3xl font-bold text-varsity-blue mb-1">
                  250+
                </div>
                <div className="text-sm text-gray-600">
                  Student Organizations
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg text-center border border-gray-100 hover:border-varsity-blue/30 hover:shadow-md transition-all">
                <div className="inline-flex items-center justify-center bg-varsity-blue/10 w-16 h-16 rounded-full mb-4">
                  <Trophy className="h-8 w-8 text-varsity-blue" />
                </div>
                <div className="text-3xl font-bold text-varsity-blue mb-1">
                  Top 50
                </div>
                <div className="text-sm text-gray-600">Global Ranking</div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3 bg-varsity-blue text-white rounded-lg overflow-hidden shadow-md">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">Get Connected</h3>
                  <p className="mb-4 text-white/90">
                    Create your account to personalize your campus experience
                    and stay updated with events that matter to you.
                  </p>
                  <div className="space-y-2">
                    <Link to="/auth">
                      <Button className="w-full bg-varsity-gold text-black hover:bg-varsity-gold/90">
                        Sign Up Now
                      </Button>
                    </Link>
                    <Link to="/auth">
                      <Button
                        variant="outline"
                        className="w-full border-white/30 text-white hover:bg-white/10"
                      >
                        Sign In
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="md:w-2/3">
                <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <Link to="/events">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:border-varsity-blue/30 hover:shadow-sm transition-all">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-varsity-blue" />
                        <span className="font-medium">Events Calendar</span>
                      </div>
                    </div>
                  </Link>

                  <Link to="/news">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:border-varsity-blue/30 hover:shadow-sm transition-all">
                      <div className="flex items-center">
                        <Newspaper className="h-5 w-5 mr-2 text-varsity-blue" />
                        <span className="font-medium">Campus News</span>
                      </div>
                    </div>
                  </Link>

                  <Link to="/sports">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:border-varsity-blue/30 hover:shadow-sm transition-all">
                      <div className="flex items-center">
                        <Trophy className="h-5 w-5 mr-2 text-varsity-blue" />
                        <span className="font-medium">Sports Schedules</span>
                      </div>
                    </div>
                  </Link>

                  <a href="#">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:border-varsity-blue/30 hover:shadow-sm transition-all">
                      <div className="flex items-center">
                        <GraduationCap className="h-5 w-5 mr-2 text-varsity-blue" />
                        <span className="font-medium">Academic Calendar</span>
                      </div>
                    </div>
                  </a>

                  <a href="#">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:border-varsity-blue/30 hover:shadow-sm transition-all">
                      <div className="flex items-center">
                        <Bell className="h-5 w-5 mr-2 text-varsity-blue" />
                        <span className="font-medium">Announcements</span>
                      </div>
                    </div>
                  </a>

                  <a href="#">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:border-varsity-blue/30 hover:shadow-sm transition-all">
                      <div className="flex items-center">
                        <Search className="h-5 w-5 mr-2 text-varsity-blue" />
                        <span className="font-medium">Campus Directory</span>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-gradient-to-r from-varsity-blue to-blue-800 text-white py-16">
          <div className="container">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-2/3 mb-6 md:mb-0">
                <h2 className="text-3xl font-bold mb-4">
                  Stay Connected with Campus Life
                </h2>
                <p className="text-white/90 text-lg max-w-xl">
                  Never miss an important event or announcement. Download the
                  VarsityHub mobile app and stay connected wherever you go.
                </p>
              </div>
              <div className="md:w-1/3 flex justify-center md:justify-end">
                <Button
                  size="lg"
                  className="bg-varsity-gold text-black hover:bg-varsity-gold/90 px-8"
                >
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Get the App
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
