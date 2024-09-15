import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import eventService from '../../services/eventService';
import ReactPaginate from 'react-paginate';

interface Event {
    total: number,
    page: number,
    limit: number,
    data: {
        id: string;
        name: string;
        description: string;
        startDate: string;
        endDate: string;
        totalGuests?: number;
    }
}

const EventTable: React.FC = () => {

    const [filterParams, setFilterParams] = useState({
        page: 1
    });
    const { register, watch, reset } = useForm();
    const { data: events, error: isError, isLoading } = useSWR<Event[]>('eventFetcher', () => eventService.getEvents(filterParams), {});

    if (isLoading) {
        return <div className="text-center">Loading events...</div>;
    }

    if (isError) {
        return <div className="text-center text-red-500">Failed to load events.</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className='mb-6 flex justify-end items-center'>
                <a href="/EventForm?ref=eyJkb0FjdGlvbiI6ICJBZGQifQ==" className="bg-green-800 hover:bg-green-900 transition-all duration-700 rounded-md shadow-xs text-white text-base font-semibold px-8 py-2 mb-8">Create</a>
            </div>

            {/* Filters Section */}
            <form className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Event Name</label>
                    <input
                        {...register('name')}
                        type="text"
                        placeholder="Filter by name"
                        className="w-full border p-2 rounded border-gray-300"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Start Date</label>
                    <input
                        {...register('startDate')}
                        type="date"
                        className="w-full border p-2 rounded border-gray-300"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">End Date</label>
                    <input
                        {...register('endDate')}
                        type="date"
                        className="w-full border p-2 rounded border-gray-300"
                    />
                </div>

                {/* Reset Filters Button */}
                <div className="flex items-end">
                    <button
                        type="button"
                        onClick={() => { }}
                        className="bg-blue-500 text-white py-2 px-2 rounded hover:bg-blue-600 w-full"
                    >
                        Search
                    </button>
                </div>
            </form>

            {/* Events Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">ID</th>
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Description</th>
                            <th className="py-2 px-4 border-b">Start Date</th>
                            <th className="py-2 px-4 border-b">End Date</th>
                            <th className="py-2 px-4 border-b">Total Guests</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events && events.data.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center py-4 text-gray-500">
                                    No events found.
                                </td>
                            </tr>
                        ) : (
                            events && events.data.map((event, index) => (
                                <tr key={index}>
                                    <td className="py-2 px-4 border-b text-center">{event.id}</td>
                                    <td className="py-2 px-4 border-b text-center">{event.name}</td>
                                    <td className="py-2 px-4 border-b text-center">{event.description}</td>
                                    <td className="py-2 px-4 border-b text-center">{new Date(event.startDate).toLocaleDateString()}</td>
                                    <td className="py-2 px-4 border-b text-center">{new Date(event.endDate).toLocaleDateString()}</td>
                                    <td className="py-2 px-4 border-b text-center">{event.totalGuests || 'N/A'}</td>
                                    <td className="py-2 px-4 border-b text-center">
                                        <a href={`#`} onClick={() => {
                                            let ref = JSON.stringify({ doAction: "edit", id: event.id });
                                            window.open("/EventForm?ref=" + btoa(ref));
                                        }} className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 mr-2">
                                            Edit
                                        </a>
                                        <a href={"#"} onClick={() => { eventService.deleteEvent(event.id) }} className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">
                                            Delete
                                        </a>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                <div className='mt-10'>
                    <ReactPaginate
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        pageCount={(events && events.total > 0) ? events.total / events.limit : 0}  // Replace with dynamic value
                        onPageChange={(e) => setFilterParams({ ...filterParams, page: e.selected })}
                        containerClassName={'flex justify-center items-center space-x-2'}
                        activeClassName={'bg-blue-500 text-white px-2 py-1 rounded-full'}
                        pageLinkClassName={'px-2 py-1 rounded-lg'}
                    />
                </div>
            </div>
        </div>
    );
};

export default EventTable;
