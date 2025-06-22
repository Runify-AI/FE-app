// src/components/auth/FindIdModal.tsx
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
import { Ionicons } from '@expo/vector-icons';
import { findUserEmail } from '../../api/userService';

interface FindIdModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const FindIdModal: React.FC<FindIdModalProps> = ({ isVisible, onClose }) => {
  const [nickname, setNickname] = useState('');
  const [runningType, setRunningType] = useState('');
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleFindId = async () => {
    if (!nickname || !runningType) {
      Alert.alert('입력 오류', '닉네임과 러닝 타입을 모두 입력해주세요.');
      return;
    }

    try {
      const res = await findUserEmail(nickname, runningType);
      setSearchResult(`가입된 이메일은 ${res.email} 입니다.`);
      setSearchError(null);
    } catch (err: any) {
      setSearchResult(null);
      setSearchError(err.message || '일치하는 이메일을 찾을 수 없습니다.');
    }
  };

  const handleCloseModal = () => {
    setNickname('');
    setRunningType('');
    setSearchResult(null);
    setSearchError(null);
    onClose();
  };

  return (
    <Modal animationType="fade" transparent visible={isVisible} onRequestClose={handleCloseModal}>
      <View style={styles.centeredView}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={handleCloseModal} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>이메일 찾기</Text>

            {!searchResult && !searchError && (
              <>
                <Text style={styles.inputLabel}>닉네임</Text>
                <TextInput
                  style={styles.input}
                  placeholder="닉네임을 입력해주세요"
                  value={nickname}
                  onChangeText={setNickname}
                />
                <Text style={styles.inputLabel}>러닝 타입</Text>
                <TextInput
                  style={styles.input}
                  placeholder="예: JOGGING"
                  value={runningType}
                  onChangeText={setRunningType}
                />
                <TouchableOpacity style={styles.searchButton} onPress={handleFindId}>
                  <Text style={styles.searchButtonText}>조회하기</Text>
                </TouchableOpacity>
              </>
            )}

            {searchError && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultTitle}>조회 실패</Text>
                <Text style={styles.resultText}>{searchError}</Text>
                <TouchableOpacity style={styles.searchButton} onPress={handleCloseModal}>
                  <Text style={styles.searchButtonText}>확인</Text>
                </TouchableOpacity>
              </View>
            )}

            {searchResult && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultTitle}>조회 성공</Text>
                <Text style={styles.resultText}>{searchResult}</Text>
                <TouchableOpacity style={styles.searchButton} onPress={handleCloseModal}>
                  <Text style={styles.searchButtonText}>확인</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalOverlay: {
    width: '90%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  modalView: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
  },
  backButton: {
    position: 'absolute',
    left: 15,
    top: 15,
    padding: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#5A6372',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultContainer: {
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  resultText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default FindIdModal;
