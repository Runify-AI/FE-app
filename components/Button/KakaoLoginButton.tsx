// components/Button/KakaoLoginButton.tsx
import React, { useEffect } from 'react';
import { Alert, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { IMAGES } from '../../constants/images';
import useKakaoAuth from '../../hooks/useKakaoAuth';

const KakaoLoginButton = () => {
  const { request, response, promptAsync } = useKakaoAuth();

  useEffect(() => {
    if (response?.type === 'success') {
      Alert.alert('카카오 로그인 성공', `Access Code: ${response.params.code}`);
    } else if (response?.type === 'error') {
      Alert.alert('카카오 로그인 실패', '에러가 발생했습니다.');
    }
  }, [response]);

  return (
    <TouchableOpacity style={styles.button} onPress={() => promptAsync()}>
      <Image source={IMAGES.kakao} style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    maxWidth: 300,
    height: 44,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: 12,
  },
  icon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default KakaoLoginButton;
