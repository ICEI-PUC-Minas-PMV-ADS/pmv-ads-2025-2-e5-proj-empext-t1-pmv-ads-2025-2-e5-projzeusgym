import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import LogoZeus from '../../assets/Logo_zeus.png';
import HeaderStyle from '../styles/HeaderStyle.js';
import WeightStyle from '../styles/WeightStyle.js';
import FooterStyle from '../styles/FooterStyle.js';


const MainButton = ({ label, onPress }) => (

    <TouchableOpacity style={HeaderStyle.button} onPress={onPress}>
        <Text style={HeaderStyle.buttonText}>{label}</Text>
    </TouchableOpacity>
);

const RegistrarPeso = ({ navigation }) => {
    const [currentWeight, setCurrentWeight] = useState('');

    return (
        <View style={WeightStyle.container}>
            <StatusBar style="light" backgroundColor="#FF8C00" />

            {/* 1. Header (Cabeçalho Laranja) */}
            <View style={HeaderStyle.header}>
                <TouchableOpacity style={HeaderStyle.menuButton}
                    onPress={() => navigation.openDrawer()}>
                    {/* Ícone de Menu (Substituir por ícone real futuramente) */}
                    <Text style={HeaderStyle.menuText}>☰</Text>
                </TouchableOpacity>
                <Image
                    source={LogoZeus}
                    style={HeaderStyle.logoPlaceholder}
                />
            </View>
            <View style={WeightStyle.content}>
                <Text style={WeightStyle.titleText}>Registrar Peso</Text>
                <View style={WeightStyle.inputCard}>
                    <TextInput
                        style={WeightStyle.weightInput}
                        placeholder="INSIRA O PESO"
                        placeholderTextColor="#999"
                        keyboardType="numeric"
                        value={currentWeight}
                        onChangeText={setCurrentWeight}
                    />
                </View>
                <TouchableOpacity 
                style={WeightStyle.saveButton}
            >
                <Text style={WeightStyle.saveButtonText}>SALVAR</Text>
            </TouchableOpacity>
            </View>
            <View style={FooterStyle.footer} />
        </View>
    );
};

export default RegistrarPeso;