import {JwtPayload} from "jwt-decode";

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

export interface IJwtPayload extends JwtPayload{
    email: string;
    fullName: string;
    role: UserRole;
    [key: string]: any;
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
    location?: string;
    city: string;
    type: number;
    category: string;
    motivationLetter?: string;
    phoneNumber?: string;
    profileImage?: string;

    userId: string;
}
