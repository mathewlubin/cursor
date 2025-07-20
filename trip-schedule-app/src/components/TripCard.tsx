import React from 'react';
import { Trip } from '../types';
import { formatDateRange } from '../utils/dateUtils';
import { MapPin, Calendar, Edit2, Trash2 } from 'lucide-react';

interface TripCardProps {
  trip: Trip;
  onEdit: (trip: Trip) => void;
  onDelete: (tripId: string) => void;
  hasConflicts?: boolean;
  conflictCount?: number;
}

const TripCard: React.FC<TripCardProps> = ({ 
  trip, 
  onEdit, 
  onDelete, 
  hasConflicts = false, 
  conflictCount = 0 
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-4 border-l-4 ${
      hasConflicts ? 'border-l-red-500' : 'border-l-blue-500'
    }`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            {trip.title}
          </h3>
          {hasConflicts && (
            <div className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium inline-block mb-2">
              {conflictCount} Holiday Conflict{conflictCount > 1 ? 's' : ''}
            </div>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(trip)}
            className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
            title="Edit trip"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onDelete(trip.id)}
            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
            title="Delete trip"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <MapPin size={16} className="text-gray-400" />
          <span>{trip.destination}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Calendar size={16} className="text-gray-400" />
          <span>{formatDateRange(trip.startDate, trip.endDate)}</span>
        </div>
        
        {trip.description && (
          <p className="text-gray-500 mt-2 text-sm leading-relaxed">
            {trip.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default TripCard;