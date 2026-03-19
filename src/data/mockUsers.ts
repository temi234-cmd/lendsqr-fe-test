import type { User } from '../types';

/**
 * Mock Users API Data
 * 
 * The mock API is hosted on mocky.io as per assessment requirements.
 * Update MOCK_API_URL below with your mocky.io endpoint.
 * 
 * Steps to create mocky.io endpoint:
 * 1. Go to https://mocky.io
 * 2. Click "Create"
 * 3. Paste the contents of public/mock-users.json
 * 4. Copy the generated URL and paste it below
 */

// UPDATE THIS WITH YOUR MOCKY.IO URL
const MOCK_API_URL = 'https://run.mocky.io/v3/YOUR-ENDPOINT-ID';

// Fallback to local JSON in case API is not set up
import mockUsersData from '../../public/mock-users.json';

let cachedUsers: User[] | null = null;

async function fetchMockUsers(): Promise<User[]> {
  // Return cached data if available
  if (cachedUsers) {
    return cachedUsers;
  }

  try {
    // Try to fetch from mocky.io API
    if (!MOCK_API_URL.includes('YOUR-ENDPOINT-ID')) {
      const response = await fetch(MOCK_API_URL);
      if (response.ok) {
        const data = await response.json();
        cachedUsers = data as User[];
        return cachedUsers;
      }
    }
  } catch (error) {
    console.warn('Failed to fetch from API, using local data:', error);
  }

  // Fallback to local JSON data
  cachedUsers = (mockUsersData as User[]) || [];
  return cachedUsers;
}

// Initialize with local data synchronously, then update from API asynchronously
export let mockUsers: User[] = (mockUsersData as User[]) || [];

// Fetch from API on app startup
if (typeof window !== 'undefined') {
  fetchMockUsers().then((users) => {
    mockUsers = users;
  });
}

export { fetchMockUsers };