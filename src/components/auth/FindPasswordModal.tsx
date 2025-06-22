// src/components/auth/FindPasswordModal.tsx
import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import {
  sendResetPasswordCode,
  verifyEmailCode,
  confirmResetPassword,
} from '../../api/userService';

const { width } = Dimensions.get('window');

interface FindPasswordModalProps {
  visible: boolean;
  onClose: () => void;
}

const FindPasswordModal: React.FC<FindPasswordModalProps> = ({ visible, onClose }) => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleSendCode = async () => {
    if (!email) return Alert.alert('오류', '이메일을 입력해주세요.');
    try {
      const res = await sendResetPasswordCode(email);
      Alert.alert('인증코드 전송', res.message || '이메일로 인증코드가 전송되었습니다.');
    } catch (err: any) {
      Alert.alert('오류', err.message || '인증코드 전송 실패');
    }
  };

  const handleVerify = async () => {
    if (!email || !verificationCode) {
      Alert.alert('오류', '이메일과 인증코드를 입력해주세요.');
      return;
    }
    try {
      const res = await verifyEmailCode(email, verificationCode);
      Alert.alert('인증 성공', res.message || '이메일 인증 완료');
      setIsVerified(true);
    } catch (err: any) {
      Alert.alert('인증 실패', err.message || '인증코드가 올바르지 않습니다.');
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword || !verificationCode) {
      Alert.alert('오류', '인증코드와 새로운 비밀번호를 입력해주세요.');
      return;
    }
    try {
      const res = await confirmResetPassword(verificationCode, newPassword);
      Alert.alert('비밀번호 재설정 완료', res.message || '비밀번호가 변경되었습니다.');
      onClose();
    } catch (err: any) {
      Alert.alert('재설정 실패', err.message || '비밀번호 변경에 실패했습니다.');
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>비밀번호 찾기</Text>

          <TextInput
            placeholder="이메일"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TouchableOpacity style={styles.buttonSmall} onPress={handleSendCode}>
            <Text style={styles.buttonText}>인증코드 요청</Text>
          </TouchableOpacity>

          <TextInput
            placeholder="인증코드"
            value={verificationCode}
            onChangeText={setVerificationCode}
            style={styles.input}
            keyboardType="number-pad"
          />

          <TouchableOpacity style={styles.buttonSmall} onPress={handleVerify}>
            <Text style={styles.buttonText}>인증 확인</Text>
          </TouchableOpacity>

          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="새 비밀번호"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={!showPassword}
              style={styles.input}
            />
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text style={styles.toggleText}>{showPassword ? '숨기기' : '보기'}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.button, !isVerified && styles.buttonDisabled]}
            onPress={handleResetPassword}
            disabled={!isVerified}
          >
            <Text style={styles.buttonText}>비밀번호 재설정</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeText}>닫기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000080',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    width: width * 0.9,
    borderRadius: 10,
    padding: 24,
    maxHeight: '90%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#1E2D4D',
    paddingVertical: 12,
    borderRadius: 6,
    marginTop: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#aaa',
  },
  buttonSmall: {
    alignSelf: 'flex-end',
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeText: {
    color: '#888',
    marginTop: 16,
    textAlign: 'center',
  },
  passwordContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  toggleButton: {
    position: 'absolute',
    right: 12,
    top: 10,
  },
  toggleText: {
    color: '#1E2D4D',
    fontWeight: '600',
  },
});

export default FindPasswordModal;
