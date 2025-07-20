import React from 'react';
import { Holiday } from '../types';
import { formatDate } from '../utils/dateUtils';
import { Calendar, Flag } from 'lucide-react';

interface HolidayCardProps {
  holiday: Holiday;
  isConflicting?: boolean;
}

const HolidayCard: React.FC<HolidayCardProps> = ({ holiday, isConflicting = false }) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 border ${
      isConflicting ? 'border-red-200 bg-red-50' : 'border-gray-200'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className={`font-medium ${
            isConflicting ? 'text-red-800' : 'text-gray-800'
          }`}>
            {holiday.name}
          </h4>
          {holiday.localName !== holiday.name && (
            <p className="text-sm text-gray-500 mt-1">
              {holiday.localName}
            </p>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {holiday.global && (
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
              Global
            </span>
          )}
          {isConflicting && (
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
              Conflict
            </span>
          )}
        </div>
      </div>

      <div className="mt-3 space-y-2">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar size={16} className="text-gray-400" />
          <span>{formatDate(holiday.date)}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Flag size={16} className="text-gray-400" />
          <span>{holiday.country} ({holiday.countryCode})</span>
        </div>

        {holiday.types.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {holiday.types.map((type, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
              >
                {type}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HolidayCard;