import React, { useEffect } from 'react';
import { Alert, Image, TouchableOpacity } from 'react-native';
import { IMAGES } from '../../constants/images';
import { useGoogleAuth } from '../../hooks/useGoogleAuth';

export default function GoogleLoginButton() {
  const { request, response, promptAsync } = useGoogleAuth();

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      Alert.alert('로그인 성공', `Access Token: ${authentication?.accessToken}`);
      // TODO: 서버에 토큰 전달 또는 상태 저장 등 처리
    }
  }, [response]);

  return (
    <TouchableOpacity
      onPress={() => {
        if (request) {
          promptAsync();
        } else {
          Alert.alert('Google 로그인 준비 중입니다.');
        }
      }}
      style={{ width: '100%', maxWidth: 300, height: 44 }}
    >
      <Image source={IMAGES.google} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
    </TouchableOpacity>
  );
}
