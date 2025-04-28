
import React from 'react';
import EventCard from './EventCard';
import { Event } from '@/lib/data';

interface EventListProps {
  events: Event[];
}

const EventList = ({ events }: EventListProps) => {
  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No events found.</p>
        <p className="text-gray-400">Try adjusting your filters or search criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventList;
