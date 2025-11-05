import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Image, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import TreinosStyles from '../styles/TreinosStyle';
import LogoZeus from '../../assets/Logo_zeus.png';
import axios from 'axios';

const Treinos = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState('');
  const [fichas, setFichas] = useState([]);

  // Token de teste (aluno)
  const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInJvbGUiOiJhbHVubyIsImlhdCI6MTc2MjI5NzEyMiwiZXhwIjoxNzYyMzAwNzIyfQ.lG0FpVv-yrRwlXz8HD7o3KPeHiOj_lL5umqZZjnxWCo';

  const carregarFichas = async () => {
    try {
      const response = await axios.get('http://localhost:3000/trainingsheets', {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });

      setFichas(response.data);
      if (response.data.length === 0) {
        setMensagem('Nenhuma ficha de treino cadastrada.');
      }
    } catch (error) {
      console.log(error);
      setMensagem('Erro ao carregar fichas de treino.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarFichas();
  }, []);

  const abrirDetalhes = (ficha) => {
    navigation.navigate('TreinoDetalhes', { treino: ficha });
  };

  return (
    <View style={TreinosStyles.container}>
      <StatusBar style="light" backgroundColor="#FF8C00" />

      {/* HEADER */}
      <View style={TreinosStyles.header}>
        <TouchableOpacity style={TreinosStyles.menuButton} onPress={() => navigation.openDrawer()}>
          <Text style={TreinosStyles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Image source={LogoZeus} style={TreinosStyles.logo} />
      </View>

      {/* CONTEÚDO */}
      <ScrollView contentContainerStyle={TreinosStyles.content}>
        <Text style={TreinosStyles.title}>Minhas Fichas</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#FF8C00" style={{ marginTop: 20 }} />
        ) : fichas.length > 0 ? (
          fichas.map((ficha) => (
            <TouchableOpacity
              key={ficha.id}
              style={TreinosStyles.treinoButton}
              onPress={() => abrirDetalhes(ficha)}
            >
              <Text style={TreinosStyles.buttonText}>{ficha.nome}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={{ marginTop: 20, color: 'gray', fontSize: 18, textAlign: 'center' }}>
            {mensagem}
          </Text>
        )}
      </ScrollView>

      {/* FOOTER */}
      <View style={TreinosStyles.footer} />
    </View>
  );
};

export default Treinos;
