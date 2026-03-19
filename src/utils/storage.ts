import type { User } from '../types';

const VIEWED_USERS_KEY = 'lendsqr_viewed_users';

export function saveUserToStorage(user: User): void {
  try {
    const existing = getViewedUsers();
    const updated = { ...existing, [user.id]: user };
    localStorage.setItem(VIEWED_USERS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save user to localStorage', err);
  }
}

export function getUserFromStorage(id: string): User | null {
  try {
    const existing = getViewedUsers();
    return existing[id] ?? null;
  } catch {
    return null;
  }
}

export function getViewedUsers(): Record<string, User> {
  try {
    const raw = localStorage.getItem(VIEWED_USERS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function updateUserStatus(id: string, status: User['status']): void {
  try {
    const users = getViewedUsers();
    if (users[id]) {
      users[id] = { ...users[id], status };
      localStorage.setItem(VIEWED_USERS_KEY, JSON.stringify(users));
    }
  } catch (err) {
    console.error('Failed to update user status', err);
  }
}