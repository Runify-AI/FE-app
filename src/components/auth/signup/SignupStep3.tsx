import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';

interface SignupStep3Props {
  selectedPlace: string;
  setSelectedPlace: (val: string) => void;
  selectedPathStyle: string;
  setSelectedPathStyle: (val: string) => void;
  selectedIntensity: string;
  setSelectedIntensity: (val: string) => void;
  additionalConsiderations: string;
  setAdditionalConsiderations: (val: string) => void;
  onNext?: () => void;
  onBack?: () => void;
}

const places = ['상관없음', '공원', '카페', '강변/하천'];
const pathStyles = [
  '상관없음',
  '빠른 길 우선',
  '경치 좋은 길',
  '러닝 / 운동 경로',
  '조용한 길',
];
const avoidPaths = [
  '상관없음',
  '언덕 / 경사로',
  '계단',
  '어두운 길',
  '인적이 드문 곳',
];
const additionalOptions = [
  '상관없음',
  '반려동물 동반',
  '휠체어/유모차 접근성',
  '편의시설 경유',
];

const renderOption = (
  data: string[],
  selected: string,
  onSelect: (val: string) => void
) => (
  <FlatList
    data={data.map((item) => ({ key: item }))}
    horizontal
    renderItem={({ item }) => (
      <TouchableOpacity
        style={[
          styles.optionButton,
          selected === item.key && styles.selectedButton,
        ]}
        onPress={() => onSelect(item.key)}
      >
        <Text
          style={[
            styles.optionText,
            selected === item.key && styles.selectedText,
          ]}
        >
          {item.key}
        </Text>
      </TouchableOpacity>
    )}
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{ marginBottom: 16 }}
  />
);

const SignupStep3: React.FC<SignupStep3Props> = ({
  selectedPlace,
  setSelectedPlace,
  selectedPathStyle,
  setSelectedPathStyle,
  selectedIntensity,
  setSelectedIntensity,
  additionalConsiderations,
  setAdditionalConsiderations,
  onNext,
  onBack,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>선호도 선택</Text>

      <Text style={styles.subtitle}>장소</Text>
      {renderOption(places, selectedPlace, setSelectedPlace)}

      <Text style={styles.subtitle}>경로 스타일</Text>
      {renderOption(pathStyles, selectedPathStyle, setSelectedPathStyle)}

      <Text style={styles.subtitle}>피하고 싶은 경로</Text>
      {renderOption(avoidPaths, selectedIntensity, setSelectedIntensity)}

      <Text style={styles.subtitle}>추가 고려사항</Text>
      {renderOption(additionalOptions, additionalConsiderations, setAdditionalConsiderations)}

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={onBack}>
          <Text style={styles.buttonText}>이전</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onNext}>
          <Text style={styles.buttonText}>가입 완료</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  optionButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: '#eee',
    borderRadius: 20,
    marginRight: 10,
  },
  selectedButton: {
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

export default SignupStep3;
