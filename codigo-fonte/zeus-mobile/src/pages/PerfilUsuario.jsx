import React, { useState, useEffect, useContext } from 'react';
import { Modal, TextInput } from 'react-native';
import { View, Text, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import LogoZeus from '../../assets/Logo_zeus.png';
import HeaderStyle from '../styles/HeaderStyle.js';
import FooterStyle from '../styles/FooterStyle.js';
import PerfilUsuarioStyle from '../styles/PerfilUsuarioStyle.js';
import { userProfile } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';

const PerfilUsuario = ({ navigation }) => {
  const { signOut } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalField, setModalField] = useState('');
  const [modalFieldName, setModalFieldName] = useState('');
  const [modalValue, setModalValue] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await userProfile.getProfile();
      setUser(response.data);
    } catch (err) {
      setError('Erro ao carregar perfil. Por favor, tente novamente.');
      console.error('Erro ao carregar perfil:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    Alert.alert(
      'Editar Perfil',
      'Escolha o que deseja editar:',
      [
        {
          text: 'Nome',
          onPress: () => {
            setModalField('name');
            setModalFieldName('Nome');
            setModalValue('');
            setModalVisible(true);
          }
        },
        {
          text: 'Telefone',
          onPress: () => {
            setModalField('cellphone');
            setModalFieldName('Telefone');
            setModalValue('');
            setModalVisible(true);
          }
        },
        {
          text: 'Cancelar',
          style: 'cancel'
        }
      ]
    );
  };

  const handleUpdateField = async () => {
    if (!modalValue) return;
    try {
      const response = await userProfile.updateProfile({ [modalField]: modalValue });
      setUser(response.data.user);
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o perfil.');
    } finally {
      setModalVisible(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Apagar conta',
      'Tem certeza que deseja apagar a conta? Esta ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Apagar', 
          style: 'destructive', 
          onPress: async () => {
            try {
              await userProfile.deleteProfile();
              signOut(); // Isso remove o token e redireciona para LoginScreen automaticamente
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível deletar a conta.');
            }
          }
        },
      ]
    );
  };

  return (
    <View style={PerfilUsuarioStyle.container}>
      <StatusBar style="light" backgroundColor="#FF8C00" />

      <View style={HeaderStyle.header}>
        <TouchableOpacity style={HeaderStyle.menuButton} onPress={() => navigation.openDrawer()}>
          <Text style={HeaderStyle.menuText}>☰</Text>
        </TouchableOpacity>
        <Image source={LogoZeus} style={HeaderStyle.logoPlaceholder} />
      </View>

      <View style={PerfilUsuarioStyle.content}>
        <Text style={PerfilUsuarioStyle.title}>MEU PERFIL</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#FF8C00" />
        ) : error ? (
          <View style={PerfilUsuarioStyle.errorContainer}>
            <Text style={PerfilUsuarioStyle.errorText}>{error}</Text>
            <TouchableOpacity style={PerfilUsuarioStyle.retryButton} onPress={loadProfile}>
              <Text style={PerfilUsuarioStyle.retryButtonText}>Tentar Novamente</Text>
            </TouchableOpacity>
          </View>
        ) : user ? (
          <>
            <View style={PerfilUsuarioStyle.card}>
              <View style={PerfilUsuarioStyle.fieldRow}>
                <Text style={PerfilUsuarioStyle.fieldLabel}>NOME</Text>
                <View style={PerfilUsuarioStyle.pill}>
                  <Text style={PerfilUsuarioStyle.pillText}>{user.name}</Text>
                </View>
              </View>

              <View style={PerfilUsuarioStyle.fieldRow}>
                <Text style={PerfilUsuarioStyle.fieldLabel}>EMAIL</Text>
                <View style={PerfilUsuarioStyle.pill}>
                  <Text style={PerfilUsuarioStyle.pillText}>{user.email}</Text>
                </View>
              </View>

              <View style={PerfilUsuarioStyle.fieldRow}>
                <Text style={PerfilUsuarioStyle.fieldLabel}>CONT</Text>
                <View style={PerfilUsuarioStyle.pill}>
                  <Text style={PerfilUsuarioStyle.pillText}>{user.cellphone || 'Não informado'}</Text>
                </View>
              </View>

              {user.birthdate && (
                <View style={PerfilUsuarioStyle.fieldRow}>
                  <Text style={PerfilUsuarioStyle.fieldLabel}>NASC</Text>
                  <View style={PerfilUsuarioStyle.pill}>
                    <Text style={PerfilUsuarioStyle.pillText}>
                      {new Date(user.birthdate).toLocaleDateString('pt-BR')}
                    </Text>
                  </View>
                </View>
              )}
            </View>

            <TouchableOpacity style={PerfilUsuarioStyle.editButton} onPress={handleEdit}>
              <Text style={PerfilUsuarioStyle.editButtonText}>EDITAR</Text>
            </TouchableOpacity>

           <TouchableOpacity style={PerfilUsuarioStyle.deleteButton} onPress={handleDelete}>
           <Text style={PerfilUsuarioStyle.deleteButtonText}>APAGAR CONTA</Text>
           </TouchableOpacity>

            {/* Modal para editar campo */}
            <Modal
              visible={modalVisible}
              animationType="slide"
              transparent
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)' }}>
                <View style={{ backgroundColor: '#fff', padding: 24, borderRadius: 18, width: '80%' }}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>Atualizar {modalFieldName}</Text>
                  <TextInput
                    style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 18, fontSize: 16 }}
                    placeholder={`Digite o novo ${modalFieldName.toLowerCase()}`}
                    value={modalValue}
                    onChangeText={setModalValue}
                  />
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity
                      style={{ backgroundColor: '#A9A9A9', padding: 12, borderRadius: 8, flex: 1, marginRight: 8, alignItems: 'center' }}
                      onPress={handleUpdateField}
                    >
                      <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16 }}>Salvar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ backgroundColor: '#eee', padding: 12, borderRadius: 8, flex: 1, marginLeft: 8, alignItems: 'center' }}
                      onPress={() => setModalVisible(false)}
                    >
                      <Text style={{ color: '#333', fontWeight: 'bold', fontSize: 16 }}>Cancelar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </>
        ) : null}
      </View>

      <View style={FooterStyle.footer} />
    </View>
  );
};

export default PerfilUsuario;