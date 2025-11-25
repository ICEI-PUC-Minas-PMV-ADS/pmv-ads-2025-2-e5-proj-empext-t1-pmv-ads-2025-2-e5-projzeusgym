// TreinosStyle.js
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const ORANGE = '#FF8C00'; // Cor Laranja Padrão (Visto no seu App.js)

const TreinosStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF', // Fundo branco
    },
    
    // --- HEADER E FOOTER PADRÃO ---
    header: {
         flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingTop: 40, // Ajuste para a barra de status
        paddingBottom: 10,
        backgroundColor: '#FF8C00', // Laranja do design
    },
    menuButton: {
        padding: 5,
    },
    menuIcon: {
       fontSize: 30,
        color: '#fff',
        fontWeight: 'bold',
    
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 5,
    },
    
    footer: {
        width: '100%',
        height: 40, // Altura comum para rodapé
        backgroundColor: ORANGE,
    },

    // --- CONTEÚDO ESPECÍFICO DE TREINOS ---
    content: {
        flex: 1, // Ocupa o espaço central
        paddingHorizontal: 30,
        paddingTop: 50,
        alignItems: 'center', // Centraliza os botões horizontalmente
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 40,
        textAlign: 'center',
    },

    // --- BOTÕES DE TREINO (A, B, C) ---
    treinoButton: {
        width: '100%',
        maxWidth: 300, 
        paddingVertical: 18,
        marginVertical: 15,
        borderRadius: 50,
        backgroundColor: '#E0E0E0', // Fundo cinza claro
        alignItems: 'center',
        justifyContent: 'center',
        
        // Sombra para dar o efeito 3D visto na imagem
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    buttonText: {
        fontSize: 35,
        fontWeight: 800,
        color: '#333',
    },
});

export default TreinosStyles;