import { ImageBackground, StyleSheet, View } from 'react-native';
import LoginForm from '../components/Form/LoginForm';
import { IMAGES } from '../constants/images';

export default function LoginPage() {
  const handleClose = () => {
    console.log('닫기 실행됨');
  };

  const handleNavigate = (view: 'signUp' | 'findId' | 'findPw') => {
    console.log(`navigate to ${view}`);
    // 또는 navigation.navigate('SignUpScreen') 등으로 라우팅
  };

  return (
    <ImageBackground source={IMAGES.bg} style={styles.background}>
      <View style={styles.overlay}>
        <LoginForm onClose={handleClose} onNavigate={handleNavigate} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});
