import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface Props {
  data: {
    id: string;
    pw: string;
    email: string;
    nickname: string;
  };
  onChange: (data: Props['data']) => void;
  onNext: () => void;
  onClose: () => void;
}

export default function SignUpStep1({ data, onChange, onNext, onClose }: Props) {
  const handleChange = (field: keyof Props['data'], value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handleNext = () => {
    const { id, pw, email, nickname } = data;
    if (!id || !pw || !email || !nickname) {
      Alert.alert('입력하지 않은 내용이 있습니다');
      return;
    }
    onNext();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>
      <Text style={styles.subtitle}>피트니스 여정을 시작하세요!</Text>

      <TextInput
        placeholder="아이디를 입력하세요"
        value={data.id}
        onChangeText={(v) => handleChange('id', v)}
        style={styles.input}
      />
      <TextInput
        placeholder="비밀번호를 입력하세요"
        value={data.pw}
        secureTextEntry
        onChangeText={(v) => handleChange('pw', v)}
        style={styles.input}
      />
      <TextInput
        placeholder="이메일을 입력하세요"
        value={data.email}
        onChangeText={(v) => handleChange('email', v)}
        style={styles.input}
      />
      <TextInput
        placeholder="닉네임을 입력하세요"
        value={data.nickname}
        onChangeText={(v) => handleChange('nickname', v)}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>다음단계로</Text>
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
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#444',
    padding: 12,
    borderRadius: 6,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
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
