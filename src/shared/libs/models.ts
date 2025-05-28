import { JwtPayload } from 'jwt-decode';

export enum UserRole {
  Admin = 'Admin',
  Business = 'Business',
  Student = 'Student',
  Veteran = 'Veteran',
}

export enum BusinessType {
  Corporate,
  Individual,
}

export interface IJwtPayload extends JwtPayload {
  email: string;
  fullName: string;
  role: UserRole;
  isCompleted: boolean;
  isClosed: boolean;
  isVerified: boolean;
}

export interface StudentProfile {
  universityName: string;
  major: string;
  startYear: number;
  endYear: number;
  studentIdFiles: string[];
}

export interface VeteranProfile {
  type: number;
  description: string;
  relevanceType: string;
  veteranProofFiles: string[];
}

export interface BusinessProfile {
  id: string;
  name: string;
  description: string;
  location: string | undefined;
  city: string;
  type: number;
  category: string;
  motivationLetter: string | undefined;
  phoneNumber: string | undefined;
  profileImage: string | undefined;

  userId: string;
}
