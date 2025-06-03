import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { STRINGS } from '../../constants/strings';

export default function LogoWithSubtitle() {
  return (
    <>
      <Text style={styles.title}>Runnify</Text>
      <Text style={styles.subtitle}>{STRINGS.tagline}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 42,
    color: '#fff',
    fontFamily: 'serif',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 24,
  },
});
