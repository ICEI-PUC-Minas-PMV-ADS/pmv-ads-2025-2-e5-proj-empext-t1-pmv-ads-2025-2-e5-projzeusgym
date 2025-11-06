// src/pages/TreinoDetalhes.jsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
//import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import TreinosStyles from '../styles/TreinosStyle';
import LogoZeus from '../../assets/Logo_zeus.png';

export default function TreinoDetalhes({ navigation }) {
  const route = useRoute();
  const { sheetId } = route.params;
  const [treino, setTreino] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTreino = async () => {
      try {
        const token =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInJvbGUiOiJhbHVubyIsImlhdCI6MTc2MjI5NzEyMiwiZXhwIjoxNzYyMzAwNzIyfQ.lG0FpVv-yrRwlXz8HD7o3KPeHiOj_lL5umqZZjnxWCo';

        const response = await axios.get(`http://localhost:3000/trainingsheets/${sheetId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTreino(response.data);
      } catch (error) {
        console.error('Erro ao carregar treino:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTreino();
  }, [sheetId]);

  if (loading) {
    return (
      <View style={[TreinosStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#FF8C00" />
      </View>
    );
  }

  if (!treino) {
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
          {treino.nome}
        </Text>

        <FlatList
          data={treino.exercises}
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
