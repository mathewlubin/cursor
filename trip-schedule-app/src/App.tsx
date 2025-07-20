import React, { useState, useEffect } from 'react';
import { Trip, Holiday, TripConflict } from './types';
import { tripService } from './services/tripService';
import { holidayService } from './services/holidayService';
import { findTripConflicts, getYearsFromTrips } from './utils/dateUtils';
import TripForm from './components/TripForm';
import TripCard from './components/TripCard';
import HolidayCard from './components/HolidayCard';
import ConflictAnalysis from './components/ConflictAnalysis';
import { 
  Plus, 
  Plane, 
  Calendar, 
  AlertTriangle, 
  RefreshCw, 
  Globe,
  Database 
} from 'lucide-react';
import './App.css';

function App() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [conflicts, setConflicts] = useState<TripConflict[]>([]);
  const [countries, setCountries] = useState<{ countryCode: string; name: string }[]>([]);
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [activeTab, setActiveTab] = useState<'trips' | 'holidays' | 'conflicts'>('trips');
  const [showTripForm, setShowTripForm] = useState(false);
  const [editingTrip, setEditingTrip] = useState<Trip | undefined>();
  const [loading, setLoading] = useState(false);

  // Load trips and countries on component mount
  useEffect(() => {
    loadTrips();
    loadCountries();
  }, []);

  // Load holidays when country or year changes
  useEffect(() => {
    if (selectedCountry && selectedYear) {
      loadHolidays();
    }
  }, [selectedCountry, selectedYear]);

  // Update conflicts when trips or holidays change
  useEffect(() => {
    const newConflicts = findTripConflicts(trips, holidays);
    setConflicts(newConflicts);
  }, [trips, holidays]);

  const loadTrips = () => {
    const savedTrips = tripService.getTrips();
    if (savedTrips.length === 0) {
      // Load sample trips if none exist
      const sampleTrips = tripService.generateSampleTrips();
      sampleTrips.forEach(trip => tripService.saveTrip(trip));
      setTrips(sampleTrips);
    } else {
      setTrips(savedTrips);
    }
  };

  const loadCountries = async () => {
    const availableCountries = await holidayService.getAvailableCountries();
    setCountries(availableCountries);
  };

  const loadHolidays = async () => {
    setLoading(true);
    try {
      const holidaysData = await holidayService.getHolidays(selectedYear, selectedCountry);
      setHolidays(holidaysData);
    } catch (error) {
      console.error('Failed to load holidays:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTrip = (trip: Trip) => {
    tripService.saveTrip(trip);
    setTrips(tripService.getTrips());
    setShowTripForm(false);
    setEditingTrip(undefined);
  };

  const handleDeleteTrip = (tripId: string) => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      tripService.deleteTrip(tripId);
      setTrips(tripService.getTrips());
    }
  };

  const handleEditTrip = (trip: Trip) => {
    setEditingTrip(trip);
    setShowTripForm(true);
  };

  const availableYears = getYearsFromTrips(trips);
  const conflictMap = new Map(conflicts.map(c => [c.trip.id, c.conflictingHolidays.length]));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Plane className="text-blue-600" size={28} />
              <h1 className="text-xl font-bold text-gray-900">
                Trip Schedule vs Public Holidays
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Country Selector */}
              <div className="flex items-center space-x-2">
                <Globe size={16} className="text-gray-400" />
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {countries.map(country => (
                    <option key={country.countryCode} value={country.countryCode}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year Selector */}
              <div className="flex items-center space-x-2">
                <Calendar size={16} className="text-gray-400" />
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {availableYears.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setShowTripForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
              >
                <Plus size={16} />
                <span>Add Trip</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('trips')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'trips'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              My Trips ({trips.length})
            </button>
            <button
              onClick={() => setActiveTab('holidays')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'holidays'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Public Holidays ({holidays.length})
            </button>
            <button
              onClick={() => setActiveTab('conflicts')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === 'conflicts'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <span>Conflict Analysis</span>
              {conflicts.length > 0 && (
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                  {conflicts.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading && (
          <div className="flex justify-center items-center py-8">
            <RefreshCw className="animate-spin text-blue-600" size={24} />
            <span className="ml-2 text-gray-600">Loading holidays...</span>
          </div>
        )}

        {/* Trips Tab */}
        {activeTab === 'trips' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Your Trips</h2>
              {trips.length === 0 && (
                <button
                  onClick={() => {
                    const sampleTrips = tripService.generateSampleTrips();
                    sampleTrips.forEach(trip => tripService.saveTrip(trip));
                    loadTrips();
                  }}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
                >
                  <Database size={16} />
                  <span>Load Sample Trips</span>
                </button>
              )}
            </div>
            
            {trips.length === 0 ? (
              <div className="text-center py-12">
                <Plane className="mx-auto text-gray-400 mb-4" size={48} />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No trips yet</h3>
                <p className="text-gray-500 mb-4">Start planning your travels by adding your first trip.</p>
                <button
                  onClick={() => setShowTripForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Add Your First Trip
                </button>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {trips.map(trip => (
                  <TripCard
                    key={trip.id}
                    trip={trip}
                    onEdit={handleEditTrip}
                    onDelete={handleDeleteTrip}
                    hasConflicts={conflictMap.has(trip.id)}
                    conflictCount={conflictMap.get(trip.id) || 0}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Holidays Tab */}
        {activeTab === 'holidays' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Public Holidays in {countries.find(c => c.countryCode === selectedCountry)?.name} ({selectedYear})
              </h2>
              <button
                onClick={loadHolidays}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
              >
                <RefreshCw size={16} />
                <span>Refresh</span>
              </button>
            </div>
            
            {holidays.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="mx-auto text-gray-400 mb-4" size={48} />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No holidays found</h3>
                <p className="text-gray-500">No public holidays available for the selected country and year.</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {holidays.map((holiday, index) => (
                  <HolidayCard
                    key={`${holiday.date}-${index}`}
                    holiday={holiday}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Conflicts Tab */}
        {activeTab === 'conflicts' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Conflict Analysis</h2>
              {conflicts.length > 0 && (
                <div className="flex items-center space-x-2 text-red-600">
                  <AlertTriangle size={20} />
                  <span className="font-medium">{conflicts.length} conflict{conflicts.length > 1 ? 's' : ''} found</span>
                </div>
              )}
            </div>
            
            <ConflictAnalysis conflicts={conflicts} />
          </div>
        )}
      </main>

      {/* Trip Form Modal */}
      {showTripForm && (
        <TripForm
          trip={editingTrip}
          onSave={handleSaveTrip}
          onCancel={() => {
            setShowTripForm(false);
            setEditingTrip(undefined);
          }}
        />
      )}
    </div>
  );
}

export default App;
