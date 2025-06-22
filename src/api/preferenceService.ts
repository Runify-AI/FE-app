// src/api/preferenceService.ts
const MOCK_API_BASE_URL = 'https://d8aa4407-8ef6-447c-92a4-3b429a0100f9.mock.pstmn.io';

interface UserPreferences {
  place: string[];
  pathStyle: string[];
  intensity: string[];
}

// 선호도 정보 불러오기 (GET 요청)
export const fetchUserPreferences = async (): Promise<UserPreferences | null> => {
  try {
    console.log('API: Fetching user preferences from:', `${MOCK_API_BASE_URL}/preferences`);
    const response = await fetch(`${MOCK_API_BASE_URL}/preferences`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch preferences: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data: UserPreferences = await response.json();
    console.log('API: Fetched user preferences:', data);
    return data;
  } catch (error) {
    console.error('API Error fetching user preferences:', error);
    throw error;
  }
};

// 선호도 정보 업데이트 (PUT 요청)
export const updateUserPreferences = async (preferences: UserPreferences): Promise<boolean> => {
  try {
    console.log('API: Updating user preferences on:', `${MOCK_API_BASE_URL}/preferences`, 'with data:', preferences);
    const response = await fetch(`${MOCK_API_BASE_URL}/preferences`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preferences),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update preferences: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const responseData = await response.json();
    console.log('API: Preferences updated successfully (response):', responseData);
    return true; // 성공 시 true 반환
  } catch (error) {
    console.error('API Error updating user preferences:', error);
    throw error;
  }
};