import { View, Text, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import HomeScreenStyle from '../styles/HomeScreenStyle.js';
import LogoZeus from '../../assets/Logo_zeus.png';


const MainButton = ({ label, onPress }) => (

    <TouchableOpacity style={HomeScreenStyle.button} onPress={onPress}>
        <Text style={HomeScreenStyle.buttonText}>{label}</Text>
    </TouchableOpacity>
);

const routeMap = {
    //'Treinos': 'TreinosScreen', // Colocar nome correto da rota
    'Registar Peso': 'RegistrarPeso',
    //'Calcular IMC': 'CalcularIMCScreen', // Colocar nome correto da rota
    //'Avaliação Física': 'AvaliacaoFisicaScreen', // Colocar nome correto da rota
};

const HomeScreen = ({ navigation }) => {

    const handlePress = (buttonType) => {

        const routeName = routeMap[buttonType];

        if (routeName) {
            navigation.navigate(routeName);
        } else {
            alert(`A rota para "${buttonType}" não foi encontrada no mapa.`);
        }
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
                <MainButton label="Registar Peso" onPress={() => handlePress('Registar Peso')} />
                <MainButton label="Calcular IMC" onPress={() => handlePress('Calcular IMC')} />
                <MainButton label="Avaliação Física" onPress={() => handlePress('Avaliação física')} />
            </View>

            {/* 3. Footer (Rodapé Laranja) */}
            <View style={HomeScreenStyle.footer} />
        </View>
    );
};

export default HomeScreen;