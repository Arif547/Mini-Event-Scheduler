import React from 'react';
import { FaPlus } from "react-icons/fa";

const Event = () => {
    return (
        <div className='bg-white rounded-lg shadow-sm p-6 mask-b-to-blue-50'>
            <div className='flex flex-col sm:flex-row justify-between gap-4'>
                <div>
                    <h2 className='text-2xl font-bold'>Event Scheduler</h2>
                    <p className='text-gray-600 mt-1'>Manage your events with AI-powered categorization
                    </p>
                </div>
                <div>
                    <button className='flex px-4 py-2 rounded-lg bg-blue-600 text-white  items-center gap-2 hover:bg-blue-800 cursor-pointer'>
                        <FaPlus />
                        Add Event
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Event;