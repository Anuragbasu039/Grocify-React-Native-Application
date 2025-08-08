import React from 'react';
import { StyleSheet, View } from 'react-native';
import GrocifySplashScreen from '../../components/GrocifySplashScreen';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <GrocifySplashScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
