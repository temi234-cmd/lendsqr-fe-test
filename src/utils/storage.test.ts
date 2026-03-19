import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  saveUserToStorage,
  getUserFromStorage,
  getViewedUsers,
  updateUserStatus,
} from '../utils/storage';
import type { User } from '../types';

const mockUser: User = {
  id: 'user-1',
  username: 'testuser',
  fullName: 'Test User',
  email: 'test@example.com',
  phoneNumber: '08012345678',
  dateJoined: '01 Jan 2024',
  status: 'Active',
  organization: 'Lendsqr',
  bvn: '12345678901',
  gender: 'Male',
  maritalStatus: 'Single',
  children: '0',
  typeOfResidence: 'Apartment',
  levelOfEducation: 'Tertiary',
  employmentStatus: 'Employed',
  sectorOfEmployment: 'FinTech',
  durationOfEmployment: '< 6 months',
  officeEmail: 'test@company.com',
  monthlyIncome: ['100000', '150000'],
  loanRepayment: '10000',
  twitter: '@testuser',
  facebook: 'testuser',
  instagram: '@testuser_ig',
  guarantorName: 'Guarantor Name',
  guarantorPhone: '08087654321',
  guarantorEmail: 'guarantor@example.com',
  guarantorRelationship: 'Parent',
  guarantor2Name: 'Guarantor 2',
  guarantor2Phone: '08098765432',
  guarantor2Email: 'guarantor2@example.com',
  guarantor2Relationship: 'Sibling',
  accountBalance: '250000',
  accountNumber: '1234567890',
  bank: 'Access Bank',
  tier: 1,
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=testuser',
};

describe('Storage Utilities', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('saveUserToStorage', () => {
    it('should save a user to localStorage', () => {
      saveUserToStorage(mockUser);
      const stored = localStorage.getItem('lendsqr_viewed_users');
      expect(stored).toBeTruthy();
      const parsed = JSON.parse(stored!);
      expect(parsed['user-1']).toEqual(mockUser);
    });

    it('should save multiple users to localStorage', () => {
      const user2: User = { ...mockUser, id: 'user-2', username: 'testuser2' };
      saveUserToStorage(mockUser);
      saveUserToStorage(user2);
      const stored = localStorage.getItem('lendsqr_viewed_users');
      const parsed = JSON.parse(stored!);
      expect(Object.keys(parsed).length).toBe(2);
      expect(parsed['user-1']).toEqual(mockUser);
      expect(parsed['user-2']).toEqual(user2);
    });

    it('should overwrite existing user with same id', () => {
      saveUserToStorage(mockUser);
      const updatedUser = { ...mockUser, status: 'Inactive' as const };
      saveUserToStorage(updatedUser);
      const stored = localStorage.getItem('lendsqr_viewed_users');
      const parsed = JSON.parse(stored!);
      expect(parsed['user-1'].status).toBe('Inactive');
    });

    it('should handle storage errors gracefully', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const originalSetItem = Storage.prototype.setItem;
      Storage.prototype.setItem = vi.fn(() => {
        throw new Error('Storage full');
      });
      saveUserToStorage(mockUser);
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
      Storage.prototype.setItem = originalSetItem;
    });
  });

  describe('getUserFromStorage', () => {
    it('should retrieve a user from localStorage', () => {
      saveUserToStorage(mockUser);
      const retrieved = getUserFromStorage('user-1');
      expect(retrieved).toEqual(mockUser);
    });

    it('should return null for non-existent user', () => {
      const retrieved = getUserFromStorage('non-existent');
      expect(retrieved).toBeNull();
    });

    it('should return null when localStorage is empty', () => {
      const retrieved = getUserFromStorage('user-1');
      expect(retrieved).toBeNull();
    });

    it('should handle corrupted data gracefully', () => {
      localStorage.setItem('lendsqr_viewed_users', 'invalid json');
      const retrieved = getUserFromStorage('user-1');
      expect(retrieved).toBeNull();
    });
  });

  describe('getViewedUsers', () => {
    it('should return all viewed users', () => {
      const user2: User = { ...mockUser, id: 'user-2', username: 'testuser2' };
      saveUserToStorage(mockUser);
      saveUserToStorage(user2);
      const allUsers = getViewedUsers();
      expect(Object.keys(allUsers).length).toBe(2);
      expect(allUsers['user-1']).toEqual(mockUser);
      expect(allUsers['user-2']).toEqual(user2);
    });

    it('should return empty object when no users are stored', () => {
      const allUsers = getViewedUsers();
      expect(allUsers).toEqual({});
    });

    it('should handle corrupted data gracefully', () => {
      localStorage.setItem('lendsqr_viewed_users', 'invalid json');
      const allUsers = getViewedUsers();
      expect(allUsers).toEqual({});
    });
  });

  describe('updateUserStatus', () => {
    it('should update user status in storage', () => {
      saveUserToStorage(mockUser);
      updateUserStatus('user-1', 'Blacklisted');
      const updated = getUserFromStorage('user-1');
      expect(updated?.status).toBe('Blacklisted');
    });

    it('should do nothing if user does not exist', () => {
      updateUserStatus('non-existent', 'Inactive');
      const allUsers = getViewedUsers();
      expect(Object.keys(allUsers).length).toBe(0);
    });

    it('should handle multiple status updates', () => {
      saveUserToStorage(mockUser);
      updateUserStatus('user-1', 'Inactive');
      updateUserStatus('user-1', 'Pending');
      updateUserStatus('user-1', 'Active');
      const updated = getUserFromStorage('user-1');
      expect(updated?.status).toBe('Active');
    });

    it('should handle storage errors gracefully', () => {
      saveUserToStorage(mockUser);
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const originalSetItem = Storage.prototype.setItem;
      Storage.prototype.setItem = vi.fn(() => {
        throw new Error('Storage full');
      });
      updateUserStatus('user-1', 'Inactive');
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
      Storage.prototype.setItem = originalSetItem;
    });
  });
});
