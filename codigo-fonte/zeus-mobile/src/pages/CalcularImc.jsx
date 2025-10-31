import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import LogoZeus from '../../assets/Logo_zeus.png';
import HeaderStyle from '../styles/HeaderStyle.js';
import WeightStyle from '../styles/WeightStyle.js';
import FooterStyle from '../styles/FooterStyle.js';

const CalcularIMC = ({ navigation }) => {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [resultado, setResultado] = useState(null);
  const [categoria, setCategoria] = useState('');

  const handlePesoChange = (text) => {
    setPeso(text.replace(/[^0-9.]/g, ''));
  };

  const handleAlturaChange = (text) => {
    setAltura(text.replace(/[^0-9.]/g, ''));
  };

  const calcularIMC = () => {
    if (!peso || !altura) {
      alert('Por favor, preencha peso e altura!');
      return;
    }

    const pesoNum = parseFloat(peso);
    const alturaNum = parseFloat(altura);

    if (isNaN(pesoNum) || isNaN(alturaNum)) {
      alert('Valores inválidos! Insira apenas números.');
      return;
    }

    const imc = (pesoNum / (alturaNum * alturaNum)).toFixed(2);
    setResultado(imc);

    let cat = '';
    if (imc < 18.5) cat = 'Abaixo do peso';
    else if (imc < 24.9) cat = 'Peso normal';
    else if (imc < 29.9) cat = 'Sobrepeso';
    else if (imc < 34.9) cat = 'Obesidade Grau I';
    else if (imc < 39.9) cat = 'Obesidade Grau II';
    else cat = 'Obesidade Grau III';
    setCategoria(cat);
  };

  return (
    <View style={WeightStyle.container}>
      <StatusBar style="light" backgroundColor="#FF8C00" />

      {/* Header */}
      <View style={HeaderStyle.header}>
        <TouchableOpacity style={HeaderStyle.menuButton} onPress={() => navigation.openDrawer()}>
          <Text style={HeaderStyle.menuText}>☰</Text>
        </TouchableOpacity>
        <Image source={LogoZeus} style={HeaderStyle.logoPlaceholder} />
      </View>

      {/* Conteúdo */}
      <View style={WeightStyle.content}>
        <Text style={WeightStyle.titleText}>Calcular IMC</Text>

        <View style={WeightStyle.inputCard}>
          <TextInput
            style={WeightStyle.weightInput}
            placeholder="INSIRA SEU PESO ATUAL (KG)"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={peso}
            onChangeText={handlePesoChange}
          />
        </View>

        <View style={WeightStyle.inputCard}>
          <TextInput
            style={WeightStyle.weightInput}
            placeholder="INSIRA SUA ALTURA (M)"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={altura}
            onChangeText={handleAlturaChange}
          />
        </View>

        <TouchableOpacity style={WeightStyle.saveButton} onPress={calcularIMC}>
          <Text style={WeightStyle.saveButtonText}>CALCULAR</Text>
        </TouchableOpacity>

        {resultado && (
          <View style={{ alignItems: 'center', marginTop: 10 }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#000' }}>IMC: {resultado}</Text>
            <Text style={{ fontSize: 18, color: '#333' }}>{categoria}</Text>
          </View>
        )}
      </View>

      {/* Footer */}
      <View style={FooterStyle.footer} />
    </View>
  );
};

export default CalcularIMC;
