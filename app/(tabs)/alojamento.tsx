import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AlojamentosScreen() {
  return (
    <View style={placeholderStyles.container}>
      <Text style={placeholderStyles.text}>Opções de Alojamento</Text>
      <Text style={placeholderStyles.subtext}>A lista de hotéis e outros locais será exibida aqui.</Text>
    </View>
  );
}

const placeholderStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        paddingHorizontal: 20,
    },
    text: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#111827',
        textAlign: 'center',
    },
    subtext: {
        fontSize: 16,
        color: '#6B7280',
        marginTop: 8,
        textAlign: 'center',
    }
});