import { UserRole } from './models';

export const userRoleMapper: Record<UserRole, string> = {
  [UserRole.Veteran]: 'Veteran/Şəhid Ailəsi',
  [UserRole.Student]: 'Tələbə',
  [UserRole.Business]: 'Biznes',
  [UserRole.Admin]: 'Admin',
};
