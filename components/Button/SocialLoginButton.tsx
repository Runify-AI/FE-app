import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { IMAGES } from '../../constants/images';

type Props = {
  type: 'google' | 'kakao' | 'naver';
};

export function SocialLoginButton({ type }: Props) {
  const image = IMAGES[type];
  return <TouchableOpacity style={styles.button}><Image source={image} style={styles.icon} /></TouchableOpacity>;
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 4,
  },
  icon: {
    width: 240,
    height: 40,
    resizeMode: 'contain',
  },
});
