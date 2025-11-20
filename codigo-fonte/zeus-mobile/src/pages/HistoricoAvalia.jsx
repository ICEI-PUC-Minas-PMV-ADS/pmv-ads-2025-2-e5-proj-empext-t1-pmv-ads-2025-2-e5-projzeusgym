import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Buffer } from 'buffer';
import LogoZeus from '../../assets/Logo_zeus.png';
import HeaderStyle from '../styles/HeaderStyle';
import HistoricoStyle from '../styles/HistoricoStyle';

const HistoricoAvalia = ({ navigation }) => {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserAssessments();
  }, []);

  const fetchUserAssessments = async () => {
    try {
      // helpers to read user and token from AsyncStorage
      
      const getAuthToken = async () => {
        const token = await AsyncStorage.getItem('userToken') || await AsyncStorage.getItem('authToken');
        if (!token) throw new Error('Token não encontrado no armazenamento local');
        return token;
      };

      const token = await getAuthToken();

      const response = await fetch(
        `https://teste-zeusgym-50b8de268016.herokuapp.com/api/student/assessments`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        const assessmentsWithFiles = data.filter(assessment => assessment.filePath);
        setAssessments(assessmentsWithFiles);
      } else {
        Alert.alert('Erro', 'Falha ao carregar avaliações');
      }
    } catch (error) {
      console.error('Erro ao buscar avaliações:', error);
      Alert.alert('Erro', error.message || 'Erro ao conectar com o servidor');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (assessment) => {
  try {
    setLoading(true);
    const token = await AsyncStorage.getItem('userToken') || await AsyncStorage.getItem('authToken');
    if (!token) throw new Error('Token não encontrado');

    const url = `https://teste-zeusgym-50b8de268016.herokuapp.com/api/student/assessments/${assessment.id}/download`;
    console.log('Download URL:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/pdf'
      }
    });

    if (!response.ok) {
      const txt = await response.text();
      throw new Error(`Download falhou: ${response.status} - ${txt.substring(0,200)}`);
    }

    const ct = response.headers.get('content-type');
    console.log('content-type:', ct);

    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');

    const ext = (assessment.fileName && assessment.fileName.split('.').pop()) || 'pdf';
    const fileUri = `${FileSystem.cacheDirectory}${assessment.id || Date.now()}.${ext}`;

    await FileSystem.writeAsStringAsync(fileUri, base64, { encoding: FileSystem.EncodingType.Base64 });

    const info = await FileSystem.getInfoAsync(fileUri);
    console.log('Saved file info:', info);

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri);
    } else {
      Alert.alert('Sucesso', `Arquivo salvo: ${fileUri}`);
    }
  } catch (err) {
    console.error('Erro ao baixar arquivo:', err);
    Alert.alert('Erro', err.message);
  } finally {
    setLoading(false);
  }
};

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  if (loading) {
    return (
      <View style={HistoricoStyle.container}>
        <StatusBar style="light" backgroundColor="#FF8C00" />
        <View style={HeaderStyle.header}>
          <TouchableOpacity 
            style={HeaderStyle.menuButton} 
            onPress={() => navigation.openDrawer()}
          >
            <Text style={HeaderStyle.menuText}>☰</Text>
          </TouchableOpacity>
          <Image source={LogoZeus} style={HeaderStyle.logoPlaceholder} />
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#FF8C00" />
        </View>
      </View>
    );
  }

  return (
    <View style={HistoricoStyle.container}>
      <StatusBar style="light" backgroundColor="#FF8C00" />

      <View style={HeaderStyle.header}>
        <TouchableOpacity 
          style={HeaderStyle.menuButton} 
          onPress={() => navigation.openDrawer()}
        >
          <Text style={HeaderStyle.menuText}>☰</Text>
        </TouchableOpacity>
        <Image source={LogoZeus} style={HeaderStyle.logoPlaceholder} />
      </View>

      <ScrollView style={HistoricoStyle.content}>
        <Text style={HistoricoStyle.titleText}>Meus Documentos</Text>
        
        {assessments.length === 0 ? (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <Text style={{ fontSize: 16, color: '#666', marginTop: 20 }}>
              Nenhum documento disponível
            </Text>
          </View>
        ) : (
          assessments.map((assessment) => (
            <TouchableOpacity 
              key={assessment.id}
              style={{
                backgroundColor: '#fff',
                borderRadius: 12,
                padding: 16,
                marginHorizontal: 16,
                marginVertical: 8,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3
              }}
              onPress={() => handleDownload(assessment)}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 4 }}>
                    📄 {assessment.fileName}
                  </Text>
                  <Text style={{ fontSize: 12, color: '#999' }}>
                    {formatDate(assessment.assessmentDate)}
                  </Text>
                </View>
                <Text style={{ fontSize: 24, marginLeft: 12 }}>📥</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default HistoricoAvalia;