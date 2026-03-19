export interface User {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';
  organization: string;
  fullName: string;
  bvn: string;
  gender: string;
  maritalStatus: string;
  children: string;
  typeOfResidence: string;
  levelOfEducation: string;
  employmentStatus: string;
  sectorOfEmployment: string;
  durationOfEmployment: string;
  officeEmail: string;
  monthlyIncome: [string, string];
  loanRepayment: string;
  twitter: string;
  facebook: string;
  instagram: string;
  guarantorName: string;
  guarantorPhone: string;
  guarantorEmail: string;
  guarantorRelationship: string;
  accountBalance: string;
  accountNumber: string;
  bank: string;
  tier: number;
  avatar: string;
  guarantor2Name: string;
  guarantor2Phone: string;
  guarantor2Email: string;
  guarantor2Relationship: string;
  
}