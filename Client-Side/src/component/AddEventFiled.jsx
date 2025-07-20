import React, { useState } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';


const AddEventField = ({ setShowForm, onEventCreated }) => {
    const [eventData, setEventData] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const id = uuidv4();

    const handleEventAdd = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const eventData = Object.fromEntries(formData.entries());
        eventData.archived = false;
        eventData.id = id;
        eventData.createdAt = new Date().toISOString();

        setLoading(true);
        setError(null);
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(eventData)
            };

            const response = await fetch(`${import.meta.env.VITE_API_URL}/event`, requestOptions);
            // console.log('Response status:', response.status);
            onEventCreated();
            // console.log('Response ok:', response.ok);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            // console.log('Received data:', data);
            setEventData(data);
            Swal.fire({
                title: "Successfully Create Event",
                icon: "success",
            });

        } catch (error) {
            setError('Failed to create event. Please try again.');
            console.error('Error occurred:', error);

        } finally {

            setLoading(false)
        }
    }

    return (
        <div className='bg-white rounded-lg shadow-sm p-6 mb-6'>
            <h2 className='text-lg font-semibold text-gray-900 mb-4'>Add New Event</h2>
            <div>
                <form className="space-y-5" onSubmit={handleEventAdd}>
                    {/* Event Title */}
                    <div>
                        <label htmlFor='title' className='block text-sm font-medium text-gray-700 mb-1'>Title *</label>
                        <input type="text" placeholder='Enter Event Title' className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent' name='title' required />
                    </div>
                    {/* Event Date */}
                    <div>
                        <label htmlFor='date' className='block text-sm font-medium text-gray-700 mb-1'>Date *</label>
                        <input type="date" placeholder='Enter Event Date' className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent' name='date' required />
                    </div>
                    {/* Event Time */}
                    <div>
                        <label htmlFor='time' className='block text-sm font-medium text-gray-700 mb-1'>Time *</label>
                        <input type="time" placeholder='Enter Event Title' className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent' name='time' required />
                    </div>
                    {/* Event Note */}
                    <div>
                        <label htmlFor='note' rows="3" className='block text-sm font-medium text-gray-700 mb-1'>Notes (Optional)</label>
                        <textarea type="text" placeholder='Add any additional notes...' className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent' name='note' />
                    </div>
                    {/* Event Category */}
                    {/* <div>
                        <label htmlFor='note' className='block text-sm font-medium text-gray-700 mb-1'>Category (Auto-populated by AI)</label>
                        <textarea type="text" rows="3" placeholder='Add any additional notes...' className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent' name='category' />
                    </div> */}

                    <div className='flex flex-col-1 gap-4'>
                        <input type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer" value={loading ? 'Creating...' : 'Create Event'} />
                        <div>
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
                            >
                                Cancel
                            </button>
                        </div>

                    </div>


                </form>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-6">
                        <div className="flex items-center gap-2">
                            <FiAlertCircle size={20} className="text-red-600" />
                            <p className="text-red-800">{error}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddEventField;