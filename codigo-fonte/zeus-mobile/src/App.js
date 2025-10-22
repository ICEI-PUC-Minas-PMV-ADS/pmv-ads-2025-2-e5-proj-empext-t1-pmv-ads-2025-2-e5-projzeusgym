import React from 'react';
import HomeScreen from './pages/HomeScreen'; // Importa a nova tela de treinos
import { StyleSheet, View } from 'react-native';

// Este componente App.js é o ponto de entrada principal.
// No futuro, ele será substituído pelo React Navigation.
export default function App() {
  return (
    // <View style={styles.container}>
    // Renderiza a HomeScreen (Meus Treinos)
    <HomeScreen />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
