import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import LogoZeus from '../../assets/Logo_zeus.png';
import { API_BASE_URL } from '@env';

export default function LoginScreen() {
  // ✅ Agora o login usa o contexto para autenticação
  const { signIn } = useContext(AuthContext);
  const navigation = useNavigation();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Função de login
  const handleLogin = async () => {
    if (!login || !password) {
      Alert.alert('Erro', 'Por favor, preencha o Login e a Senha.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.token) {
          Alert.alert('Sucesso', 'Login realizado com sucesso! Bem-vindo.');
          console.log('Token Recebido:', data.token);

          // ✅ Usa o contexto para salvar token e ativar o AppDrawer
          await signIn(data.token);
        }
      } else {
        if (response.status === 403 && data.tempToken) {
          Alert.alert('Atenção', data.message || 'Troca de senha obrigatória.');
          console.log('Temp Token para troca de senha:', data.tempToken);
          navigation.navigate('ChangePasswordScreen', {
            tempToken: data.tempToken,
          });
        } else {
          Alert.alert('Erro', data.message || 'Login ou senha incorretos.');
        }
      }
    } catch (error) {
      console.error('Erro de rede/servidor:', error);
      Alert.alert(
        'Erro',
        'Não foi possível conectar ao servidor. Verifique sua conexão.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={LoginScreenStyle.container}>
      {/* Header */}
      <View style={LoginScreenStyle.header} />

      {/* Corpo */}
      <View style={LoginScreenStyle.loginBox}>
        <Image source={LogoZeus} style={LoginScreenStyle.logo} resizeMode="contain" />
        <Text style={LoginScreenStyle.gymName}>ZEUS GYM</Text>

        <TextInput
          style={LoginScreenStyle.input}
          placeholder="USUÁRIO"
          placeholderTextColor="#999"
          value={login}
          onChangeText={setLogin}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!isLoading}
        />

        <TextInput
          style={LoginScreenStyle.input}
          placeholder="SENHA"
          placeholderTextColor="#999"
          value={password}
          onChangeText={text => setPassword(text.trim())}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          editable={!isLoading}
        />

        <TouchableOpacity
          style={LoginScreenStyle.button}
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text style={LoginScreenStyle.buttonText}>
            {isLoading ? 'ENTRANDO...' : 'ENTRAR'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={LoginScreenStyle.forgotPassword}
          onPress={() =>
            Alert.alert('Ação', 'Navegar para a tela de recuperação de senha')
          }
          disabled={isLoading}
        >
          <Text style={LoginScreenStyle.forgotPasswordText}>
            Esqueci minha senha
          </Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={LoginScreenStyle.footer} />
    </View>
  );
}

const LoginScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    width: '100%',
    height: 60,
    backgroundColor: '#E57300',
  },
  footer: {
    width: '100%',
    height: 60,
    backgroundColor: '#E57300',
  },
  loginBox: {
    width: '80%',
    alignItems: 'center',
    marginTop: -30,
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  gymName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF8C00',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 15,
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#FF8C00',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPassword: {
    marginTop: 20,
    padding: 10,
  },
  forgotPasswordText: {
    color: '#555',
    fontSize: 14,
  },
});
