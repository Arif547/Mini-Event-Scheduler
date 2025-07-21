import { Calendar, Clock, FileText } from 'lucide-react';
import Swal from 'sweetalert2';

const EventData = ({ event, onDelete, loading, onArchive }) => {
    const getStatusColor = () => {
        if (event.archived) return 'bg-gray-100 text-gray-500 border-gray-200';
        return 'bg-blue-50 text-blue-700 border-blue-200';
    };

    const handleDelete = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await onDelete(event.id);
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
    }

    const handleArchive = async () => {
        await onArchive(event.id, !event.archived);
    }


    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 hover:border-gray-300">
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    {/* Title and Status */}
                    <div className="flex items-start gap-3 mb-3">
                        <h3 className={`text-xl font-bold leading-tight ${event.archived
                            ? 'text-gray-400 line-through'
                            : 'text-gray-900'
                            }`}>
                            {event.title}
                        </h3>

                        <span className={`px-3 py-1 text-xs font-semibold rounded-full border whitespace-nowrap ${getStatusColor()}`}>
                            {event.archived ? 'Archived' : 'Active'}
                        </span>
                    </div>

                    <div className='text-left mb-4'>
                        <h4 className='font-medium'>Category: {event.category}</h4>
                    </div>

                    {/* Date and Time */}
                    <div className="flex flex-wrap items-center gap-6 mb-4">
                        <div className="flex items-center gap-2 text-gray-600">
                            <div className="p-1 bg-blue-50 rounded-md">
                                <Calendar size={16} className="text-blue-600" />
                            </div>
                            <span className="font-medium">{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <div className="p-1 bg-green-50 rounded-md">
                                <Clock size={16} className="text-green-600" />
                            </div>
                            <span className="font-medium">{event.time}</span>
                        </div>
                    </div>

                    {/* Note Section */}
                    {event.note && (
                        <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-400">
                            <div className="flex items-start align-middle gap-3">
                                <div className="p-1 bg-blue-100 rounded-md mt-0.5">
                                    <FileText size={16} className="text-blue-600" />
                                </div>
                                <div>
                                    {/* <h4 className="text-sm font-semibold text-gray-700 mb-1">Notes</h4> */}
                                    <p className="text-sm text-gray-600 leading-relaxed">{event.note}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>


            </div>
            {/* Action Buttons */}
            <div className='flex gap-3 mt-6'>
                <button className='px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors duration-200 shadow-sm cursor-pointer' onClick={handleDelete} disabled={loading}>
                    {loading ? 'Deleting....' : 'Delete'}
                </button>
                <button className='px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors duration-200 border border-gray-300 cursor-pointer' onClick={handleArchive}>
                    {event.archived ? 'Unarchive' : 'Archive'}
                </button>
            </div>

            
        </div >

        
    );
};

export default EventData;