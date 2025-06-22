import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

import RunnifyLoginModal from '../components/RunnifyLoginModal';
import FindIdModal from '../components/auth/FindIdModal';
import FindPasswordModal from '../components/auth/FindPasswordModal';
import SignupModal from '../components/SignupModal';

import useGoogleAuth from '../hooks/useGoogleAuth';
import useNaverAuth from '../hooks/useNaverAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

const MOCK_API = 'https://d47d7681-xxxx-xxxx-xxxx-xxxxxxxx.mock.pstmn.io';

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [isRunnifyLoginModalVisible, setIsRunnifyLoginModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'none' | 'findId' | 'findPw' | 'signup'>('none');

  // 회원가입용 상태
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { request: googleRequest, response: googleResponse, promptAsync: googlePrompt } = useGoogleAuth();
  const { request: naverRequest, response: naverResponse, promptAsync: naverPrompt } = useNaverAuth();

  useEffect(() => {
    if (googleResponse?.type === 'success') {
      const token = googleResponse.authentication?.accessToken;
      AsyncStorage.setItem('authToken', token || '');
      Alert.alert('Google 로그인 성공', `Access Token:\n${token}`);
      navigation.replace('Home');
    }
  }, [googleResponse]);

  useEffect(() => {
    const handleNaverLogin = async () => {
      if (naverResponse?.type === 'success') {
        const code = naverResponse.params.code;
        try {
          const response = await fetch(`${MOCK_API}/api/auth/naver`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
          });

          if (!response.ok) {
            throw new Error(`서버 오류: ${response.status}`);
          }

          const data = await response.json();
          await AsyncStorage.setItem('authToken', data.token);
          Alert.alert('Naver 로그인 성공', '토큰 저장 완료');
          navigation.replace('Home');
        } catch (error) {
          console.error('Naver 로그인 실패:', error);
          Alert.alert('Naver 로그인 실패', '토큰 요청 중 오류 발생');
        }
      }
    };

    handleNaverLogin();
  }, [naverResponse]);

  const handleStart = (type: string) => {
    if (type === 'Runnify') {
      setIsRunnifyLoginModalVisible(true);
    } else if (type === 'Google') {
      googlePrompt();
    } else if (type === 'Naver') {
      naverPrompt();
    } else {
      Alert.alert('알림', `${type} 로그인은 준비 중입니다.`);
    }
  };

  const handleRunnifyLoginSuccess = () => {
    setIsRunnifyLoginModalVisible(false);
    navigation.replace('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Runnify</Text>
        <TouchableOpacity onPress={() => handleStart('Runnify')}>
          <Image source={require('../../assets/runnify.png')} style={styles.imageButton} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleStart('Google')}>
          <Image source={require('../../assets/google.png')} style={styles.imageButton} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleStart('Kakao')}>
          <Image source={require('../../assets/kakao.png')} style={styles.imageButton} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleStart('Naver')}>
          <Image source={require('../../assets/naver.png')} style={styles.imageButton} />
        </TouchableOpacity>
      </View>

      <RunnifyLoginModal
        isVisible={isRunnifyLoginModalVisible}
        onClose={() => setIsRunnifyLoginModalVisible(false)}
        onLoginSuccess={handleRunnifyLoginSuccess}
        onPressFindId={() => {
          setIsRunnifyLoginModalVisible(false);
          setModalType('findId');
        }}
        onPressFindPw={() => {
          setIsRunnifyLoginModalVisible(false);
          setModalType('findPw');
        }}
      />

      <FindIdModal
        isVisible={modalType === 'findId'}
        onClose={() => setModalType('none')}
      />

      <FindPasswordModal
        visible={modalType === 'findPw'}
        onClose={() => setModalType('none')}
      />

      <SignupModal
        visible={modalType === 'signup'}
        onClose={() => setModalType('none')}
        onSignupSuccess={() => {
          setModalType('none');
          Alert.alert('회원가입 완료', '로그인 후 서비스를 이용해 주세요.');
        }}
        email={email}
        setEmail={setEmail}
        name={name}
        setName={setName}
        password={password}
        setPassword={setPassword}
        nickname={nickname}
        setNickname={setNickname}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: width * 0.5,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  imageButton: {
    width: width * 0.6,
    height: 48,
    resizeMode: 'contain',
    marginBottom: 16,
  },
});

export default LoginScreen;
