import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import GrocifySplashScreen from './components/GrocifySplashScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
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
