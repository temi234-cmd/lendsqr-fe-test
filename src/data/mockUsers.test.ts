import { describe, it, expect } from 'vitest';
import { mockUsers } from '../data/mockUsers';
import type { User } from '../types';

describe('Mock Users Data (API)', () => {
  describe('Data Structure & Integrity', () => {
    it('should have exactly 500 users loaded from JSON API', () => {
      expect(mockUsers.length).toBe(500);
    });

    it('should have all required fields in each user', () => {
      mockUsers.slice(0, 10).forEach((user: User) => {
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('username');
        expect(user).toHaveProperty('fullName');
        expect(user).toHaveProperty('email');
        expect(user).toHaveProperty('phoneNumber');
        expect(user).toHaveProperty('dateJoined');
        expect(user).toHaveProperty('status');
        expect(user).toHaveProperty('organization');
        expect(user).toHaveProperty('avatar');
        expect(user).toHaveProperty('bvn');
        expect(user).toHaveProperty('accountBalance');
        expect(user).toHaveProperty('bank');
      });
    });

    it('should have unique user IDs', () => {
      const ids = mockUsers.map((u: User) => u.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have sequential user IDs from user-1 to user-500', () => {
      for (let i = 0; i < 500; i++) {
        expect(mockUsers[i].id).toBe(`user-${i + 1}`);
      }
    });
  });

  describe('Data Validation - Status Field', () => {
    it('should have valid status values', () => {
      const validStatuses = ['Active', 'Inactive', 'Pending', 'Blacklisted'];
      mockUsers.forEach((user: User) => {
        expect(validStatuses).toContain(user.status);
      });
    });
  });

  describe('Data Validation - Email Format', () => {
    it('should have valid email addresses', () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      mockUsers.slice(0, 50).forEach((user: User) => {
        expect(emailRegex.test(user.email)).toBe(true);
      });
    });
  });

  describe('Data Validation - Phone Numbers', () => {
    it('should have valid Nigerian phone numbers', () => {
      mockUsers.slice(0, 50).forEach((user: User) => {
        expect(user.phoneNumber).toMatch(/^0\d{10}$/);
      });
    });

    it('should have valid guarantor phone numbers', () => {
      mockUsers.slice(0, 50).forEach((user: User) => {
        expect(user.guarantorPhone).toMatch(/^0\d{10}$/);
        expect(user.guarantor2Phone).toMatch(/^0\d{10}$/);
      });
    });
  });

  describe('Data Validation - Account Information', () => {
    it('should have valid account numbers', () => {
      mockUsers.slice(0, 50).forEach((user: User) => {
        expect(user.accountNumber).toMatch(/^\d{10}$/);
      });
    });

    it('should have valid BVN numbers', () => {
      mockUsers.slice(0, 50).forEach((user: User) => {
        expect(user.bvn).toMatch(/^\d{11}$/);
      });
    });

    it('should have valid tier values (1-3)', () => {
      mockUsers.forEach((user: User) => {
        expect(user.tier).toBeGreaterThanOrEqual(1);
        expect(user.tier).toBeLessThanOrEqual(3);
      });
    });

    it('should have valid bank names', () => {
      const validBanks = ['Access Bank', 'GTBank', 'UBA', 'Zenith Bank', 'First Bank'];
      mockUsers.forEach((user: User) => {
        expect(validBanks).toContain(user.bank);
      });
    });
  });

  describe('Data Validation - Employment & Education', () => {
    it('should have valid employment status', () => {
      const validStatuses = ['Employed', 'Self-employed', 'Unemployed'];
      mockUsers.forEach((user: User) => {
        expect(validStatuses).toContain(user.employmentStatus);
      });
    });

    it('should have valid education levels', () => {
      const validLevels = ['Polytechnic', 'Primary School', 'Secondary School', 'Tertiary'];
      mockUsers.forEach((user: User) => {
        expect(validLevels).toContain(user.levelOfEducation);
      });
    });

    it('should have valid sectors', () => {
      const validSectors = ['FinTech', 'Agriculture', 'Health', 'Transportation', 'Technology'];
      mockUsers.forEach((user: User) => {
        expect(validSectors).toContain(user.sectorOfEmployment);
      });
    });
  });

  describe('Data Validation - Personal Information', () => {
    it('should have valid gender values', () => {
      const validGenders = ['Male', 'Female'];
      mockUsers.forEach((user: User) => {
        expect(validGenders).toContain(user.gender);
      });
    });

    it('should have valid marital status values', () => {
      const validStatuses = ['Single', 'Married', 'Divorced'];
      mockUsers.forEach((user: User) => {
        expect(validStatuses).toContain(user.maritalStatus);
      });
    });

    it('should have children count as numeric string', () => {
      mockUsers.slice(0, 50).forEach((user: User) => {
        expect(/^\d+$/.test(user.children)).toBe(true);
      });
    });

    it('should have valid residence types', () => {
      const validTypes = ['Apartment', 'House', 'Semi-Detached', 'Detached'];
      mockUsers.forEach((user: User) => {
        expect(validTypes).toContain(user.typeOfResidence);
      });
    });
  });

  describe('Data Validation - Financial Information', () => {
    it('should have valid monthly income format', () => {
      mockUsers.slice(0, 50).forEach((user: User) => {
        expect(Array.isArray(user.monthlyIncome)).toBe(true);
        expect(user.monthlyIncome.length).toBe(2);
        user.monthlyIncome.forEach((income: string) => {
          expect(/^\d+$/.test(income)).toBe(true);
        });
      });
    });

    it('should have valid account balance format', () => {
      mockUsers.slice(0, 50).forEach((user: User) => {
        expect(/^\d+$/.test(user.accountBalance)).toBe(true);
      });
    });

    it('should have valid loan repayment format', () => {
      mockUsers.slice(0, 50).forEach((user: User) => {
        expect(/^\d+$/.test(user.loanRepayment)).toBe(true);
      });
    });
  });

  describe('Data Validation - Social Media & Contact', () => {
    it('should have valid social media handles', () => {
      mockUsers.slice(0, 50).forEach((user: User) => {
        expect(user.twitter).toMatch(/^@/);
        expect(user.instagram).toMatch(/^@/);
        expect(user.facebook).toBeTruthy();
      });
    });

    it('should have valid guarantor information', () => {
      mockUsers.slice(0, 50).forEach((user: User) => {
        expect(user.guarantorName).toBeTruthy();
        expect(user.guarantorEmail).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        expect(user.guarantorRelationship).toBeTruthy();
        expect(user.guarantor2Name).toBeTruthy();
        expect(user.guarantor2Email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        expect(user.guarantor2Relationship).toBeTruthy();
      });
    });
  });

  describe('Data Validation - Organizations', () => {
    it('should have valid organization names', () => {
      const validOrgs = ['Lendsqr', 'Lendstart', 'AccessBank', 'First Bank'];
      mockUsers.forEach((user: User) => {
        expect(validOrgs).toContain(user.organization);
      });
    });

    it('should distribute users across organizations', () => {
      const orgCount = new Set(mockUsers.map(u => u.organization)).size;
      expect(orgCount).toBeGreaterThan(1);
    });
  });

  describe('Data Validation - Avatar URLs', () => {
    it('should have valid avatar URLs', () => {
      mockUsers.slice(0, 50).forEach((user: User) => {
        expect(user.avatar).toContain('https://');
        expect(user.avatar).toContain('dicebear');
      });
    });
  });

  describe('Data Distribution & Diversity', () => {
    it('should have multiple statuses represented', () => {
      const statuses = new Set(mockUsers.map(u => u.status));
      expect(statuses.size).toBeGreaterThanOrEqual(3);
    });

    it('should have users from multiple organizations', () => {
      const orgs = new Set(mockUsers.map(u => u.organization));
      expect(orgs.size).toBeGreaterThan(1);
    });

    it('should have diverse names represented', () => {
      const firstNames = new Set(mockUsers.map(u => u.fullName.split(' ')[0]));
      expect(firstNames.size).toBeGreaterThan(10);
    });

    it('should have all gender values represented', () => {
      const genders = new Set(mockUsers.map(u => u.gender));
      expect(genders.size).toBe(2);
    });

    it('should have all employment statuses represented', () => {
      const statuses = new Set(mockUsers.map(u => u.employmentStatus));
      expect(statuses.size).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Data Sampling', () => {
    it('first user should be complete and valid', () => {
      const firstUser = mockUsers[0];
      expect(firstUser.id).toBe('user-1');
      expect(firstUser.username).toBeTruthy();
      expect(firstUser.fullName).toBeTruthy();
      expect(firstUser.email).toContain('@');
      expect(firstUser.status).toBeTruthy();
    });

    it('middle user should be complete and valid', () => {
      const middleUser = mockUsers[250];
      expect(middleUser.id).toBe('user-251');
      expect(middleUser.username).toBeTruthy();
      expect(middleUser.fullName).toBeTruthy();
      expect(middleUser.status).toBeTruthy();
    });

    it('last user should be complete and valid', () => {
      const lastUser = mockUsers[499];
      expect(lastUser.id).toBe('user-500');
      expect(lastUser.username).toBeTruthy();
      expect(lastUser.fullName).toBeTruthy();
      expect(lastUser.status).toBeTruthy();
    });
  });
});
