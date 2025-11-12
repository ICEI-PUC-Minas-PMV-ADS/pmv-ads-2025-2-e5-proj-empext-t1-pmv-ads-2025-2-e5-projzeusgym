import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import LogoZeus from '../../assets/Logo_zeus.png';
import HeaderStyle from '../styles/HeaderStyle';
import HistoricoStyle from '../styles/HistoricoStyle';

const HistoricoAvalia = ({ navigation }) => {
  return (
    <View style={HistoricoStyle.container}>
      <StatusBar style="light" backgroundColor="#FF8C00" />

      {/* Header */}
      <View style={HeaderStyle.header}>
        <TouchableOpacity 
          style={HeaderStyle.menuButton} 
          onPress={() => navigation.openDrawer()}
        >
          <Text style={HeaderStyle.menuText}>☰</Text>
        </TouchableOpacity>
        <Image source={LogoZeus} style={HeaderStyle.logoPlaceholder} />
      </View>

      {/* Conteúdo */}
      <ScrollView style={HistoricoStyle.content}>
        <Text style={HistoricoStyle.titleText}>Histórico de Avaliações</Text>
        
        {/* Exemplo de card de avaliação */}
        <View style={HistoricoStyle.avaliacaoCard}>
          <Text style={HistoricoStyle.dataText}>10/11/2025</Text>
          <View style={HistoricoStyle.medidasContainer}>
            <Text style={HistoricoStyle.medidaText}>Peso: 75kg</Text>
            <Text style={HistoricoStyle.medidaText}>IMC: 24.5</Text>
            <Text style={HistoricoStyle.medidaText}>BF: 18%</Text>
            <Text style={HistoricoStyle.medidaText}>Altura: 1.75m</Text>
            <Text style={HistoricoStyle.medidaText}>Massa Muscular: 30%</Text>
            <Text style={HistoricoStyle.medidaText}>Peito (cm): 100</Text>
             <Text style={HistoricoStyle.medidaText}>Cintura (cm): 100</Text>
            <Text style={HistoricoStyle.medidaText}>Quadril (cm): 80</Text>
            <Text style={HistoricoStyle.medidaText}>Coxa (cm): 67</Text>
            <Text style={HistoricoStyle.medidaText}>Panturrilha (cm):45</Text>
            <Text style={HistoricoStyle.medidaText}>Pescoço (cm): 43</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HistoricoAvalia;