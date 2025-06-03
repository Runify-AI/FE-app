// components/Button/RunnifyLoginButton.tsx
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type Props = {
  onPress: () => void;
};

export default function RunnifyLoginButton({ onPress }: Props) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>로그인하기</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#333',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: '600',
  },
});
