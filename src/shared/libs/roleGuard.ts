export const roleGuard: Record<string, string[]> = {
    '/admin/dashboard': ['admin'],
    '/user/profile': ['user', 'admin'],
    '/manager/tools': ['manager'],
};
