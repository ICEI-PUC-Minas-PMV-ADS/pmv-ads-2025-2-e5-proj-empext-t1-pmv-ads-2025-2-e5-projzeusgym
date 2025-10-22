import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RegistrarPeso = () => {
    return (
        <View style={styles.container}>
            <Text>Tela de Registrar Peso</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default RegistrarPeso;