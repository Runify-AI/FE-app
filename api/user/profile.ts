// src/api/user/profile.ts

import axios from '@/api/axios';

export const getUserProfile = async (token: string) => {
  const res = await axios.get('/api/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.data;
};

export const updateUserProfile = async (
  token: string,
  data: {
    name: string;
    nickName: string;
    height: number;
    weight: number;
    runningType: string;
  }
) => {
  const res = await axios.put('/api/profile-update', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

