import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SignUpStep3({
  onStart,
  onBack,
}: {
  onStart: () => void;
  onBack: () => void;
}) {
  const handleStart = () => {
    Alert.alert('회원가입에 성공하였습니다!');
    onStart();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>루틴 설정</Text>
      <Text style={styles.subtitle}>당신의 달리기 습관을 완성해보세요!</Text>

      <TouchableOpacity style={styles.button} onPress={handleStart}>
        <Text style={styles.buttonText}>시작하기</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.backButton]} onPress={onBack}>
        <Text style={styles.buttonText}>이전단계로</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: 300,
    maxWidth: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#444',
    paddingVertical: 12,
    borderRadius: 6,
    marginBottom: 10,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#888',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});
