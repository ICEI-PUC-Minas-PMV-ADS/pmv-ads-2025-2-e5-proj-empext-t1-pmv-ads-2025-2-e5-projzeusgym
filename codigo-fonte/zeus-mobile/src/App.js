import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Importe suas telas
import CalcularIMC from './pages/CalcularImc';
import HomeScreen from './pages/HomeScreen';
import RegistrarPeso from './pages/RegistrarPeso';
import LoginScreen from './pages/LoginScreen';
import ChangePasswordScreen from './pages/ChangePasswordScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// --- 1. Navegador do Aplicativo Principal (Após Login) ---
function AppDrawer() {
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
      {/* 💡 Se você precisar de uma rota que não é do menu, use um Stack aqui (aninhamento) */}
    </Drawer.Navigator>
  );
}

// --- 2. Navegador de Autenticação (Login/Pré-Login) ---
function AuthStack({ setUserToken }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* 🚨 Esta é a tela inicial da aplicação! */}
      <Stack.Screen name="LoginScreen">
        {props => <LoginScreen {...props} setUserToken={setUserToken} />} 
      </Stack.Screen>
      <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
    </Stack.Navigator>
  );
}

// --- 3. Componente Principal que Condiciona a Renderização ---
export default function App() {
  // 💡 Estado de Autenticação Real: Verifica se o token existe
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

  React.useEffect(() => {
    const checkToken = async () => {
      let token;
      try {
        token = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.error('Falha ao restaurar o token', e);
      }
      setUserToken(token);
      setIsLoading(false);
    };

    checkToken();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      {/* Se houver token, mostra o Drawer. Caso contrário, mostra o Login Stack. */}
      {userToken ? (
        <AppDrawer />
      ) : (
        <AuthStack setUserToken={setUserToken} />
      )}
    </NavigationContainer>
  );
}