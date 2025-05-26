export const roleGuard: Record<string, string[]> = {
    '/dashboard': ['veteran', 'student', 'business'],
    '/dashboard/search': ['veteran', 'student', 'business'],
    '/dashboard/applications': ['veteran', 'student'],
    '/dashboard/opportunities': ['business'],
    '/dashboard/create': ['business'],
    '/dashboard/profile': ['veteran', 'student', 'business'],
};
