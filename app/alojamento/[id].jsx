import React from 'react';
import { 
  View, Text, StyleSheet, Image, ActivityIndicator, 
  SafeAreaView, Linking, Platform 
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useLocalSearchParams, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import alojamentosData from '../../assets/data/alojamentos.json';

export default function AlojamentoDetalhesScreen() {
  const { id } = useLocalSearchParams();
  const [alojamento, setAlojamento] = React.useState(null);

  React.useEffect(() => {
    const data = alojamentosData.find(a => a.id.toString() === id);
    setAlojamento(data);
  }, [id]);

  const openAction = (url) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Não é possível abrir a URL: " + url);
      }
    });
  };

  const openMap = () => {
    if (!alojamento?.coordenadas) return;
    const { latitude, longitude } = alojamento.coordenadas;
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${latitude},${longitude}`;
    const label = alojamento.nome;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });
    openAction(url);
  };

  if (!alojamento) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <Stack.Screen options={{ title: alojamento.nome }} />
      <ScrollView>
        <Image source={{ uri: alojamento.imagem }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>{alojamento.nome}</Text>
          <Text style={styles.diaria}>Diária por pessoa: {alojamento.diaria}</Text>
          
          <Text style={styles.sectionTitle}>Opções de Reserva</Text>
          
          {/* Botão de Localização */}
          <TouchableOpacity onPress={openMap}>
            <View style={styles.infoBox}>
              <Ionicons name="location-outline" size={24} color="#4B5563" />
              <Text style={styles.infoText}>Ver no mapa</Text>
              <Ionicons name="open-outline" size={20} color="#9CA3AF" style={styles.openIcon} />
            </View>
          </TouchableOpacity>

          {/* Botão de E-mail */}
          <TouchableOpacity onPress={() => openAction(`mailto:${alojamento.contato.email}`)}>
            <View style={styles.infoBox}>
              <Ionicons name="mail-outline" size={24} color="#4B5563" />
              <Text style={styles.infoText}>{alojamento.contato.email}</Text>
              <Ionicons name="open-outline" size={20} color="#9CA3AF" style={styles.openIcon} />
            </View>
          </TouchableOpacity>

          {/* Botão de Telefone */}
          <TouchableOpacity onPress={() => openAction(`tel:${alojamento.contato.telefone}`)}>
            <View style={styles.infoBox}>
              <Ionicons name="call-outline" size={24} color="#4B5563" />
              <Text style={styles.infoText}>{alojamento.contato.telefone}</Text>
              <Ionicons name="open-outline" size={20} color="#9CA3AF" style={styles.openIcon} />
            </View>
          </TouchableOpacity>
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
        marginBottom: 8,
    },
    diaria: {
        fontSize: 18,
        fontWeight: '500',
        color: '#374151',
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1F2937',
        marginTop: 16,
        marginBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        paddingBottom: 8,
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
        flex: 1,
    },
    openIcon: {
        marginLeft: 'auto',
    },
});