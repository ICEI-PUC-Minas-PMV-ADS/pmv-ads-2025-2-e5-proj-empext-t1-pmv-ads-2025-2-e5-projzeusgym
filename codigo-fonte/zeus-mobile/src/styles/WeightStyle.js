import { StyleSheet } from 'react-native';

const WeightStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
     content: {
        flex: 1,
        paddingHorizontal: 30,
        paddingTop: 50,
        alignItems: 'center',
    },
    titleText: {
        fontSize: 40,
        fontWeight: '900', 
        color: '#000',
        marginBottom: 40,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: {
            width: 3, height: 3
        } ,
        textShadowRadius: 5,
    },
    inputCard: {
        backgroundColor: '#D3D3D3', 
        borderRadius: 20,
        paddingHorizontal: 60,
        paddingVertical: 50,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        height: 80, 
    },
    weightInput: {
        backgroundColor: '#fff',
        borderRadius: 50,
        width: '90%',
        height: 50,
        paddingHorizontal: 80,
        textAlign: 'center',
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333',
    },
    saveButton: {
        backgroundColor: '#FF8C00', 
        borderRadius: 25,
        paddingVertical: 15,
        paddingHorizontal: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    });

export default WeightStyle;