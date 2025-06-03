import * as AuthSession from 'expo-auth-session';
import Constants from 'expo-constants';

const discovery = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
};

export function useGoogleAuth() {
  const clientId = Constants.expoConfig?.extra?.googleClientId;

  const redirectUri = AuthSession.makeRedirectUri({
    useProxy: true  //
  });

  console.log('redirectUri:', redirectUri); 

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId,
      scopes: ['openid', 'profile', 'email'],
      redirectUri  //
    },
    discovery
  );

  return { request, response, promptAsync };
}
