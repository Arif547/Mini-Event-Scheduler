import React from 'react';
import { BiCalendar } from 'react-icons/bi';
import { FaClock } from 'react-icons/fa6';
import { FiFileText } from 'react-icons/fi';

const EventData = ({ event }) => {
    return (


        <div className="flex items-start justify-between">
            <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                    <h3 className={`text-lg font-semibold ${event.archived ? 'text-gray-500 line-through' : 'text-gray-900'
                        }`}>
                        {event.title}
                    </h3>
                    {/* <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getCategoryColor(event.category)}`}>
                        {event.category}
                    </span> */}
                    {event.archived && (
                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full border border-gray-200">
                            Archived
                        </span>
                    )}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-2">
                        <BiCalendar size={16} />
                        {/* <span>{formatDate(event.date)}</span> */}
                        <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaClock size={16} />
                        <span>{event.time}</span>
                    </div>
                </div>

                {event.notes && (
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                        <FiFileText size={16} className="mt-0.5 flex-shrink-0" />
                        <p className="leading-relaxed">{event.notes}</p>
                    </div>
                )}
            </div>


        </div>
    );
};

export default EventData;