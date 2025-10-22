import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './pages/HomeScreen';
import RegistrarPeso from './pages/RegistrarPeso'; 

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false, 
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="RegistrarPeso" component={RegistrarPeso} />
        {/* Adicione outras telas aqui (ex: CalcularIMC) */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}