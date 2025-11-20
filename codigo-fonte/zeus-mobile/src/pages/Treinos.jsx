import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Image, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TreinosStyles from '../styles/TreinosStyle';
import LogoZeus from '../../assets/Logo_zeus.png';

const Treinos = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState('');
  const [fichas, setFichas] = useState([]);


   
          
  const carregarFichas = async () => {
    try {
      const getAuthToken = async () => {
        const token = await AsyncStorage.getItem('userToken') || await AsyncStorage.getItem('authToken');
        if (!token) throw new Error('Token não encontrado no armazenamento local');
        return token;
      };

      const token = await getAuthToken();
      
      const response = await fetch('https://teste-zeusgym-50b8de268016.herokuapp.com/trainingsheets', {
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
      setFichas(data);
      
      if (data.length === 0) {
        setMensagem('Nenhuma ficha de treino cadastrada.');
      }
    } catch (error) {
      console.error('Erro ao carregar fichas:', error);
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
