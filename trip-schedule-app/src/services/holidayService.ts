import axios from 'axios';
import { Holiday } from '../types';

const API_BASE_URL = 'https://date.nager.at/api/v3';

export const holidayService = {
  async getHolidays(year: number, countryCode: string = 'US'): Promise<Holiday[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/PublicHolidays/${year}/${countryCode}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching holidays:', error);
      return [];
    }
  },

  async getAvailableCountries(): Promise<{ countryCode: string; name: string }[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/AvailableCountries`);
      return response.data;
    } catch (error) {
      console.error('Error fetching countries:', error);
      return [{ countryCode: 'US', name: 'United States' }];
    }
  }
};