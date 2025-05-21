import {JwtPayload} from "jwt-decode";

export enum UserRole {
    Admin = 'Admin',
    Business = 'Business',
    Student = 'Student',
}

export interface IJwtPayload extends JwtPayload{
    email: string;
    fullName: string;
    role: UserRole;
    [key: string]: any;
}
