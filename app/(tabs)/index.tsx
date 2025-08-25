import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../../assets/images/jubs-logo.png')} 
          style={styles.logo}
          resizeMode="contain"
          onError={(e) => console.log('Erro ao carregar a imagem:', e.nativeEvent.error)}
        />
        <Text style={styles.title}>Jogos Universitários Brasileiros</Text>
        <Text style={styles.subtitle}>A maior competição universitária da América Latina!</Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>📅 Datas: 20 a 27 de Maio de 2026</Text>
          <Text style={styles.infoText}>📍 Cidade-Sede: Florianópolis, SC</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB', // Fundo de tela cinza muito claro
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827', // Preto suave
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280', // Cinza para texto secundário
    textAlign: 'center',
    marginBottom: 32,
  },
  infoBox: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#FFFFFF', // Fundo branco para destaque
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB', // Borda cinza clara
    width: '100%',
  },
  infoText: {
    fontSize: 18,
    color: '#374151', // Cinza mais escuro
    textAlign: 'center',
    lineHeight: 28,
  },
});