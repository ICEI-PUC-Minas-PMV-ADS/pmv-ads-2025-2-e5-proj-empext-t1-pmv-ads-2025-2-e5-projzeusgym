// src/pages/TreinoDetalhes.jsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TreinosStyles from '../styles/TreinosStyle';
import LogoZeus from '../../assets/Logo_zeus.png';


export default function TreinoDetalhes({ navigation }) {
  const route = useRoute();
  const { treino } = route.params;
  const [treinoDetalhes, setTreinoDetalhes] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTreino = async () => {
      try {
        const getAuthToken = async () => {
          const token = await AsyncStorage.getItem('userToken') || await AsyncStorage.getItem('authToken');
          if (!token) throw new Error('Token não encontrado no armazenamento local');
          return token;
        };

        const token = await getAuthToken();
        
        const response = await fetch(`https://teste-zeusgym-50b8de268016.herokuapp.com/trainingsheets/${treino.id}`, {
          method: 'GET',
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });

        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setTreinoDetalhes(data);
      } catch (error) {
        console.error('Erro ao carregar treino:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTreino();
  }, [treino.id]);

  if (loading) {
    return (
      <View style={[TreinosStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#FF8C00" />
      </View>
    );
  }

  if (!treinoDetalhes) {
    return (
      <View style={[TreinosStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ fontSize: 18, color: '#555' }}>Treino não encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={TreinosStyles.container}>
      {/* HEADER */}
      <View style={TreinosStyles.header}>
        <TouchableOpacity style={TreinosStyles.menuButton} onPress={() => navigation.goBack()}>
          <Text style={TreinosStyles.menuIcon}>←</Text>
        </TouchableOpacity>
        <Image source={LogoZeus} style={TreinosStyles.logo} />
      </View>

      {/* CONTEÚDO */}
      <View style={{ flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#FF8C00', marginBottom: 15 }}>
          {treinoDetalhes.nome}
        </Text>

        <FlatList
          data={treinoDetalhes.exercises}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: '#f9f9f9',
                padding: 15,
                borderRadius: 10,
                marginBottom: 10,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
                elevation: 3,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>
                {item.nome}
              </Text>
              <Text>Séries: {item.TrainingSheetExercises.series}</Text>
              <Text>Repetições: {item.TrainingSheetExercises.repeticoes}</Text>
              <Text>Carga: {item.TrainingSheetExercises.carga}</Text>
              <Text>Descanso: {item.TrainingSheetExercises.descanso}</Text>
            </View>
          )}
        />
      </View>

      {/* FOOTER */}
      <View style={TreinosStyles.footer} />
    </View>
  );
}
