// src/hooks/useNaverAuth.ts
import * as AuthSession from 'expo-auth-session';
import Constants from 'expo-constants';

const NAVER_AUTH_URL = 'https://nid.naver.com/oauth2.0/authorize';
const NAVER_TOKEN_URL = 'https://nid.naver.com/oauth2.0/token';

const discovery = {
  authorizationEndpoint: NAVER_AUTH_URL,
  tokenEndpoint: NAVER_TOKEN_URL,
};

const useNaverAuth = () => {
  const clientId = Constants.expoConfig?.extra?.naverClientId!;
  const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId,
      redirectUri,
      responseType: AuthSession.ResponseType.Code,
    },
    discovery
  );

  return { request, response, promptAsync };
};

export default useNaverAuth;
