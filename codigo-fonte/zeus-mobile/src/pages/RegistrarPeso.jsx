import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AuthContext } from '../context/AuthContext';
import LogoZeus from '../../assets/Logo_zeus.png';
import HeaderStyle from '../styles/HeaderStyle.js';
import WeightStyle from '../styles/WeightStyle.js';
import FooterStyle from '../styles/FooterStyle.js';

const API_BASE_URL= 'https://teste-zeusgym-50b8de268016.herokuapp.com';
const HistoryItem = ({ item }) => {
  const formattedDate = new Date(item.date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <View style={WeightStyle.historyItem}>
      <Text style={[WeightStyle.historyText, { fontWeight: 'bold' }]}>{formattedDate}</Text>
      <Text style={WeightStyle.historyText}>{item.weight} kg</Text>
    </View>
  );
};

const RegistrarPeso = ({ navigation }) => {
  const { userToken, signOut } = useContext(AuthContext);
  const [currentWeight, setCurrentWeight] = useState('');
  const [weightHistory, setWeightHistory] = useState([]);

  // === Função para buscar o histórico de pesos ===
  const fetchWeightHistory = async () => {
    if (!userToken) {
      console.error("DEBUG | FALHA DE AUTENTICAÇÃO: Token ausente no contexto.");
      Alert.alert("Erro de Autenticação", "Sua sessão expirou. Faça login novamente.");
      signOut();
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/weight`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      });

      console.log("DEBUG | Status HTTP da Resposta:", response.status);

      if (response.status === 401 || response.status === 403) {
        console.warn("DEBUG | TOKEN INVÁLIDO OU EXPIRADO");
        Alert.alert("Sessão expirada", "Faça login novamente.");
        signOut();
        return;
      }

      const data = await response.json();
      console.log("DEBUG | Dados da Resposta fetch (JSON):", data);

      if (response.ok) {
        setWeightHistory(data);
      } else {
        Alert.alert("Erro", data.error || "Não foi possível carregar o histórico.");
      }
    } catch (error) {
      console.error("DEBUG | ERRO DE CONEXÃO/REDE (CATCH):", error);
      Alert.alert("Erro de Conexão", "Verifique sua conexão com a internet.");
    }
  };

  // === Função para salvar o peso ===
  const handleSaveWeight = async () => {
    const weightValue = parseFloat(currentWeight.replace(',', '.'));

    if (isNaN(weightValue) || weightValue <= 0) {
      Alert.alert("Erro", "Por favor, insira um peso válido e positivo.");
      return;
    }

    if (!userToken) {
      Alert.alert("Erro de Autenticação", "Sessão expirada. Faça login novamente.");
      signOut();
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/weight`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          weight: weightValue,
          date: new Date().toISOString(),
        }),
      });

      console.log("DEBUG | Status HTTP da Resposta:", response.status);

      if (response.status === 401 || response.status === 403) {
        console.warn("DEBUG | TOKEN INVÁLIDO AO SALVAR");
        Alert.alert("Sessão expirada", "Faça login novamente.");
        signOut();
        return;
      }

      const data = await response.json();
      console.log("DEBUG | Dados da Resposta handle salvar(JSON):", data);

      if (response.ok) {
        Alert.alert("Sucesso", "Peso registrado com sucesso!");
        setCurrentWeight('');
        fetchWeightHistory();
      } else {
        Alert.alert("Erro", data.error || "Ocorreu um erro ao salvar o peso.");
      }
    } catch (error) {
      console.error("Erro ao salvar peso:", error);
      Alert.alert("Erro de Conexão", "Não foi possível conectar ao servidor.");
    }
  };

  // === Buscar histórico ao carregar ou quando o token mudar ===
  useEffect(() => {
    if (userToken) {
      fetchWeightHistory();
    }
  }, [userToken]);

  return (
    <View style={WeightStyle.container}>
      <StatusBar style="light" backgroundColor="#FF8C00" />

      {/* Cabeçalho */}
      <View style={HeaderStyle.header}>
        <TouchableOpacity style={HeaderStyle.menuButton} onPress={() => navigation.openDrawer()}>
          <Text style={HeaderStyle.menuText}>☰</Text>
        </TouchableOpacity>
        <Image source={LogoZeus} style={HeaderStyle.logoPlaceholder} />
      </View>

      {/* Conteúdo */}
      <View style={WeightStyle.content}>
        <Text style={WeightStyle.titleText}>Registrar Peso</Text>

        {/* Campo de Input */}
        <View style={WeightStyle.inputCard}>
          <TextInput
            style={WeightStyle.weightInput}
            placeholder="INSIRA O PESO (ex: 75.5)"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={currentWeight}
            onChangeText={setCurrentWeight}
          />
        </View>

        {/* Botão Salvar */}
        <TouchableOpacity style={WeightStyle.saveButton} onPress={handleSaveWeight}>
          <Text style={WeightStyle.saveButtonText}>SALVAR</Text>
        </TouchableOpacity>

        <View style={{ height: 1, backgroundColor: '#ccc', marginVertical: 20 }} />

        {/* Histórico */}
        <Text style={WeightStyle.titleText}>Histórico</Text>
        {weightHistory.length > 0 ? (
          <FlatList
            data={weightHistory}
            renderItem={({ item }) => <HistoryItem item={item} />}
            keyExtractor={(item) => item.id.toString()}
            style={WeightStyle.historyList}
          />
        ) : (
          <Text style={WeightStyle.noHistoryText}>Nenhum peso registrado ainda.</Text>
        )}
      </View>

      {/* Rodapé */}
      <View style={FooterStyle.footer} />
    </View>
  );
};

export default RegistrarPeso;
