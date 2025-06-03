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

export default function FindIdForm({ onClose }: Props) {
  const [email, setEmail] = useState('');

  const handleFindId = () => {
    if (!email) {
      Alert.alert('오류', '이메일을 입력해주세요.');
    } else if (email === 'wjdkun12') {
      Alert.alert('조회 성공', '회원님의 ID는 wjd50001384입니다.');
    } else {
      Alert.alert('조회 오류', '입력하신 정보와 일치하는 아이디가 없습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>아이디 찾기</Text>

      <Text style={styles.label}>이메일 입력</Text>
      <TextInput
        style={styles.input}
        placeholder="이메일을 입력하세요"
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.helper}>회원가입시 사용한 이메일을 입력하세요</Text>

      <TouchableOpacity style={styles.button} onPress={handleFindId}>
        <Text style={styles.buttonText}>조회하기</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeText}>닫기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    width: 300,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  label: {
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    marginTop: 4,
  },
  helper: {
    fontSize: 12,
    color: '#777',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#444',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
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
