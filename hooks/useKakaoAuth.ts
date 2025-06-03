import * as AuthSession from 'expo-auth-session';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

const discovery = {
  authorizationEndpoint: 'https://kauth.kakao.com/oauth/authorize',
  tokenEndpoint: 'https://kauth.kakao.com/oauth/token',
};

export default function useKakaoAuth() {
    const clientId = Constants.expoConfig?.extra?.kakaoNativeAppKey;
    console.log('✅ Kakao Client ID:', clientId);

  let redirectUri: string;

  if (Platform.OS === 'web') {
    // 웹 환경일 경우, localhost 주소를 명시적으로 사용
    redirectUri = 'http://localhost:8081'; // 이전에 오류 메시지에 나온 주소
  } else {
    // 모바일(iOS/Android) 환경일 경우, makeRedirectUri 사용
    redirectUri = AuthSession.makeRedirectUri({ useProxy: false });
  }

  console.log('✅ Kakao Redirect URI:', redirectUri); // 실제 사용될 URI 값 확인
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId,
      redirectUri,
      responseType: AuthSession.ResponseType.Code,
      scopes: [],
    },
    discovery
  );

  return { request, response, promptAsync };
}
