import { getToken, removeToken } from '@/utils/auth';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Index() {
  return <MainPage />;
}

function MainPage() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const token = await getToken();
      console.log('token', token);
      setIsLogged(!!token);
    };
    checkLogin();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoHeader}>
        <View style={styles.header}>
          <Text style={styles.LogoText}>Runnify</Text>
          <Text style={styles.summaryText}>당신의 일상에 걸음을</Text>
        </View>
        <View style={styles.taglist}>
          <View style={styles.tag}><Text>#런닝메이트</Text></View>
          <View style={styles.tag}><Text>#러닝루트</Text></View>
          <View style={styles.tag}><Text>#달리기습관</Text></View>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <View style={styles.loginRow}>
          {!isLogged ? (
            <TouchableOpacity onPress={() => router.push('/user/login')} style={styles.loginButton}>
              <Text>로그인</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                onPress={() => {
                  removeToken();
                  setIsLogged(false);
                }}
                style={styles.loginButton}
              >
                <Text>로그아웃</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/')} style={styles.loginButton}>
                <Text>홈으로 이동</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        <View style={styles.textLinks}>
          <TouchableOpacity onPress={() => router.push('/user/membership')}>
            <Text style={styles.linkText}>회원가입</Text>
          </TouchableOpacity>
          <Text style={styles.separator}>|</Text>
          <TouchableOpacity onPress={() => router.push('/user/findId')}>
            <Text style={styles.linkText}>아이디 찾기</Text>
          </TouchableOpacity>
          <Text style={styles.separator}>|</Text>
          <TouchableOpacity onPress={() => router.push('/user/findPassword')}>
            <Text style={styles.linkText}>비밀번호 찾기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 20,
  },
  logoHeader: {
    flexDirection: 'column',
    gap: 10,
    alignItems: 'center',
  },
  taglist: {
    flexDirection: 'row',
    gap: 5,
  },
  tag: {
    borderRadius: 30,
    borderWidth: 1,
    padding: 8,
  },
  LogoText: {
    fontSize: 65,
  },
  summaryText: {
    fontSize: 35,
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 20,
  },
  loginButton: {
    borderRadius: 6,
    backgroundColor: '#E2DFD8',
    borderWidth: 1,
    padding: 18,
    alignItems: 'center',
    flex: 1,
    minWidth: 120,
  },
  textLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 10,
  },
  linkText: {
    color: '#007AFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  separator: {
    color: '#ccc',
    fontSize: 14,
  },
  bottomSection: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 40,
  },
});
