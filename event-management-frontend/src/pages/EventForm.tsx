import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useSWR from 'swr';
import eventService from '../../services/eventService';
import { useRouter } from 'next/router';

interface EventFormProps {
    onSubmit: (data: any) => void;
}

const EventForm: React.FC<EventFormProps> = ({ }) => {
    const {
        handleSubmit,
        control,
        register,
        formState: { errors },
    } = useForm();

    const router = useRouter()

    let query = {};
    if (router && router.query && router.query.ref) {
        query = JSON.parse(atob(router.query.ref));
    }

    const [isEdit, setIsEdit] = useState((query?.doAction !== "Add" && query?.id != undefined && query?.id > 0) ? true : false);

    const onSubmit = (data) => {
        eventService.createEvent(data);
    }


    const { data: event, error: isError, isLoading } = useSWR<Event[]>(isEdit && 'eventFetcherEdit', () => eventService.getEvents({ id: query.id }), {});

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white shadow-md p-6 rounded-md">
            {/* Event Name */}
            <div>
                <label className="block text-sm font-medium mb-2">Event Name</label>
                <input
                    {...register('name', { required: 'Event name is required' })}
                    type="text"
                    placeholder="Enter event name"
                    className={`w-full border p-2 rounded ${errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name?.message}</p>}
            </div>

            {/* Event Description */}
            <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                    {...register('description', { required: 'Event description is required' })}
                    placeholder="Enter event description"
                    className={`w-full border p-2 rounded ${errors.description ? 'border-red-500' : 'border-gray-300'
                        }`}
                />
                {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description?.message}</p>
                )}
            </div>

            {/* Start Date */}
            <div>
                <label className="block text-sm font-medium mb-2">Start Date</label>
                <Controller
                    control={control}
                    name="startDate"
                    rules={{ required: 'Start date is required' }}
                    render={({ field }) => (
                        <DatePicker
                            selected={field.value}
                            onChange={(date) => field.onChange(date)}
                            dateFormat="yyyy-MM-dd"
                            className={`w-full border p-2 rounded ${errors.startDate ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholderText="Select start date"
                        />
                    )}
                />
                {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>}
            </div>

            {/* End Date */}
            <div>
                <label className="block text-sm font-medium mb-2">End Date</label>
                <Controller
                    control={control}
                    name="endDate"
                    rules={{ required: 'End date is required' }}
                    render={({ field }) => (
                        <DatePicker
                            selected={field.value}
                            onChange={(date) => field.onChange(date)}
                            dateFormat="yyyy-MM-dd"
                            className={`w-full border p-2 rounded ${errors.endDate ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholderText="Select end date"
                        />
                    )}
                />
                {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate.message}</p>}
            </div>

            {/* Total Guests */}
            <div>
                <label className="block text-sm font-medium mb-2">Total Guests (Optional)</label>
                <input
                    {...register('totalGuests', { valueAsNumber: true })}
                    type="number"
                    placeholder="Enter maximum number of guests"
                    className="w-full border p-2 rounded border-gray-300"
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
                Create Event
            </button>
        </form>
    );
};

export default EventForm;
