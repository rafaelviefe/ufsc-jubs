import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Link, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import modalidadesData from '../../assets/data/modalidades.json';

const STORAGE_KEY = '@jubs_favoritos';

export default function ProgramacaoScreen() {
  const [modalidades, setModalidades] = useState([]);
  const [favoritos, setFavoritos] = useState(new Set());
  const [loading, setLoading] = useState(true);

  const loadFavoritos = async () => {
    try {
      const storedFavoritos = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedFavoritos !== null) {
        setFavoritos(new Set(JSON.parse(storedFavoritos)));
      }
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
    }
  };

  useEffect(() => {
    const sortedData = [...modalidadesData].sort((a, b) => a.nome.localeCompare(b.nome));
    setModalidades(sortedData);
    loadFavoritos().finally(() => setLoading(false));
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadFavoritos();
    }, [])
  );
  
  const toggleFavorito = async (id) => {
    const novosFavoritos = new Set(favoritos);
    if (novosFavoritos.has(id)) {
      novosFavoritos.delete(id);
    } else {
      novosFavoritos.add(id);
    }
    setFavoritos(novosFavoritos);
    
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([...novosFavoritos]));
    } catch (error) {
      console.error('Erro ao salvar favoritos:', error);
    }
  };

  const renderItem = ({ item }) => {
    const isFavorito = favoritos.has(item.id);

    return (
      <Link href={{ pathname: "/modalidade/[id]", params: { id: item.id } }} asChild>
        <TouchableOpacity style={styles.itemContainer}>
          <View style={styles.itemContent}>
            <Ionicons name={item.icone} size={32} color="#3B82F6" style={styles.icon} />
            <View style={styles.textContainer}>
              <Text style={styles.itemTitle}>{item.nome}</Text>
              <Text style={styles.itemSubtitle}>{item.datas}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => toggleFavorito(item.id)} style={styles.favoriteButton}>
            <Ionicons 
              name={isFavorito ? 'star' : 'star-outline'} 
              size={28} 
              color={isFavorito ? '#FBBF24' : '#9CA3AF'} 
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Link>
    );
  };
  
  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={modalidades}
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
});