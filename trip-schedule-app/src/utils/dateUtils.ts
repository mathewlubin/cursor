import { format, parseISO, isWithinInterval } from 'date-fns';
import { Trip, Holiday, TripConflict } from '../types';

export const formatDate = (dateString: string): string => {
  return format(parseISO(dateString), 'MMM dd, yyyy');
};

export const formatDateRange = (startDate: string, endDate: string): string => {
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};

export const findTripConflicts = (trips: Trip[], holidays: Holiday[]): TripConflict[] => {
  const conflicts: TripConflict[] = [];

  trips.forEach(trip => {
    const tripStart = parseISO(trip.startDate);
    const tripEnd = parseISO(trip.endDate);
    
    const conflictingHolidays = holidays.filter(holiday => {
      const holidayDate = parseISO(holiday.date);
      return isWithinInterval(holidayDate, { start: tripStart, end: tripEnd });
    });

    if (conflictingHolidays.length > 0) {
      conflicts.push({
        trip,
        conflictingHolidays
      });
    }
  });

  return conflicts;
};

export const getYearsFromTrips = (trips: Trip[]): number[] => {
  const years = new Set<number>();
  
  trips.forEach(trip => {
    years.add(parseISO(trip.startDate).getFullYear());
    years.add(parseISO(trip.endDate).getFullYear());
  });

  if (years.size === 0) {
    years.add(new Date().getFullYear());
  }

  return Array.from(years).sort();
};