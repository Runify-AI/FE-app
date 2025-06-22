// src/components/auth/signup/SignupStep1.tsx
import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { sendSignupCode, verifyEmailCode } from '../../../api/userService';

interface SignupStep1Props {
  visible: boolean;
  name: string;
  setName: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  nickname: string;
  setNickname: (val: string) => void;
  verificationCode: string;
  setVerificationCode: (val: string) => void;
  isVerified: boolean;
  setIsVerified: (val: boolean) => void;
  showPassword: boolean;
  setShowPassword: (val: boolean) => void;
  onClose: () => void;
  onSignupSuccess: () => void;
  onNext?: () => void;
}

const SignupStep1: React.FC<SignupStep1Props> = ({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  nickname,
  setNickname,
  verificationCode,
  setVerificationCode,
  isVerified,
  setIsVerified,
  showPassword,
  setShowPassword,
  onNext,
}) => {
  const handleSendCode = async () => {
    if (!email) return Alert.alert('오류', '이메일을 입력해주세요.');
    try {
      const res = await sendSignupCode(email);
      Alert.alert('인증코드 전송', res.message || '이메일로 인증코드가 전송되었습니다.');
    } catch (err: any) {
      Alert.alert('오류', err.message || '인증코드 전송 실패');
    }
  };

  const handleVerify = async () => {
    if (!email || !verificationCode) return Alert.alert('오류', '이메일과 인증코드를 입력해주세요.');
    try {
      const res = await verifyEmailCode(email, verificationCode);
      Alert.alert('인증 성공', res.message || '이메일 인증 완료');
      setIsVerified(true);
    } catch (err: any) {
      Alert.alert('인증 실패', err.message || '인증코드가 올바르지 않습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입 - 기본 정보</Text>

      <TextInput style={styles.input} placeholder="이름" value={name} onChangeText={setName} />

      <TextInput
        style={styles.input}
        placeholder="이메일 주소(아이디)"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.verifyButton} onPress={handleSendCode}>
        <Text style={styles.verifyText}>인증코드 요청</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="인증코드 입력"
        value={verificationCode}
        onChangeText={setVerificationCode}
        keyboardType="number-pad"
      />

      <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
        <Text style={styles.verifyText}>인증 확인</Text>
      </TouchableOpacity>

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity style={styles.toggleButton} onPress={() => setShowPassword(!showPassword)}>
          <Text style={styles.toggleText}>{showPassword ? '숨기기' : '보기'}</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="닉네임"
        value={nickname}
        onChangeText={setNickname}
      />

      <TouchableOpacity style={styles.button} onPress={onNext} disabled={!isVerified}>
        <Text style={styles.buttonText}>다음</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  verifyButton: { alignSelf: 'flex-end', marginBottom: 12 },
  verifyText: { color: '#1E2D4D', fontWeight: 'bold' },
  passwordContainer: { position: 'relative' },
  toggleButton: { position: 'absolute', right: 12, top: 12 },
  toggleText: { color: '#1E2D4D', fontWeight: '600' },
  button: {
    backgroundColor: '#1E2D4D',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default SignupStep1;
