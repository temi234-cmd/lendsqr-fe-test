import type { User } from '../types';
import mockUsersData from '../../public/mock-users.json';

let cachedUsers: User[] | null = null;

export async function fetchMockUsers(): Promise<User[]> {
  if (cachedUsers) {
    return cachedUsers;
  }
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  cachedUsers = (mockUsersData as User[]);
  return cachedUsers;
}

export const mockUsers: User[] = (mockUsersData as User[]);