import { useState } from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import GoogleLoginButton from '../components/Button/GoogleLoginButton';
import KakaoLoginButton from '../components/Button/KakaoLoginButton';
import FindIDForm from '../components/Form/FindIDForm';
import FindPasswordForm from '../components/Form/FindPasswordForm';
import LoginForm from '../components/Form/LoginForm';
import SignUpStep1 from '../components/Form/SignUpStep1';
import SignUpStep2 from '../components/Form/SignUpStep2';
import SignUpStep3 from '../components/Form/SignUpStep3';
import { IMAGES } from '../constants/images';

export default function SplashScreen() {
  const [view, setView] = useState<'login' | 'signUp' | 'findId' | 'findPw' | null>(null);
  const [signUpStep, setSignUpStep] = useState<1 | 2 | 3>(1);

  const [account, setAccount] = useState({
    id: '',
    pw: '',
    email: '',
    nickname: '',
  });

  const [profile, setProfile] = useState({
    weight: '',
    height: '',
    type1: '',
    type2: '',
  });

  const resetSignUp = () => {
    setSignUpStep(1);
    setView(null);
    setAccount({ id: '', pw: '', email: '', nickname: '' });
    setProfile({ weight: '', height: '', type1: '', type2: '' });
  };

  return (
    <ImageBackground source={IMAGES.bg} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Runnify</Text>
          <Text style={styles.tagline}>당신의 일상에 걸음을</Text>

          <View style={styles.tags}>
            <Text style={styles.hashtag}>#런닝메이트</Text>
            <Text style={styles.hashtag}>#런닝루트</Text>
            <Text style={styles.hashtag}>#달리기습관</Text>
          </View>

          <TouchableOpacity onPress={() => setView('login')} style={styles.runnifyButton}>
            <Image source={IMAGES.runnify} style={styles.buttonImage} />
          </TouchableOpacity>

          <View style={styles.socialContainer}>
            <GoogleLoginButton />
            <KakaoLoginButton />
            <TouchableOpacity style={styles.socialButton}>
              <Image source={IMAGES.naver} style={styles.socialIcon} />
            </TouchableOpacity>
          </View>
        </View>

        {view === 'login' && (
          <View style={styles.loginOverlay}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setView(null)}>
              <Text style={styles.closeText}>×</Text>
            </TouchableOpacity>
            <LoginForm
              onClose={() => setView(null)}
              onNavigate={(target) => setView(target)}
            />
          </View>
        )}

        {view === 'findId' && (
          <View style={styles.loginOverlay}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setView(null)}>
              <Text style={styles.closeText}>×</Text>
            </TouchableOpacity>
            <FindIDForm onClose={() => setView(null)} />
          </View>
        )}

        {view === 'findPw' && (
          <View style={styles.loginOverlay}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setView(null)}>
              <Text style={styles.closeText}>×</Text>
            </TouchableOpacity>
            <FindPasswordForm onClose={() => setView(null)} />
          </View>
        )}

        {view === 'signUp' && (
          <View style={styles.loginOverlay}>
            <TouchableOpacity style={styles.closeButton} onPress={resetSignUp}>
              <Text style={styles.closeText}>×</Text>
            </TouchableOpacity>

            {signUpStep === 1 && (
              <SignUpStep1
                data={account}
                onChange={setAccount}
                onNext={() => setSignUpStep(2)}
                onClose={resetSignUp}
              />
            )}
            {signUpStep === 2 && (
              <SignUpStep2
                data={profile}
                onChange={setProfile}
                onNext={() => setSignUpStep(3)}
                onBack={() => setSignUpStep(1)}
              />
            )}
            {signUpStep === 3 && (
              <SignUpStep3
                onStart={resetSignUp}
                onBack={() => setSignUpStep(2)}
              />
            )}
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  contentContainer: {
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
  },
  tagline: {
    fontSize: 18,
    color: '#fff',
  },
  tags: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 12,
  },
  hashtag: {
    backgroundColor: '#444',
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    fontSize: 14,
  },
  runnifyButton: {
    width: '100%',
    maxWidth: 300,
    height: 44,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: 12,
  },
  buttonImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  socialContainer: {
    marginTop: 0,
    gap: 12,
    alignItems: 'center',
    width: '100%',
  },
  socialButton: {
    width: '100%',
    maxWidth: 300,
    height: 44,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  socialIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  loginOverlay: {
    position: 'absolute',
    zIndex: 10,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 32,
    zIndex: 20,
  },
  closeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
});
