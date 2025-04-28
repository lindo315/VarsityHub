import React from "react";
import { Link } from "react-router-dom";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { format } from "date-fns";
import { Event } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const startDate = new Date(event.startDateTime);
  const endDate = new Date(event.endDateTime);

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <Badge className="absolute top-3 left-3 bg-varsity-gold text-black">
          {event.category.name}
        </Badge>
      </div>

      <CardContent className="p-4">
        <h3 className="font-bold text-xl mb-2 line-clamp-1">
          <Link to={`/events/${event.id}`} className="hover:text-varsity-blue">
            {event.title}
          </Link>
        </h3>

        <div className="flex items-center text-gray-500 text-sm mb-2">
          <CalendarDays className="h-4 w-4 mr-2" />
          <span>{format(startDate, "EEE, MMM d, yyyy")}</span>
        </div>

        <div className="flex items-center text-gray-500 text-sm mb-2">
          <Clock className="h-4 w-4 mr-2" />
          <span>
            {format(startDate, "h:mm a")} - {format(endDate, "h:mm a")}
          </span>
        </div>

        <div className="flex items-center text-gray-500 text-sm">
          <MapPin className="h-4 w-4 mr-2" />
          <span className="line-clamp-1">{event.location.name}</span>
        </div>

        <p className="text-gray-600 mt-3 line-clamp-2">{event.description}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-end">
        <Link to={`/events/${event.id}`}>
          <Button className="text-sm bg-varsity-blue hover:bg-varsity-blue/90">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
