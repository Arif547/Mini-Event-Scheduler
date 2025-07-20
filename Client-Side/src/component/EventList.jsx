import React, { useEffect, useState } from 'react';
import { BiCalendar } from 'react-icons/bi';
import EventData from './EventData';

const EventList = ({ refreshTrigger }) => {
    const [eventData, setEventData] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    const fetchEvents = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/event`);
            if (!response.ok) {
                throw new Error('Failed to fetch events');
            }
            // console.log(response)
            const data = await response.json();
            setEventData(data);
        } catch (error) {
            setError('Failed to load events. Please make sure the backend server is running.');
            console.error('Error fetching events:', error);
            console.log(error)
        } finally {
            setLoading(false);
        }
    };

    const deleteEvent = async (id) => {
        setLoading(true);
        setError(null);
        console.log(id)

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/event/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete event');
            }

            setEventData(prev => prev.filter(event => event.id !== id));
        } catch (error) {
            setError('Failed to delete event. Please try again.');
            console.error('Error deleting event:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, [refreshTrigger]);


    // console.log(eventData.length)

    return (
        <div className='bg-white rounded-lg shadow-sm p-8 text-center mt-5'>
            {/* Error Message */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-6">
                    <div className="flex items-center gap-2">
                        <FiAlertCircle size={20} className="text-red-600" />
                        <p className="text-red-800">{error}</p>
                    </div>
                </div>
            )}

            {eventData.length > 0 ? (

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {eventData.map((event) => (
                        <EventData key={event.id} event={event} onDelete={deleteEvent} loading={loading}></EventData>
                    ))}
                </div>
            ) : (
                !loading && <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                    <BiCalendar size={48} className="text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No events found
                    </h3>
                    <p className="text-gray-600">
                        Create your first event to get started!
                    </p>
                </div>
            )}
        </div>
    );
};

export default EventList;