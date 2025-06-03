import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { STRINGS } from '../../constants/strings';
import RunnifyLoginButton from '../Button/RunnifyLoginButton';

interface Props {
  onClose: () => void;
  onNavigate: (view: 'signUp' | 'findId' | 'findPw') => void;
}

export default function LoginForm({ onClose, onNavigate }: Props) {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const handleLogin = () => {
    if (id === 'Dangmeong' && pw === '1234') {
      onClose(); // 로그인 성공 시 창 닫기
      setTimeout(() => {
        Alert.alert('로그인 성공!', STRINGS.welcome);
      }, 200);
    } else {
      setTimeout(() => {
        Alert.alert('로그인 실패', STRINGS.fail);
      }, 200);
    }
  };

  const safeNavigate = (view: 'signUp' | 'findId' | 'findPw') => {
    if (typeof onNavigate === 'function') {
      console.log(`Navigating to: ${view}`);
      onNavigate(view);
    } else {
      console.warn('onNavigate prop is not a function');
    }
  };

  return (
    <View style={styles.loginBox}>
      <Text style={styles.title}>Runnify로 로그인</Text>

      <Text style={styles.label}>아이디</Text>
      <TextInput
        style={styles.input}
        placeholder="아이디를 입력하세요"
        value={id}
        onChangeText={setId}
      />

      <Text style={styles.label}>비밀번호</Text>
      <TextInput
        style={styles.input}
        placeholder="비밀번호를 입력하세요"
        secureTextEntry
        value={pw}
        onChangeText={setPw}
      />

      <View style={styles.linkRow}>
        <TouchableOpacity onPress={() => safeNavigate('signUp')}>
          <Text style={styles.link}>회원가입</Text>
        </TouchableOpacity>
        <Text style={styles.linkDivider}>|</Text>
        <TouchableOpacity onPress={() => safeNavigate('findId')}>
          <Text style={styles.link}>아이디 찾기</Text>
        </TouchableOpacity>
        <Text style={styles.linkDivider}>|</Text>
        <TouchableOpacity onPress={() => safeNavigate('findPw')}>
          <Text style={styles.link}>비밀번호 찾기</Text>
        </TouchableOpacity>
      </View>

      <RunnifyLoginButton onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  loginBox: {
    backgroundColor: '#EEE',
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
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#AAA',
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 4,
    marginBottom: 12,
    borderRadius: 6,
    backgroundColor: '#FFF',
  },
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  link: {
    fontSize: 12,
    color: '#333',
  },
  linkDivider: {
    marginHorizontal: 6,
    fontSize: 12,
    color: '#999',
  },
});
