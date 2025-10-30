import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';

import HomeScreen from './pages/HomeScreen';
import RegistrarPeso from './pages/RegistrarPeso'; 

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
     <Drawer.Navigator
        initialRouteName="Home"
        // Configurações globais do Drawer
        screenOptions={{
          headerShown: true, 
          headerStyle: {
            backgroundColor: '#FF8C00', 
          },
          headerTintColor: '#fff', 
          drawerActiveTintColor: '#FF8C00', 
          drawerInactiveTintColor: '#333',
        }}       
      >
      <Drawer.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Início', headerShown: false,
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }} 
        />
       <Drawer.Screen 
          name="RegistrarPeso" 
          component={RegistrarPeso} 
          options={{ title: 'Registrar Peso', headerShown: false,
            drawerIcon: ({ color, size }) => (
              <Ionicons name="scale-outline" size={size} color={color} /> 
            ),
           }} 
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}