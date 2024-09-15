import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import eventService from '../../services/eventService';
import { Event } from '../../types/Event';

const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    if (id) {
      eventService.getEvent(id).then((response) => {
        setEvent(response.data);
      });
    }
  }, [id]);

  if (!event) {
    return <div className="text-center text-xl mt-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">{event.name}</h1>
      <p className="text-gray-700 mb-4">{event.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <strong>Start Date:</strong> {new Date(event.startDate).toLocaleDateString()}
        </div>
        <div>
          <strong>End Date:</strong> {new Date(event.endDate).toLocaleDateString()}
        </div>
        <div>
          <strong>Total Guests:</strong> {event.totalGuests || 'Unlimited'}
        </div>
        <div>
          <strong>Category:</strong> {event.category}
        </div>
      </div>
      {event.images && event.images.length > 0 && (
        <div>
          <h3 className="text-2xl font-semibold mb-4">Images</h3>
          <div className="flex space-x-4">
            {event.images.map((image, index) => (
              <img
                key={index}
                src={URL.createObjectURL(image)}
                alt={`Event Image ${index}`}
                className="w-48 h-48 object-cover"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetailPage;
