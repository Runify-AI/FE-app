import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface Props {
  onClose: () => void;
}

export default function FindPasswordForm({ onClose }: Props) {
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');

  const handleFindPassword = () => {
    if (!email || !id) {
      Alert.alert('오류', '아이디와 이메일을 모두 입력해주세요.');
    } else if (email === 'wjdkun12' && id === 'Dangmeong') {
      Alert.alert('조회 성공', '회원님의 임시 비밀번호는 1234입니다.');
    } else {
      Alert.alert('조회 오류', '입력하신 정보와 일치하는 비밀번호가 없습니다.');
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.title}>비밀번호 찾기</Text>

        <Text style={styles.label}>아이디 입력</Text>
        <TextInput
          style={styles.input}
          placeholder="아이디를 입력하세요"
          value={id}
          onChangeText={setId}
        />

        <Text style={styles.label}>이메일 입력</Text>
        <TextInput
          style={styles.input}
          placeholder="이메일을 입력하세요"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.helper}>회원가입시 사용한 이메일을 입력하세요</Text>

        <TouchableOpacity style={styles.button} onPress={handleFindPassword}>
          <Text style={styles.buttonText}>조회하기</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeText}>닫기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  container: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    width: 300,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    marginTop: 12,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    marginTop: 4,
    backgroundColor: '#fff',
  },
  helper: {
    fontSize: 12,
    color: '#777',
    marginVertical: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#444',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  closeText: {
    fontSize: 14,
    color: '#555',
  },
});
