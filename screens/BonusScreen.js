// screens/BonusScreen.js
import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

const BonusScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Tela de Bônus</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default BonusScreen;
