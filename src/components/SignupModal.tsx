
import React, { useState } from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import SignupStep1 from './auth/signup/SignupStep1';
import SignupStep2 from './auth/signup/SignupStep2';
import SignupStep3 from './auth/signup/SignupStep3';

interface SignupModalProps {
  visible: boolean;
  onClose: () => void;
  onSignupSuccess: () => void;
  email: string;
  setEmail: (val: string) => void;
  name: string;
  setName: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  nickname: string;
  setNickname: (val: string) => void;
  showPassword: boolean;
  setShowPassword: (val: boolean) => void;
}

const SignupModal: React.FC<SignupModalProps> = ({
  visible,
  onClose,
  onSignupSuccess,
  email,
  setEmail,
  name,
  setName,
  password,
  setPassword,
  nickname,
  setNickname,
  showPassword,
  setShowPassword,
}) => {
  const [step, setStep] = useState(1);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [runningType, setRunningType] = useState('');
  const [selectedPlace, setSelectedPlace] = useState('');
  const [selectedPathStyle, setSelectedPathStyle] = useState('');
  const [selectedIntensity, setSelectedIntensity] = useState('');
  const [additionalConsiderations, setAdditionalConsiderations] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const handleSignup = async () => {
    const userData = {
      email,
      password,
      name,
      nickname,
      height: Number(height),
      weight: Number(weight),
      runningType,
      preferencePlaces: selectedPlace,
      preferenceRoutes: selectedPathStyle,
      preferenceAvoids: selectedIntensity,
      preferenceEtcs: additionalConsiderations,
    };

    try {
      // await signupUser(userData);
      onSignupSuccess();
      onClose();
      setStep(1);
    } catch (err: any) {
      alert('회원가입 실패: ' + err.message);
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        {step === 1 && (
          <SignupStep1
            visible={visible}
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
            verificationCode={verificationCode}
            setVerificationCode={setVerificationCode}
            isVerified={isVerified}
            setIsVerified={setIsVerified}
            onClose={onClose}
            onSignupSuccess={onSignupSuccess}
            onNext={() => setStep(2)}
          />
        )}
        {step === 2 && (
          <SignupStep2
            height={height}
            setHeight={setHeight}
            weight={weight}
            setWeight={setWeight}
            runningType={runningType}
            setRunningType={setRunningType}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}
        {step === 3 && (
          <SignupStep3
            selectedPlace={selectedPlace}
            setSelectedPlace={setSelectedPlace}
            selectedPathStyle={selectedPathStyle}
            setSelectedPathStyle={setSelectedPathStyle}
            selectedIntensity={selectedIntensity}
            setSelectedIntensity={setSelectedIntensity}
            additionalConsiderations={additionalConsiderations}
            setAdditionalConsiderations={setAdditionalConsiderations}
            onNext={handleSignup}
            onBack={() => setStep(2)}
          />
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
  },
});

export default SignupModal;
