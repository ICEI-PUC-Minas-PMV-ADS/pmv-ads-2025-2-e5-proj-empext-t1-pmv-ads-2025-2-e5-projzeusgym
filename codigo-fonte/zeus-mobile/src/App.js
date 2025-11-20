import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthProvider, AuthContext } from './context/AuthContext';

// IMPORTAÇÕES DE TELAS
import CalcularIMC from './pages/CalcularImc';
import HomeScreen from './pages/HomeScreen';
import RegistrarPeso from './pages/RegistrarPeso';
import LoginScreen from './pages/LoginScreen';
import ChangePasswordScreen from './pages/ChangePasswordScreen';
import HistoricoAvalia from './pages/HistoricoAvalia';
import Treinos from './pages/Treinos';
import TreinoDetalhes from './pages/TreinosDetalhes';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// --- Drawer Principal (Após Login) ---
function AppDrawer() {
  const { signOut } = React.useContext(AuthContext);

  // Tela simples para o item de logout
  const LogoutScreen = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, color: '#333' }}>
        Clique em "Sair" no menu para encerrar a sessão.
      </Text>
    </View>
  );

  return (
    <Drawer.Navigator
      initialRouteName="Home"
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
        options={{
          title: 'Início',
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="RegistrarPeso"
        component={RegistrarPeso}
        options={{
          title: 'Registrar Peso',
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="scale-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="CalcularIMC"
        component={CalcularIMC}
        options={{
          title: 'Calcular IMC',
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="fitness-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="HistoricoAvalia"
        component={HistoricoAvalia}
        options={{
          title: 'Histórico de Avaliações',
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Treinos"
        component={Treinos}
        options={{
          title: 'Minhas Fichas de Treino',
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="TreinoDetalhes"
        component={TreinoDetalhes}
        options={{
          title: 'Detalhes do Treino',
          headerShown: false,
        }}
      />
      {/* Item de Logout */}
      <Drawer.Screen
        name="Logout"
        component={LogoutScreen}
        options={{
          title: 'Sair',
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <TouchableOpacity
              onPress={signOut}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
                paddingLeft: 10,
                width: '100%',
                marginTop: 15,
              }}
            >
              <Ionicons name="log-out-outline" size={size} color={color} />
              <Text
                style={{
                  color: color,
                  fontSize: 15,
                  marginLeft: 30,
                  fontWeight: 'bold',
                }}
              >
                Sair
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

// --- Stack de Autenticação (Antes do Login) ---
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
      />
    </Stack.Navigator>
  );
}

// --- Componente Principal ---
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  // Verifica o token salvo
  useEffect(() => {
    const checkToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('userToken');
        if (!storedToken || storedToken === 'undefined' || storedToken === 'null') {
          setUserToken(null);
        } else {
          setUserToken(storedToken);
        }
      } catch (e) {
        console.error('Falha ao restaurar o token', e);
        setUserToken(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkToken();
  }, []);

  // --- Contexto Unificado ---
  const authContext = useMemo(
    () => ({
      userToken,
      signIn: async (token) => {
        try {
          await AsyncStorage.setItem('userToken', token);
          setUserToken(token);
        } catch (e) {
          console.error('Erro ao salvar token:', e);
        }
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('userToken');
          setUserToken(null);
        } catch (e) {
          console.error('Falha ao remover o token:', e);
        }
      },
    }),
    [userToken]
  );

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}
      >
        <ActivityIndicator size="large" color="#FF8C00" />
        <Text style={{ marginTop: 10, color: '#555' }}>Carregando...</Text>
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {userToken ? <AppDrawer /> : <AuthStack />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
