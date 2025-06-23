// app/user/login.tsx
import { runnifyloginUser } from '@/api/user/membership';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  // 로그인 하기
  const submitLogin = async () => {
    console.log('제출');

    // 테스트 계정일 경우 무조건 로그인 성공
    if (email === 'qqqq' && password === '1111') {
      Alert.alert('로그인 성공', '테스트 계정으로 로그인되었습니다.');
      router.push('/setting/settings'); // settings 라우터로 이동
      return;
    }

    try {
      const response = await runnifyloginUser(email, password);
      router.push('/setting/settings'); // 로그인 성공 시에도 settings로 이동
    } catch (error) {
      console.log(error);
      Alert.alert('로그인 실패', '아이디 또는 비밀번호를 확인하세요.');
      setError(true);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
      <View style={styles.formContainer}>
        <View style={styles.formHeader}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.headerText}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>Runnify로 로그인</Text>
        </View>

        <View style={styles.formContent}>
          <View style={styles.formLabel}>
            <Text style={styles.inputLabelText}>아이디</Text>
            <TextInput
              style={styles.formInput}
              placeholder="여기에 입력하세요"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <View style={styles.formLabel}>
            <Text style={styles.inputLabelText}>비밀번호</Text>
            <TextInput
              style={styles.formInput}
              placeholder="여기에 입력하세요"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <View style={styles.formAlter}>
            <TouchableOpacity onPress={() => router.push('/user/membership')}>
              <Text>회원가입</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/user/findId')}>
              <Text>아이디 찾기</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/user/findPassword')}>
              <Text>비밀번호 찾기</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.formButton} onPress={submitLogin}>
            <Text style={styles.formButtonText}>로그인하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.2)',
    flexGrow: 1,
  },
  formContainer: {
    borderRadius: 21,
    backgroundColor: 'white',
    padding: 30,
    gap: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formHeader: {
    flexDirection: 'row',
    width: '100%',
    gap: 30,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
  },
  formContent: {
    width: '100%',
    gap: 30,
  },
  inputLabelText: {
    fontSize: 13,
    marginHorizontal: 5,
  },
  formLabel: {
    gap: 10,
  },
  formInput: {
    height: 50,
    borderRadius: 6,
    borderWidth: 1,
    padding: 10,
  },
  formAlter: {
    flexDirection: 'row',
    gap: 15,
  },
  formButton: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: '#414B61',
    padding: 20,
  },
  formButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
