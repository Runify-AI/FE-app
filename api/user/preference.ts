import axios from '@/api/axios';

// 선호도 조회
export const getUserPreferences = async (token: string) => {
  const response = await axios.get('/api/preferences-list', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

//  선호도 저장
export const createUserPreferences = async (
  token: string,
  preferences: {
    preferencePlaces: string[];
    preferenceRoutes: string[];
    preferenceAvoids: string[];
    preferenceEtcs: string[];
  }
) => {
  const response = await axios.post('/api/preferences-create', preferences, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

//  선호도 수정
export const updateUserPreferences = async (
  token: string,
  preferences: {
    preferencePlaces: string[];
    preferenceRoutes: string[];
    preferenceAvoids: string[];
    preferenceEtcs: string[];
  }
) => {
  const response = await axios.put('/api/preferences-update', preferences, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
