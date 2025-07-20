import { Trip } from '../types';

const TRIPS_STORAGE_KEY = 'trips';

export const tripService = {
  getTrips(): Trip[] {
    const tripsJson = localStorage.getItem(TRIPS_STORAGE_KEY);
    return tripsJson ? JSON.parse(tripsJson) : [];
  },

  saveTrip(trip: Trip): void {
    const trips = this.getTrips();
    const existingIndex = trips.findIndex(t => t.id === trip.id);
    
    if (existingIndex >= 0) {
      trips[existingIndex] = trip;
    } else {
      trips.push(trip);
    }
    
    localStorage.setItem(TRIPS_STORAGE_KEY, JSON.stringify(trips));
  },

  deleteTrip(tripId: string): void {
    const trips = this.getTrips().filter(t => t.id !== tripId);
    localStorage.setItem(TRIPS_STORAGE_KEY, JSON.stringify(trips));
  },

  generateSampleTrips(): Trip[] {
    const currentYear = new Date().getFullYear();
    return [
      {
        id: '1',
        title: 'Summer Vacation',
        destination: 'Hawaii',
        startDate: `${currentYear}-07-04`,
        endDate: `${currentYear}-07-10`,
        description: 'Relaxing beach vacation'
      },
      {
        id: '2',
        title: 'Christmas Holiday',
        destination: 'New York',
        startDate: `${currentYear}-12-23`,
        endDate: `${currentYear}-12-27`,
        description: 'Holiday season in the city'
      },
      {
        id: '3',
        title: 'Memorial Day Weekend',
        destination: 'Chicago',
        startDate: `${currentYear}-05-25`,
        endDate: `${currentYear}-05-28`,
        description: 'Long weekend getaway'
      }
    ];
  }
};