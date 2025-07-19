import React, { useState } from 'react';


const AddEventField = () => {
    const [eventData, setEventData] = useState('');
    const [error, setError] = useState(null);

    const generateCustomId = () => {
        const prefix = 'evt';
        const randomStr = Math.random().toString(36).substring(2, 8); // 6-char alphanumeric
        const timestamp = Date.now().toString().slice(-4); // last 4 digits of time
        return `${prefix}-${randomStr}-${timestamp}`;
    };

    const handleEventAdd = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const eventData = Object.fromEntries(formData.entries());
        eventData.id = generateCustomId();

        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(eventData)
            };

            const response = await fetch('http://localhost:3000/event', requestOptions);
            // console.log('Response status:', response.status);
            // console.log('Response ok:', response.ok);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            // console.log('Received data:', data);
            setEventData(data);

        } catch (error) {
            console.error('Error occurred:', error);
            setError(error);
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
                    <input type="submit" className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer" value="Add Event" />

                </form>
            </div>
        </div>
    );
};

export default AddEventField;