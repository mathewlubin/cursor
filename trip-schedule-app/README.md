# Trip Schedule vs Public Holidays App

A modern React TypeScript application that helps you compare your travel schedule with public holidays in different countries.

## Features

- **Trip Management**: Add, edit, and delete your travel plans
- **Public Holiday API Integration**: Fetches real-time public holiday data from multiple countries
- **Conflict Detection**: Automatically identifies when your trips overlap with public holidays
- **Multi-Country Support**: Compare holidays from different countries
- **Year Selection**: View holidays for different years
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Local Storage**: Your trips are saved locally in your browser

## Technology Stack

- **React 18** with TypeScript
- **Custom CSS** (Tailwind-inspired utility classes)
- **Date-fns** for date manipulation
- **Axios** for API calls
- **Lucide React** for icons
- **Public Holiday API** (date.nager.at)

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## Usage

### Adding Trips
1. Click the "Add Trip" button in the header
2. Fill in your trip details:
   - Trip title
   - Destination
   - Start and end dates
   - Optional description
3. Save your trip

### Viewing Conflicts
1. Navigate to the "Conflict Analysis" tab
2. Select your country and year using the dropdown menus
3. The app will automatically show any conflicts between your trips and public holidays

### Managing Countries and Years
- Use the country selector in the header to change which country's holidays to display
- Use the year selector to view holidays for different years
- The app automatically includes years based on your trip dates

## API Integration

This app uses the [Public Holidays API](https://date.nager.at/Api) to fetch holiday data:
- **Endpoint**: `https://date.nager.at/api/v3/PublicHolidays/{year}/{countryCode}`
- **Countries**: `https://date.nager.at/api/v3/AvailableCountries`
- **Free to use**: No API key required

## Project Structure

```
src/
├── components/          # React components
│   ├── TripForm.tsx    # Trip creation/editing form
│   ├── TripCard.tsx    # Individual trip display
│   ├── HolidayCard.tsx # Individual holiday display
│   └── ConflictAnalysis.tsx # Conflict detection view
├── services/           # API and data services
│   ├── tripService.ts  # Local storage trip management
│   └── holidayService.ts # Public holiday API integration
├── utils/              # Utility functions
│   └── dateUtils.ts    # Date formatting and conflict detection
├── types.ts            # TypeScript type definitions
├── App.tsx             # Main application component
└── App.css             # Custom CSS styles
```

## Sample Data

The app includes sample trips to help you get started:
- Summer Vacation to Hawaii (July 4-10)
- Christmas Holiday to New York (Dec 23-27)
- Memorial Day Weekend to Chicago (May 25-28)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- [Date.nager.at](https://date.nager.at) for providing the public holidays API
- [Lucide](https://lucide.dev) for the beautiful icons
- [Date-fns](https://date-fns.org) for date utilities
