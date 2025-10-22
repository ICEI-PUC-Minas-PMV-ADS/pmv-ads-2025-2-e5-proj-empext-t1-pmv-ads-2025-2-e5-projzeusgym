import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import HomeScreenStyle from '../styles/HomeScreenStyle.js';
import LogoZeus from '../../assets/Logo_zeus.png';


const MainButton = ({ label, onPress }) => (

    <TouchableOpacity style={HomeScreenStyle.button} onPress={onPress}>
        <Text style={HomeScreenStyle.buttonText}>{label}</Text>
    </TouchableOpacity>
);

const HomeScreen = () => {

    const handlePress = (buttonType) => {
        alert(`Você selecionou a opção ${buttonType}`);
        // No futuro, isso usará o React Navigation para ir para a tela do treino
    };

    return (
        <View style={HomeScreenStyle.container}>
            <StatusBar style="light" backgroundColor="#FF8C00" />

            {/* 1. Header (Cabeçalho Laranja) */}
            <View style={HomeScreenStyle.header}>
                <TouchableOpacity style={HomeScreenStyle.menuButton}>
                    {/* Ícone de Menu (Substituir por ícone real futuramente) */}
                    <Text style={HomeScreenStyle.menuText}>☰</Text>
                </TouchableOpacity>
                <Image
                    source={LogoZeus}
                    style={HomeScreenStyle.logoPlaceholder}
                />
            </View>

            {/* 2. Main Content (Conteúdo Principal) */}
            <View style={HomeScreenStyle.content}>
                <Text style={HomeScreenStyle.titleText}>Zeus Gym</Text>
                <MainButton label="Treinos" onPress={() => handlePress('Treinos')} />
                <MainButton label="Registar Peso" onPress={() => handlePress('Registar peso')} />
                <MainButton label="Calcular IMC" onPress={() => handlePress('Calcular IMC')} />
                <MainButton label="Avaliação Física" onPress={() => handlePress('Avaliação física')} />
            </View>

            {/* 3. Footer (Rodapé Laranja) */}
            <View style={HomeScreenStyle.footer} />
        </View>
    );
};

export default HomeScreen;