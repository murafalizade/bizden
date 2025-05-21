import {UserRole} from "@shared/libs/models";

export enum RegisterStep {
    RegisterAccount, ProfileInfo, Submission
}

export interface RegisterPayload {
    fullName: string;
    email: string;
    password: string;
    role: UserRole;
}
