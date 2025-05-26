import { LoginPayload } from '@app/(authless)/login/utils/models';
import api from '@shared/libs/service';

export const loginPost = async (payload: LoginPayload): Promise<string> => {
  const { data } = await api.post('/auth/login', payload);
  return data;
};
