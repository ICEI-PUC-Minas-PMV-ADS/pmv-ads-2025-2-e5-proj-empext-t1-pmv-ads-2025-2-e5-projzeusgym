// src/App.js
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Ionicons from "@expo/vector-icons/Ionicons";

// Páginas
import HomeScreen from "./pages/HomeScreen";
import RegistrarPeso from "./pages/RegistrarPeso";
import CalcularIMC from "./pages/CalcularImc";
import Treinos from "./pages/Treinos";
import TreinoDetalhes from "./pages/TreinosDetalhes";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: "#FF8C00" },
        headerTintColor: "#fff",
        drawerActiveTintColor: "#FF8C00",
        drawerInactiveTintColor: "#333",
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Início",
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
          title: "Registrar Peso",
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
          title: "Calcular IMC",
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="fitness-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="MeusTreinos"
        component={Treinos}
        options={{
          title: "Meus Treinos",
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="barbell-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Drawer principal */}
        <Stack.Screen name="DrawerRoot" component={DrawerNavigator} />

        {/* Tela de detalhes de treino (fora do drawer) */}
        <Stack.Screen name="TreinoDetalhes" component={TreinoDetalhes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
