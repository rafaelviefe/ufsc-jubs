import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, Text, StyleSheet, Image, ScrollView, 
  TouchableOpacity, ActivityIndicator, SafeAreaView,
  Linking, // << NOVO: Importado para abrir links externos (mapa)
  Platform // << NOVO: Importado para diferenciar iOS e Android
} from 'react-native';
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
  const [isSaving, setIsSaving] = useState(false);

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
  
  useEffect(() => {
    const data = modalidadesData.find(m => m.id.toString() === id);
    setModalidade(data);
    loadFavoritoStatus();
  }, [id, loadFavoritoStatus]);

  const toggleFavorito = async () => {
    if (isSaving || !modalidade) return;

    setIsSaving(true);
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
      setIsFavorito(!newFavoritoStatus);
    } finally {
      setIsSaving(false);
    }
  };

  // << TAREFA 2: Função para abrir o mapa
  const openMap = () => {
    if (!modalidade?.coordenadas) return;

    const { latitude, longitude } = modalidade.coordenadas;
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${latitude},${longitude}`;
    const label = modalidade.local;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });

    Linking.openURL(url);
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
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 4, marginRight: 8 }}>
              <Ionicons name="arrow-back" size={24} color="#F9FAFB" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity 
              onPress={toggleFavorito} 
              disabled={isSaving} 
              style={styles.headerButton}
            >
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
          
          {/* << TAREFA 2: Localização agora é um botão */}
          <TouchableOpacity onPress={openMap}>
            <View style={styles.infoBox}>
              <Ionicons name="location-outline" size={24} color="#4B5563" />
              <Text style={styles.infoText}>{modalidade.local}</Text>
              {/* Adicionado um ícone para indicar que é clicável */}
              <Ionicons name="open-outline" size={20} color="#9CA3AF" style={styles.openIcon} />
            </View>
          </TouchableOpacity>

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
  // << TAREFA 3: Estilos para os botões do cabeçalho para aumentar a área de toque
  headerLeftButton: {
    marginLeft: 16,
    padding: 8, // Aumenta a área de toque
  },
  headerRightButton: {
    marginRight: 16,
    padding: 8, // Aumenta a área de toque
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
    flex: 1, // Faz o texto ocupar o espaço disponível
  },
  openIcon: { // << NOVO: Estilo para o ícone "abrir"
    marginLeft: 'auto',
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