import {UserRole} from "@shared/libs/models";

export const roleGuard: Record<string, UserRole[]> = {
    '/dashboard': [UserRole.Student, UserRole.Veteran, UserRole.Business],
    '/dashboard/search': [UserRole.Student, UserRole.Veteran, UserRole.Business],
    '/dashboard/applications': [UserRole.Student, UserRole.Veteran],
    '/dashboard/opportunities': [UserRole.Business],
    '/dashboard/create-opportunity': [UserRole.Business],
    '/dashboard/notification': [UserRole.Student, UserRole.Veteran, UserRole.Business],
    '/dashboard/profile': [UserRole.Student, UserRole.Veteran, UserRole.Business],
};
