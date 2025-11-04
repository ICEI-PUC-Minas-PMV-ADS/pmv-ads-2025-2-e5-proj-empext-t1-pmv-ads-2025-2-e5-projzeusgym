import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LogoZeus from '../../assets/Logo_zeus.png';
import { API_BASE_URL } from '@env'; 

const saveToken = async (token) => {
    console.log("Token Armazenado (Simulação)");
};

export default function LoginScreen({ setUserToken }) {
  const navigation = useNavigation();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Função para lidar com o login
  const handleLogin = async () => {
    if (!login || !password) {
      Alert.alert('Erro', 'Por favor, preencha o Login e a Senha.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, { // Ajuste o endpoint se necessário
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.token) {
          await saveToken(data.token);
          setUserToken(data.token);
          Alert.alert('Sucesso', 'Login realizado com sucesso! Token recebido.');
          console.log('Token:', data.token);
        }
      } else {
        
        if (response.status === 403 && data.tempToken) {
          Alert.alert('Atenção', data.message || 'Troca de senha obrigatória.');
          console.log('Temp Token para troca de senha:', data.tempToken);
          navigation.navigate('ChangePasswordScreen', { tempToken: data.tempToken });

        } else {
          // Outros erros (400, 401, 404, etc.)
          Alert.alert('Erro', data.message || 'Erro desconhecido ao tentar logar.');
        }
      }
    } catch (error) {
      console.error('Erro de rede/servidor:', error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={LoginScreenStyle.container}>
      {/* Área superior laranja/laranja escura - Baseado no "Frame 11" */}
      <View style={LoginScreenStyle.header}>
        <Text style={LoginScreenStyle.headerText}></Text>
      </View>

      <View style={LoginScreenStyle.loginBox}>
        {/* Logo */}
        <Image
          // Substitua pela sua imagem real, ou use require('./caminho/para/sua/logo.png')
          source={LogoZeus}
          style={LoginScreenStyle.logo}
          resizeMode="contain"
        />
        <Text style={LoginScreenStyle.gymName}>ZEUS GYM</Text>

        {/* Campo de Usuário (Login/Email) */}
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

        {/* Campo de Senha */}
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

        {/* Botão ENTRAR */}
        <TouchableOpacity
          style={LoginScreenStyle.button}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <Text style={LoginScreenStyle.buttonText}>ENTRANDO...</Text>
          ) : (
            <Text style={LoginScreenStyle.buttonText}>ENTRAR</Text>
          )}
        </TouchableOpacity>

        {/* Esqueceu a senha */}
        <TouchableOpacity
          style={LoginScreenStyle.forgotPassword}
          onPress={() => Alert.alert('Ação', 'Navegar para a tela de recuperação de senha')}
          disabled={isLoading}
        >
          <Text style={LoginScreenStyle.forgotPasswordText}>Esqueci minha senha</Text>
        </TouchableOpacity>
      </View>

      {/* Área inferior laranja/laranja escura - Baseado no "Frame 27" */}
      <View style={LoginScreenStyle.footer} />
    </View>
  );
}

const LoginScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Fundo branco
    alignItems: 'center',
    justifyContent: 'space-between', // Para manter o header e footer nas extremidades
  },
  header: {
    width: '100%',
    height: 60, // Altura do frame superior
    backgroundColor: '#E57300', // Laranja escuro do topo
  },
  footer: {
    width: '100%',
    height: 60, // Altura do frame inferior
    backgroundColor: '#E57300', // Laranja escuro da base
  },
  loginBox: {
    width: '80%',
    alignItems: 'center',
    marginTop: -30, // Puxa um pouco para cima para sobrepor o header, se necessário
    paddingHorizontal: 20,
  },
  logo: {
    width: 150, // Ajuste o tamanho da logo
    height: 150,
    marginBottom: 10,
  },
  gymName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF8C00', // Laranja da marca
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25, // Bordas arredondadas
    paddingHorizontal: 20,
    marginBottom: 15,
    fontSize: 16,
    textAlign: 'center', // Texto centralizado como na imagem
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#FF8C00', // Laranja do botão ENTRAR
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000', // Sombra para dar profundidade
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
