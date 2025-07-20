export interface Trip {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface Holiday {
  name: string;
  date: string;
  country: string;
  localName: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: string[] | null;
  launchYear: number | null;
  types: string[];
}

export interface TripConflict {
  trip: Trip;
  conflictingHolidays: Holiday[];
}