import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    SafeAreaView,
    ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// URL base da sua API (use o mesmo do LoginScreen)
const API_BASE_URL = 'http://192.168.1.116:3000'; 

export default function ChangePasswordScreen({ navigation, route }) {
    const { tempToken } = route.params; 
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChangePassword = async () => {
        if (!newPassword || !confirmPassword) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert('Erro', 'A nova senha e a confirmação não coincidem.');
            return;
        }

        // Adicione validação de senha forte aqui (ex: 8 caracteres, letras e números)
        if (newPassword.length < 6) { 
            Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
                method: 'POST', // Seu endpoint deve usar PUT ou POST
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tempToken}`, 
                },
                body: JSON.stringify({ newPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert('Sucesso', 'Senha alterada com sucesso! Faça login novamente com sua nova senha.');
                navigation.navigate('LoginScreen'); 
            } else {
                // Erro (ex: token inválido/expirado, falha na validação)
                Alert.alert('Erro', data.message || 'Falha ao alterar a senha. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro de rede/servidor:', error);
            Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={ChangePasswordScreenStyle.container}>
            <View style={ChangePasswordScreenStyle.content}>
                <Text style={ChangePasswordScreenStyle.title}>🔒 Troca de Senha Obrigatória</Text>
                <Text style={ChangePasswordScreenStyle.subtitle}>
                    Esta é sua primeira vez acessando ou sua senha inicial. Por favor, defina uma nova senha.
                </Text>

                {/* Campo Nova Senha */}
                <TextInput
                    style={ChangePasswordScreenStyle.input}
                    placeholder="Nova Senha"
                    placeholderTextColor="#999"
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry
                    autoCapitalize="none"
                    editable={!isLoading}
                />

                {/* Campo Confirmação de Senha */}
                <TextInput
                    style={ChangePasswordScreenStyle.input}
                    placeholder="Confirme a Nova Senha"
                    placeholderTextColor="#999"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    autoCapitalize="none"
                    editable={!isLoading}
                />

                {/* Botão Trocar Senha */}
                <TouchableOpacity
                    style={ChangePasswordScreenStyle.button}
                    onPress={handleChangePassword}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={ChangePasswordScreenStyle.buttonText}>TROCAR SENHA</Text>
                    )}
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
}

const ChangePasswordScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#FF6600', // Laranja do seu tema
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});