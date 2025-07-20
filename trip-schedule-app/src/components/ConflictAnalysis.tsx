import React from 'react';
import { TripConflict } from '../types';
import { formatDateRange } from '../utils/dateUtils';
import { AlertTriangle, Calendar, MapPin } from 'lucide-react';
import HolidayCard from './HolidayCard';

interface ConflictAnalysisProps {
  conflicts: TripConflict[];
}

const ConflictAnalysis: React.FC<ConflictAnalysisProps> = ({ conflicts }) => {
  if (conflicts.length === 0) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="text-green-600 mb-2">
          <Calendar size={48} className="mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-green-800 mb-2">
          No Conflicts Found!
        </h3>
        <p className="text-green-700">
          Your trips don't overlap with any public holidays in the selected country.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 text-red-800 mb-2">
          <AlertTriangle size={20} />
          <h3 className="font-medium">
            {conflicts.length} Trip{conflicts.length > 1 ? 's' : ''} with Holiday Conflicts
          </h3>
        </div>
        <p className="text-red-700 text-sm">
          The following trips overlap with public holidays. Consider adjusting your travel dates.
        </p>
      </div>

      {conflicts.map((conflict) => (
        <div key={conflict.trip.id} className="bg-white rounded-lg shadow-md p-6 border border-red-200">
          <div className="mb-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              {conflict.trip.title}
            </h4>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <MapPin size={16} />
                <span>{conflict.trip.destination}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar size={16} />
                <span>{formatDateRange(conflict.trip.startDate, conflict.trip.endDate)}</span>
              </div>
            </div>
            {conflict.trip.description && (
              <p className="text-gray-500 text-sm mt-2">{conflict.trip.description}</p>
            )}
          </div>

          <div>
            <h5 className="font-medium text-red-800 mb-3">
              Conflicting Holidays ({conflict.conflictingHolidays.length}):
            </h5>
            <div className="grid gap-3 md:grid-cols-2">
              {conflict.conflictingHolidays.map((holiday, index) => (
                <HolidayCard
                  key={`${holiday.date}-${index}`}
                  holiday={holiday}
                  isConflicting={true}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConflictAnalysis;