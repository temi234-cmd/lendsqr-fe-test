import type { User } from '../types';

/**
 * Mock Users API
 * 
 * Serves 500 mock users from:
 * - Development: Vite public folder + local fallback
 * - Production: Vercel serverless API at /api/users
 */

// API endpoint - works on both dev and production
const API_URL = '/api/users';

// Fallback to local JSON in case API is not available
import mockUsersData from '../../public/mock-users.json';

let cachedUsers: User[] | null = null;

async function fetchMockUsers(): Promise<User[]> {
  // Return cached data if available
  if (cachedUsers) {
    return cachedUsers;
  }

  try {
    // Try to fetch from API endpoint
    const response = await fetch(API_URL);
    if (response.ok) {
      const data = await response.json();
      cachedUsers = data as User[];
      return cachedUsers;
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