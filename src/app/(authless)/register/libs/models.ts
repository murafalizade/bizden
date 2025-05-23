import {BusinessProfile, StudentProfile, UserRole, VeteranProfile} from "@shared/libs/models";

export enum RegisterStep {
    RegisterAccount, ProfileInfo, Submission
}

export interface RegisterPayload {
    fullName: string;
    email: string;
    password: string;
    role: UserRole;
}

export interface SubmissionPayload {
    note?: string;
}

export type StudentProfilePayload = StudentProfile;
export type VeteranProfilePayload = VeteranProfile;
export type BusinessProfilePayload = Omit<BusinessProfile, "userId" | "id">;

export interface VerificationProfilePayload {
    note?: string;
    veteranInfo?: VeteranProfilePayload;
    studentInfo?: StudentProfilePayload;
    userId: string;
}

export interface VerificationBusinessProfilePayload {
    note?: string;
    userId: string;
    businessInfo: BusinessProfilePayload;
}
