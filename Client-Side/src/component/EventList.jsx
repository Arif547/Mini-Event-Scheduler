import React, { useEffect, useState } from 'react';
import { BiCalendar } from 'react-icons/bi';
import EventData from './EventData';
import { FiAlertCircle } from 'react-icons/fi';


const EventList = ({ refreshTrigger }) => {
    const [eventData, setEventData] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [filteredEvents, setFilteredEvents] = useState([]);


    const fetchEvents = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/events`);
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

    const archiveEvent = async (id, shouldArchive = true) => {

        setError(null);
        console.log(id);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/event/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ archived: shouldArchive }),
            });

            if (!response.ok) {
                throw new Error('Failed to archive event');

            }
            const updatedEvent = await response.json();
            setEventData(prev => prev.map(event => event.id === id ? updatedEvent : event));
        } catch (error) {
            setError('Failed to archive event. Please try again.');
            console.error('Error archiving event:', error);
        }
    }

    // Client-side filtering function
    const applyFilters = () => {
        let filtered = [...eventData];

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(event =>
                event.category.toLowerCase() === selectedCategory.toLowerCase()
            );
        }
        setFilteredEvents(filtered);
    };

    // Handle category filter change
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    useEffect(() => {
        fetchEvents();
    }, [refreshTrigger]);

    useEffect(() => {
        applyFilters();
    }, [eventData, selectedCategory]);


    // console.log(eventData.length)

    return (
        <div className='bg-white rounded-lg shadow-sm p-5 md:p-8 text-center mt-5'>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-3xl text-left font-semibold mb-6">Filter Events</h3>

                <div className="flex flex-wrap gap-4 items-center">
                    {/* Category Filter */}
                    <div className="md:flex items-center  gap-4 ">
                        <span className="text-[18px] font-medium text-gray-800">Category:</span>
                        <div className="flex flex-wrap  justify-center gap-2 mt-5 md:mt-0">
                            {['all', 'Work', 'Personal', 'Other'].map((category) => (
                                <button
                                    key={category}
                                    onClick={() => handleCategoryChange(category)}
                                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${selectedCategory === category
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                >
                                    {category === 'all' ? 'All' : category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>


            <div>
                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-6 mb-5">
                        <div className="flex items-center gap-2">
                            <FiAlertCircle size={20} className="text-red-600" />
                            <p className="text-red-800">{error}</p>
                        </div>
                    </div>
                )}

                {loading ? (
                    <div className="text-center py-8">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <p className="mt-2 text-gray-600">Loading events...</p>
                    </div>
                ) : filteredEvents.length > 0 ? (
                    <div className="space-y-5">
                        {filteredEvents.map((event) => (
                            <EventData
                                key={event.id}
                                event={event}
                                onDelete={deleteEvent}
                                onArchive={archiveEvent}
                                loading={loading}
                            />
                        ))}
                    </div>
                ) : eventData.length > 0 ? (

                    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                        <BiCalendar size={48} className="text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No {selectedCategory !== 'all' ? selectedCategory.toLowerCase() : ''} events found
                        </h3>
                        <p className="text-gray-600">
                            {selectedCategory !== 'all'
                                ? `Try selecting a different category or create a new ${selectedCategory.toLowerCase()} event.`
                                : 'No events match your current filters.'
                            }
                        </p>
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Show All Events
                        </button>
                    </div>
                ) : (

                    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
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




        </div>
    );
};

export default EventList;