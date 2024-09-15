import React from 'react';
import EventList from './EventList';
import useSWR from 'swr';
import eventService from '../../services/eventService';

const EventPage: React.FC = () => {
    const { data: events, error: isError, isLoading } = useSWR<Event[]>('eventFetcher', () => eventService.getEvents(), {});


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Event Management</h1>

            {/* Event Filter */}
            {/* <EventFilter onFilter={handleFilter} /> */}

            {/* Event List */}
            <EventList events={events} />
        </div>
    );
};

export default EventPage;
