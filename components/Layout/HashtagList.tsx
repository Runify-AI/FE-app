import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HashtagList() {
  return (
    <View style={styles.hashtags}>
      <Text style={styles.tag}>#런닝메이트</Text>
      <Text style={styles.tag}>#런닝루트</Text>
      <Text style={styles.tag}>#달리기습관</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hashtags: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 32,
  },
  tag: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
  },
});
