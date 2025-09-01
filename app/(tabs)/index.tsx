import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Image
            source={require('../../assets/images/jubs-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Jogos Universitários Brasileiros</Text>
          <Text style={styles.subtitle}>A maior competição universitária da América Latina!</Text>

          <View style={styles.infoBox}>
            <Text style={styles.infoText}>📅 Datas: 20 a 27 de Maio de 2026</Text>
            <Text style={styles.infoText}>📍 Cidade-Sede: Florianópolis, SC</Text>
          </View>
        </View>

        <View style={styles.gallerySection}>
          <Text style={styles.sectionTitle}>Viva a Experiência</Text>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1635356994072-671c50c78e66?q=80&w=2340&auto=format=fit=crop&ixlib-rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
              style={styles.galleryImage}
            />
            <Text style={styles.imageCaption}>Competições acirradas e espírito esportivo em cada modalidade.</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1570937942748-742a12445ec6?q=80&w=3132&auto=format&fit=crop&ixlib-rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
              style={styles.galleryImage}
            />
            <Text style={styles.imageCaption}>Celebre a união e a paixão pelo esporte universitário.</Text>
          </View>
        </View>
        
        <View style={styles.navigationSection}>
           <Text style={styles.sectionTitle}>Explore o Evento</Text>
           <TouchableOpacity style={styles.navButton} onPress={() => router.push('/programacao')}>
                <Ionicons name="calendar-outline" size={24} color="#3B82F6" />
                <Text style={styles.navButtonText}>Ver Programação Completa</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.navButton} onPress={() => router.push('/alojamento')}>
                <Ionicons name="bed-outline" size={24} color="#3B82F6" />
                <Text style={styles.navButtonText}>Encontrar Alojamento</Text>
           </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6', // Alterado para um cinza um pouco mais escuro
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    backgroundColor: '#F9FAFB',
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  infoBox: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    width: '100%',
  },
  infoText: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
    lineHeight: 26,
  },
  gallerySection: {
    padding: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  imageContainer: {
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden', // Garante que a imagem não ultrapasse a borda
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  galleryImage: {
    width: '100%',
    height: 200,
  },
  imageCaption: {
    fontSize: 14,
    color: '#4B5563',
    padding: 12,
    textAlign: 'center',
  },
  navigationSection: {
    paddingHorizontal: 20,
  },
  navButton: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginLeft: 16,
  },
});