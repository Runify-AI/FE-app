import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
import { useEffect } from 'react';

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
};

export default function useGoogleAuth() {
  const clientId = Constants.expoConfig?.extra?.googleAndroidClientId!;
  const redirectUri = AuthSession.makeRedirectUri({
    useProxy: true, 
  });

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId,
      redirectUri,
      scopes: ['profile', 'email'],
      responseType: 'code', 
      usePKCE: true,       
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      console.log('✅ Authorization code:', code);
    } else if (response?.type === 'error') {
      console.error('❌ Google login error:', response.error);
    }
  }, [response]);

  return { request, response, promptAsync };
}
