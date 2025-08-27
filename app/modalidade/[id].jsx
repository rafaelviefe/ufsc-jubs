import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import modalidadesData from '../../assets/data/modalidades.json';

const STORAGE_KEY = '@jubs_favoritos';

export default function ModalidadeDetalhesScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [modalidade, setModalidade] = useState(null);
  const [isFavorito, setIsFavorito] = useState(false);

  // Carrega o status de favorito para esta modalidade
  const loadFavoritoStatus = useCallback(async () => {
    try {
      const storedFavoritos = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedFavoritos !== null) {
        const favoritosSet = new Set(JSON.parse(storedFavoritos));
        setIsFavorito(favoritosSet.has(parseInt(id)));
      }
    } catch (error) {
      console.error('Erro ao carregar status de favorito:', error);
    }
  }, [id]);
  
  // Encontra os dados da modalidade e carrega o status de favorito
  useEffect(() => {
    const data = modalidadesData.find(m => m.id.toString() === id);
    setModalidade(data);
    loadFavoritoStatus();
  }, [id, loadFavoritoStatus]);

  // Função para alternar o status de favorito
  const toggleFavorito = async () => {
    if (!modalidade) return;
    const newFavoritoStatus = !isFavorito;
    setIsFavorito(newFavoritoStatus);
    
    try {
      const storedFavoritos = await AsyncStorage.getItem(STORAGE_KEY);
      const favoritosSet = storedFavoritos ? new Set(JSON.parse(storedFavoritos)) : new Set();
      
      if (newFavoritoStatus) {
        favoritosSet.add(modalidade.id);
      } else {
        favoritosSet.delete(modalidade.id);
      }
      
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([...favoritosSet]));
    } catch (error) {
      console.error('Erro ao salvar favoritos:', error);
      // Reverte o estado em caso de erro
      setIsFavorito(!newFavoritoStatus);
    }
  };

  if (!modalidade) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <Stack.Screen
        options={{
          title: modalidade.nome,
          // Botão de voltar é adicionado automaticamente pelo Stack, mas podemos customizar
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 4, marginRight: 8 }}>
              <Ionicons name="arrow-back" size={24} color="#F9FAFB" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={toggleFavorito} style={{ marginRight: 16 }}>
              <Ionicons 
                name={isFavorito ? 'star' : 'star-outline'} 
                size={28} 
                color={isFavorito ? '#FBBF24' : '#9CA3AF'} 
              />
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: modalidade.imagem }} style={styles.image} />
        
        <View style={styles.content}>
          <Text style={styles.title}>{modalidade.nome}</Text>
          
          <View style={styles.infoBox}>
            <Ionicons name="location-outline" size={24} color="#4B5563" />
            <Text style={styles.infoText}>{modalidade.local}</Text>
          </View>

          <View style={styles.infoBox}>
            <Ionicons name="calendar-outline" size={24} color="#4B5563" />
            <Text style={styles.infoText}>{modalidade.datas}</Text>
          </View>
          
          <Text style={styles.sectionTitle}>Horários das Competições</Text>
          {modalidade.horarios.map((item, index) => (
            <View key={index} style={styles.horarioItem}>
              <Text style={styles.horarioDia}>{item.dia}</Text>
              <Text style={styles.horarioHora}>{item.hora}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  container: {
    paddingBottom: 24,
  },
  image: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 24,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  infoText: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 24,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 8,
  },
  horarioItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  horarioDia: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  horarioHora: {
    fontSize: 16,
    color: '#6B7280',
  },
});