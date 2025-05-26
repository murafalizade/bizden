import {
  RegisterPayload,
  VerificationBusinessProfilePayload,
  VerificationProfilePayload,
} from '@app/(authless)/register/libs/models';
import api from '@shared/libs/service';

export const postRegister = async (request: RegisterPayload): Promise<string> => {
  const { data } = await api.post(`/auth/register`, request);
  return data;
};

export const postVerificationProfile = async (request: VerificationProfilePayload) => {
  await api.post(`/verification/add-verification/student`, request);
};

export const postVerificationVeteranProfile = async (request: VerificationProfilePayload) => {
  await api.post(`/verification/add-verification/veteran`, request);
};

export const postVerificationBusinessProfile = async (
  request: VerificationBusinessProfilePayload
) => {
  await api.post(`/verification/add-verification/business`, request);
};
