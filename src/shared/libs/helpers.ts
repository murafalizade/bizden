import { BASE_API_URL } from '@shared/constants';
import { UploadFile } from 'antd/es/upload/interface';
import { roleGuard } from '@shared/libs/role-guard';
import { IJwtPayload, UserRole } from '@shared/libs/models';
import { jwtDecode } from 'jwt-decode';

export const mapperFileUploader = (fileNames: string[]): UploadFile[] => {
  return fileNames?.map((fileName, index) => ({
    uid: `${index + 1}`,
    name: fileName,
    status: 'done',
    url: `${BASE_API_URL}/api/file/${fileName}`,
    response: fileName,
  }));
};

export const routeAccessController = (path: string, role: UserRole) => {
  if (role === UserRole.Admin) return true;
  const allowedRoles = roleGuard[path];
  if (!allowedRoles) return true;
  return allowedRoles.includes(role);
};

export const jwtDecoder = (jwt?: string) => {
  if (!jwt) return null;
  const payload: IJwtPayload = jwtDecode(jwt);

  // Check if `exp` is a valid number and not expired
  if (typeof payload.exp !== 'number') return null;

  const currentTime = Math.floor(Date.now() / 1000);
  if (payload.exp < currentTime) return null;

  return payload;
};
