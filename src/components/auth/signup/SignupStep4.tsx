
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

interface SignupStep4Props {
  schedules: string[];
  setSchedules: (schedules: string[]) => void;
}

const SignupStep4: React.FC<SignupStep4Props> = ({ schedules, setSchedules }) => {
  const [newScheduleName, setNewScheduleName] = useState('');

  const handleAddSchedule = () => {
    const trimmed = newScheduleName.trim();
    if (trimmed && !schedules.includes(trimmed)) {
      setSchedules([...schedules, trimmed]);
      setNewScheduleName('');
    }
  };

  const handleRemoveSchedule = (name: string) => {
    setSchedules(schedules.filter((item) => item !== name));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>고정 스케쥴 추가</Text>
      <Text style={styles.description}>매일 반복되는 일정을 이름으로 추가하세요.</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="예: 헬스장, 회사, 아침운동"
          value={newScheduleName}
          onChangeText={setNewScheduleName}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddSchedule}>
          <Text style={styles.addButtonText}>추가</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={schedules}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.scheduleItem}>
            <Text>{item}</Text>
            <TouchableOpacity onPress={() => handleRemoveSchedule(item)}>
              <Text style={styles.removeText}>삭제</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>추가된 스케쥴이 없습니다.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  removeText: {
    color: 'red',
    fontSize: 13,
  },
});

export default SignupStep4;
