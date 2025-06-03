import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  onStart: () => void;
  onBack: () => void;
  onClose: () => void; // ✅ 추가
}

export default function SignUpStep3({ onStart, onBack, onClose }: Props) {
  const handleStart = () => {
    Alert.alert('회원가입에 성공하였습니다!');
    onStart();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>루틴 설정</Text>

      {/* 루틴 UI는 생략 */}
      <TouchableOpacity style={styles.button} onPress={handleStart}>
        <Text style={styles.buttonText}>시작하기</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.buttonText}>이전단계로</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeText}>닫기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  button: { backgroundColor: '#444', padding: 12, borderRadius: 6, marginBottom: 10 },
  backButton: { backgroundColor: '#888', padding: 12, borderRadius: 6, marginBottom: 10 },
  buttonText: { color: '#fff', textAlign: 'center' },
  closeButton: { alignItems: 'center' },
  closeText: { fontSize: 14, color: '#555' },
});
