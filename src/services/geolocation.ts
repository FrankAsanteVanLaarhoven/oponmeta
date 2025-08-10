// Geolocation service for detecting user location and currency

export interface UserLocation {
  country: string;
  countryCode: string;
  currency: string;
  currencyCode: string;
  timezone: string;
  ip: string;
}

// Mock geolocation data for development
const MOCK_LOCATIONS: Record<string, UserLocation> = {
  'GB': {
    country: 'United Kingdom',
    countryCode: 'GB',
    currency: 'British Pound',
    currencyCode: 'GBP',
    timezone: 'Europe/London',
    ip: '192.168.1.1',
  },
  'US': {
    country: 'United States',
    countryCode: 'US',
    currency: 'US Dollar',
    currencyCode: 'USD',
    timezone: 'America/New_York',
    ip: '192.168.1.2',
  },
  'NG': {
    country: 'Nigeria',
    countryCode: 'NG',
    currency: 'Nigerian Naira',
    currencyCode: 'NGN',
    timezone: 'Africa/Lagos',
    ip: '192.168.1.3',
  },
  'GH': {
    country: 'Ghana',
    countryCode: 'GH',
    currency: 'Ghanaian Cedi',
    currencyCode: 'GHS',
    timezone: 'Africa/Accra',
    ip: '192.168.1.4',
  },
  'KE': {
    country: 'Kenya',
    countryCode: 'KE',
    currency: 'Kenyan Shilling',
    currencyCode: 'KES',
    timezone: 'Africa/Nairobi',
    ip: '192.168.1.5',
  },
  'ZA': {
    country: 'South Africa',
    countryCode: 'ZA',
    currency: 'South African Rand',
    currencyCode: 'ZAR',
    timezone: 'Africa/Johannesburg',
    ip: '192.168.1.6',
  },
  'IN': {
    country: 'India',
    countryCode: 'IN',
    currency: 'Indian Rupee',
    currencyCode: 'INR',
    timezone: 'Asia/Kolkata',
    ip: '192.168.1.7',
  },
  'BR': {
    country: 'Brazil',
    countryCode: 'BR',
    currency: 'Brazilian Real',
    currencyCode: 'BRL',
    timezone: 'America/Sao_Paulo',
    ip: '192.168.1.8',
  },
};

// Get user location from IP address
export const getUserLocation = async (): Promise<UserLocation> => {
  try {
    // In production, use a real IP geolocation service
    // For now, we'll use a mock service that returns random location
    const response = await fetch('https://api.ipapi.com/api/check?access_key=YOUR_API_KEY');
    
    if (response.ok) {
      const data = await response.json();
      return {
        country: data.country_name,
        countryCode: data.country_code,
        currency: data.currency,
        currencyCode: data.currency_code,
        timezone: data.timezone,
        ip: data.ip,
      };
    }
  } catch (error) {
    console.warn('Failed to get real location, using mock data:', error);
  }

  // Fallback to mock data for development
  const mockCountries = Object.keys(MOCK_LOCATIONS);
  const randomCountry = mockCountries[Math.floor(Math.random() * mockCountries.length)];
  return MOCK_LOCATIONS[randomCountry];
};

// Get user location from browser
export const getBrowserLocation = (): Promise<UserLocation> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          // Reverse geocoding to get country from coordinates
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          
          if (response.ok) {
            const data = await response.json();
            resolve({
              country: data.countryName,
              countryCode: data.countryCode,
              currency: data.currency || 'GBP',
              currencyCode: data.currencyCode || 'GBP',
              timezone: data.timezone || 'Europe/London',
              ip: 'unknown',
            });
          } else {
            throw new Error('Failed to get location data');
          }
        } catch (error) {
          console.warn('Failed to get browser location, using mock data:', error);
          // Fallback to mock data
          const mockCountries = Object.keys(MOCK_LOCATIONS);
          const randomCountry = mockCountries[Math.floor(Math.random() * mockCountries.length)];
          resolve(MOCK_LOCATIONS[randomCountry]);
        }
      },
      (error) => {
        console.warn('Geolocation error, using mock data:', error);
        // Fallback to mock data
        const mockCountries = Object.keys(MOCK_LOCATIONS);
        const randomCountry = mockCountries[Math.floor(Math.random() * mockCountries.length)];
        resolve(MOCK_LOCATIONS[randomCountry]);
      }
    );
  });
};

// Get user location with fallback strategy
export const detectUserLocation = async (): Promise<UserLocation> => {
  // Try IP-based geolocation first
  try {
    const location = await getUserLocation();
    return location;
  } catch (error) {
    console.warn('IP geolocation failed, trying browser geolocation:', error);
  }

  // Fallback to browser geolocation
  try {
    const location = await getBrowserLocation();
    return location;
  } catch (error) {
    console.warn('Browser geolocation failed, using default location:', error);
  }

  // Final fallback to UK
  return MOCK_LOCATIONS['GB'];
};

// Store user location in localStorage
export const storeUserLocation = (location: UserLocation): void => {
  try {
    localStorage.setItem('userLocation', JSON.stringify(location));
  } catch (error) {
    console.warn('Failed to store user location:', error);
  }
};

// Get stored user location
export const getStoredUserLocation = (): UserLocation | null => {
  try {
    const stored = localStorage.getItem('userLocation');
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.warn('Failed to get stored user location:', error);
    return null;
  }
};

// Get or detect user location
export const getUserLocationWithFallback = async (): Promise<UserLocation> => {
  // Try to get stored location first
  const stored = getStoredUserLocation();
  if (stored) {
    return stored;
  }

  // Detect and store new location
  const location = await detectUserLocation();
  storeUserLocation(location);
  return location;
}; 