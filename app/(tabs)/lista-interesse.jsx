import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Link, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import allModalidadesData from '../../assets/data/modalidades.json';

const STORAGE_KEY = '@jubs_favoritos';

export default function ListaInteresseScreen() {
  
  const [favoriteModalidades, setFavoriteModalidades] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = useCallback(async () => {
    setLoading(true);
    try {
      const storedFavoritos = await AsyncStorage.getItem(STORAGE_KEY);
      const favoritosIds = storedFavoritos ? new Set(JSON.parse(storedFavoritos)) : new Set();
      
      const filteredData = allModalidadesData.filter(modalidade => 
        favoritosIds.has(modalidade.id)
      );

      const sortedData = filteredData.sort((a, b) => a.nome.localeCompare(b.nome));

      setFavoriteModalidades(sortedData);
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [loadFavorites])
  );
  
  const removeFavorito = async (id) => {
    try {
      const newFavorites = favoriteModalidades.filter(m => m.id !== id);
      setFavoriteModalidades(newFavorites);

      const storedFavoritos = await AsyncStorage.getItem(STORAGE_KEY);
      const favoritosIds = storedFavoritos ? new Set(JSON.parse(storedFavoritos)) : new Set();
      
      if (favoritosIds.has(id)) {
        favoritosIds.delete(id);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([...favoritosIds]));
      }
    } catch (error) {
      console.error('Erro ao salvar favoritos:', error);
      loadFavorites(); 
    }
  };

  const renderItem = ({ item }) => (
    <Link href={{ pathname: "/modalidade/[id]", params: { id: item.id } }} asChild>
      <TouchableOpacity style={styles.itemContainer}>
        <View style={styles.itemContent}>
          <Ionicons name={item.icone} size={32} color="#3B82F6" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.itemTitle}>{item.nome}</Text>
            <Text style={styles.itemSubtitle}>{item.datas}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => removeFavorito(item.id)} style={styles.favoriteButton}>
          <Ionicons 
            name={'star'} 
            size={28} 
            color={'#FBBF24'} 
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </Link>
  );
  
  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  if (favoriteModalidades.length === 0) {
    return (
      <View style={[styles.container, styles.center]}>
        <Ionicons name="star-outline" size={48} color="#9CA3AF" />
        <Text style={styles.emptyText}>Sua lista de interesse está vazia.</Text>
        <Text style={styles.emptySubtext}>Adicione modalidades na tela de Programação.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteModalidades}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ paddingVertical: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  itemContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  favoriteButton: {
    padding: 8,
    marginLeft: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
  }
});