import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';

interface SignupStep2Props {
  weight: string;
  setWeight: (val: string) => void;
  height: string;
  setHeight: (val: string) => void;
  runningType: string;
  setRunningType: (val: string) => void;
  onNext?: () => void;
  onBack?: () => void;
}

const runningTypes = [
  '조깅',
  '하프마라톤',
  '러닝',
  '트레이닝러닝',
  '인터벌 트레이닝',
];

const SignupStep2: React.FC<SignupStep2Props> = ({
  weight,
  setWeight,
  height,
  setHeight,
  runningType,
  setRunningType,
  onNext,
  onBack,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>신체 정보 및 러닝 타입</Text>

      <TextInput
        style={styles.input}
        placeholder="체중 (kg)"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="키 (cm)"
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
      />

      <Text style={styles.subtitle}>러닝 타입 선택</Text>
      <FlatList
        data={runningTypes}
        keyExtractor={(item) => item}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.runningTypeOption,
              runningType === item && styles.selectedType,
            ]}
            onPress={() => setRunningType(item)}
          >
            <Text
              style={[
                styles.optionText,
                runningType === item && styles.selectedText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={onBack}>
          <Text style={styles.buttonText}>이전</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onNext}>
          <Text style={styles.buttonText}>다음</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  subtitle: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  runningTypeOption: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: '#eee',
    borderRadius: 20,
    marginRight: 10,
  },
  selectedType: {
    backgroundColor: '#1E2D4D',
  },
  optionText: {
    color: '#333',
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#1E2D4D',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SignupStep2;
