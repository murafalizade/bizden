import api from '@shared/libs/service';
import { readNotificationResponse, UserNotification } from './models';

export const getNotifications = async (): Promise<UserNotification[]> => {
  const { data } = await api.get('/notification');
  return data;
};

export const makeReady = async (data: readNotificationResponse): Promise<void> => {
  return await api.put('/notification/read', data);
};
