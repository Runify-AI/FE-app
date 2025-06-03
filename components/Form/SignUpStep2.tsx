import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface Props {
  data: {
    weight: string;
    height: string;
    type1: string;
    type2: string;
  };
  onChange: (data: Props['data']) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function SignUpStep2({ data, onChange, onNext, onBack }: Props) {
  const handleChange = (field: keyof Props['data'], value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handleNext = () => {
    const { weight, height, type1, type2 } = data;
    if (!weight || !height || !type1 || !type2) {
      Alert.alert('입력하지 않은 내용이 있습니다');
      return;
    }
    onNext();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>프로필 설정</Text>
      <Text style={styles.subtitle}>초기 정보를 토대로 추천해드립니다!</Text>

      <TextInput
        placeholder="kg 단위로 입력"
        value={data.weight}
        onChangeText={(v) => handleChange('weight', v)}
        style={styles.input}
      />
      <TextInput
        placeholder="cm 단위로 입력"
        value={data.height}
        onChangeText={(v) => handleChange('height', v)}
        style={styles.input}
      />
      <TextInput
        placeholder="선택해주세요 (런닝타입1)"
        value={data.type1}
        onChangeText={(v) => handleChange('type1', v)}
        style={styles.input}
      />
      <TextInput
        placeholder="선택해주세요 (런닝타입2)"
        value={data.type2}
        onChangeText={(v) => handleChange('type2', v)}
        style={styles.input}
      />

      <View style={styles.row}>
        <TouchableOpacity style={[styles.button, styles.backButton]} onPress={onBack}>
          <Text style={styles.buttonText}>이전단계로</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>다음단계로</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    width: 300,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#444',
    padding: 12,
    borderRadius: 6,
    width: '48%',
  },
  backButton: {
    backgroundColor: '#888',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});
