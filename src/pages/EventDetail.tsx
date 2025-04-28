import React from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { events } from "@/lib/data";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  Share2,
  Calendar,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
            <p className="mb-8">
              The event you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/events">
              <Button>View All Events</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const startDate = new Date(event.startDateTime);
  const endDate = new Date(event.endDateTime);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Event Header */}
        <div className="bg-varsity-blue text-white py-12">
          <div className="container">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div>
                <Badge className="inline-block mb-4 bg-varsity-gold text-black">
                  {event.category.name}
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {event.title}
                </h1>
                <div className="flex flex-wrap gap-4 text-white/80">
                  <div className="flex items-center">
                    <CalendarDays className="h-5 w-5 mr-2" />
                    <span>{format(startDate, "EEEE, MMMM d, yyyy")}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>
                      {format(startDate, "h:mm a")} -{" "}
                      {format(endDate, "h:mm a")}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{event.location.name}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Event Content */}
        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-64 md:h-96 object-cover rounded-lg"
                />
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                  <p className="text-gray-700 whitespace-pre-line">
                    {event.description}
                  </p>
                </div>

                {event.location.accessibilityNotes && (
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Accessibility
                    </h3>
                    <p className="text-gray-700">
                      {event.location.accessibilityNotes}
                    </p>
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-semibold mb-2">Location</h3>
                  <p className="text-gray-700 mb-4">{event.location.name}</p>
                  <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Map will be displayed here</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <Card className="sticky top-20">
                <CardContent className="p-6 space-y-6">
                  <div>
                    <Button className="w-full bg-varsity-gold text-black hover:bg-varsity-gold/90 mb-3">
                      Register for Event
                    </Button>
                    <div className="flex justify-between">
                      <Button variant="outline" className="flex-1 mr-2">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Calendar className="h-4 w-4 mr-2" />
                        Add to Calendar
                      </Button>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="font-semibold mb-2">Date and Time</h3>
                    <div className="text-gray-700">
                      <div className="mb-1">
                        {format(startDate, "EEEE, MMMM d, yyyy")}
                      </div>
                      <div>
                        {format(startDate, "h:mm a")} -{" "}
                        {format(endDate, "h:mm a")}
                      </div>
                    </div>
                  </div>

                  {event.capacity && (
                    <div className="pt-4 border-t">
                      <h3 className="font-semibold mb-2">Capacity</h3>
                      <div className="flex items-center text-gray-700">
                        <Users className="h-4 w-4 mr-2" />
                        <span>{event.capacity} attendees maximum</span>
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t">
                    <h3 className="font-semibold mb-2">Location</h3>
                    <div className="text-gray-700">
                      <div className="font-medium">{event.location.name}</div>
                      {event.location.building && (
                        <div>{event.location.building}</div>
                      )}
                      <div>{event.location.address}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EventDetail;
