import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

type Props = {
  source: any;
  children: React.ReactNode;
};

export default function BackgroundOverlay({ source, children }: Props) {
  return <ImageBackground source={source} style={styles.background}>{children}</ImageBackground>;
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
});
