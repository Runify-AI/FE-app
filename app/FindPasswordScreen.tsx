import React from 'react';
import { StyleSheet, View } from 'react-native';
import FindPasswordForm from '../components/Form/FindPasswordForm';

export default function FindPasswordScreen() {
  const handleClose = () => {
    console.log('비밀번호 찾기 닫기');
    // 필요시 navigation.goBack() 또는 setView(null)
  };

  return (
    <View style={styles.container}>
      <FindPasswordForm onClose={handleClose} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000AA',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
