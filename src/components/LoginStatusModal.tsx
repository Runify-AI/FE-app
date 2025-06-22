// 파일 경로: src/components/LoginStatusModal.tsx
import React from 'react';
import { Modal, View, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface LoginStatusModalProps {
  isVisible: boolean;
  type: 'success' | 'error' | null;
}

const LoginStatusModal: React.FC<LoginStatusModalProps> = ({ isVisible, type }) => {
  if (!isVisible || !type) {
    return null;
  }

  const message = type === 'success' ? '로그인 성공!' : '로그인 오류!';
  const subMessage = type === 'success' ? 'Running+에 오신것을 환영합니다!' : '아이디 또는 비밀번호가 일치하지 않습니다.';

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.messageTitle}>{message}</Text>
          <Text style={styles.messageSub}>{subMessage}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.0)', // 이 모달 자체는 배경 블랙아웃을 하지 않음 (상위 모달이 함)
  },
  modalView: {
    width: width * 0.7, // 화면 너비의 70%
    backgroundColor: '#EBEBEB', // 모달 배경색
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  messageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  messageSub: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default LoginStatusModal;