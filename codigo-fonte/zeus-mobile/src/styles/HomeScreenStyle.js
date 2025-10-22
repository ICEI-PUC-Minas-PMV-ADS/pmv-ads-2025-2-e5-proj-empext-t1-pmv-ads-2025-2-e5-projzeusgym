import {StyleSheet} from 'react-native';
import HomeScreen from '../pages/HomeScreen';

const HomeScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    // --- HEADER E FOOTER ---
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingTop: 40, // Ajuste para a barra de status
        paddingBottom: 10,
        backgroundColor: '#FF8C00', // Laranja do design
    } ,

    menuButton: {
        padding: 5,
    } ,

    menuText: {
        fontSize: 30,
        color: '#fff',
        fontWeight: 'bold',
    } ,

    logoPlaceholder: {
        width: 50,
        height: 50,
        borderRadius: 5,
    } ,

    footer: {
        height: 40,
        backgroundColor: '#FF8C00', // Laranja do design
    } ,

    // --- CONTENT ---//
    content: {
        flex: 1,
        paddingHorizontal: 30,
        paddingTop: 50,
        alignItems: 'center',
    },

    titleText: {
        fontSize: 40,
        fontWeight: '900', // Extra bold
        color: '#000',
        marginBottom: 40,
        // Efeito de sombra no texto (simulando a sombra da imagem)
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: {
            width: 3, height: 3
        } ,
        textShadowRadius: 5,
    },

    // --- BUTTONS ---
    button: {
        width: '100%',
        maxWidth: 300,
        backgroundColor: '#A9A9A9', // Cinza do design
        borderRadius: 50,
        paddingVertical: 18,
        marginVertical: 15,
        alignItems: 'center',

        // Sombra (Shadow) para dar o efeito 3D
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        } ,
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12, // Propriedade de sombra para Android
    },

    buttonText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
    } ,
});

export default HomeScreenStyle;