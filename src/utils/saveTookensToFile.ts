// src/utils/saveTokensToFile.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';

/**
 * 저장된 토큰을 JSON 파일로 저장
 */
export const saveTokensToJsonFile = async (): Promise<string> => {
  try {
    const keys = ['authToken', 'googleAuthToken', 'naverAuthCode'];
    const entries = await Promise.all(
      keys.map(async (key) => [key, await AsyncStorage.getItem(key)])
    );

    const jsonObject = Object.fromEntries(entries);
    const jsonString = JSON.stringify(jsonObject, null, 2);

    const fileUri = FileSystem.documentDirectory + 'tokens.json';
    await FileSystem.writeAsStringAsync(fileUri, jsonString, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    console.log('JSON 파일 저장됨:', fileUri);
    return fileUri;
  } catch (err) {
    console.error('JSON 저장 실패:', err);
    throw err;
  }
};
