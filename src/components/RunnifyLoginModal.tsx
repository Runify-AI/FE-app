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
  ScrollView,
} from 'react-native';
import SignupStep1 from './auth/signup/SignupStep1';
import SignupStep2 from './auth/signup/SignupStep2';
import SignupStep3 from './auth/signup/SignupStep3';
import { loginUser, signupUser } from '../api/userService';


const { width } = Dimensions.get('window');

interface RunnifyLoginModalProps {
  isVisible: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
  onPressFindId: () => void;
  onPressFindPw: () => void;
}

const RunnifyLoginModal: React.FC<RunnifyLoginModalProps> = ({
  isVisible,
  onClose,
  onLoginSuccess,
  onPressFindId,
  onPressFindPw,
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [signupStep, setSignupStep] = useState(1);

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  // SignupStep1 상태
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  // SignupStep2 상태
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [runningType, setRunningType] = useState('');

  // SignupStep3 상태
  const [selectedPlace, setSelectedPlace] = useState('');
  const [selectedPathStyle, setSelectedPathStyle] = useState('');
  const [selectedIntensity, setSelectedIntensity] = useState('');
  const [additionalConsiderations, setAdditionalConsiderations] = useState('');

  const handleLogin = async () => {
    if (!userId || !password) {
      Alert.alert('입력 오류', '아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      const res = await loginUser(userId, password);
      Alert.alert('로그인 성공', res.message || '환영합니다!');
      onLoginSuccess();
    } catch (error: any) {
      Alert.alert('로그인 실패', error.message || '아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  const handleSignup = async () => {
    const payload = {
      email,
      password,
      name,
      nickName: nickname,
      height: Number(height),
      weight: Number(weight),
      runningType,
      preferences: {
        places: [selectedPlace],
        pathStyles: [selectedPathStyle],
        avoidPaths: [selectedIntensity],
        additionalOptions: [additionalConsiderations],
      },
      schedule: {
        days: [],
        startTime: '07:00',
        endTime: '08:00',
      },
    };

    try {
      await signupUser(payload);
      Alert.alert('회원가입 성공', '성공적으로 가입되었습니다.');
      setMode('login');
      setSignupStep(1);
    } catch (error: any) {
      Alert.alert('회원가입 실패', error.message || '회원가입 중 문제가 발생했습니다.');
    }
  };

  const renderSignupStep = () => {
    switch (signupStep) {
      case 1:
        return (
          <SignupStep1
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            nickname={nickname}
            setNickname={setNickname}
            verificationCode={verificationCode}
            setVerificationCode={setVerificationCode}
            isVerified={isVerified}
            setIsVerified={setIsVerified}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            onNext={() => setSignupStep(2)}
          />
        );
      case 2:
        return (
          <SignupStep2
            weight={weight}
            setWeight={setWeight}
            height={height}
            setHeight={setHeight}
            runningType={runningType}
            setRunningType={setRunningType}
            onBack={() => setSignupStep(1)}
            onNext={() => setSignupStep(3)}
          />
        );
      case 3:
        return (
          <SignupStep3
            selectedPlace={selectedPlace}
            setSelectedPlace={setSelectedPlace}
            selectedPathStyle={selectedPathStyle}
            setSelectedPathStyle={setSelectedPathStyle}
            selectedIntensity={selectedIntensity}
            setSelectedIntensity={setSelectedIntensity}
            additionalConsiderations={additionalConsiderations}
            setAdditionalConsiderations={setAdditionalConsiderations}
            onBack={() => setSignupStep(2)}
            onNext={handleSignup}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {mode === 'login' ? (
            <>
              <Text style={styles.title}>Runnify 로그인</Text>
              <TextInput
                placeholder="아이디"
                value={userId}
                onChangeText={setUserId}
                style={styles.input}
              />
              <TextInput
                placeholder="비밀번호"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
              />
              <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>로그인</Text>
              </TouchableOpacity>
              <View style={styles.linkContainer}>
                <TouchableOpacity onPress={onPressFindId}>
                  <Text style={styles.linkText}>아이디 찾기</Text>
                </TouchableOpacity>
                <Text style={styles.divider}>|</Text>
                <TouchableOpacity onPress={onPressFindPw}>
                  <Text style={styles.linkText}>비밀번호 찾기</Text>
                </TouchableOpacity>
                <Text style={styles.divider}>|</Text>
                <TouchableOpacity onPress={() => setMode('signup')}>
                  <Text style={styles.linkText}>회원가입</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <ScrollView style={{ width: '100%' }}>{renderSignupStep()}</ScrollView>
          )}
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
    maxHeight: '90%',
    borderRadius: 10,
    padding: 24,
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
  loginButton: {
    backgroundColor: '#2196f3',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 6,
    marginTop: 8,
    marginBottom: 16,
    alignSelf: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
  },
  linkText: {
    color: '#007aff',
    marginHorizontal: 4,
  },
  divider: {
    color: '#ccc',
  },
  closeText: {
    color: '#888',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default RunnifyLoginModal;
