import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Este é o conteúdo para AlojamentosScreen.js
// Cole o mesmo StyleSheet nos outros arquivos (ListaInteresseScreen e ProgramacaoScreen)
export default function ProgramacaoScreen() {
  return (
    <View style={placeholderStyles.container}>
      <Text style={placeholderStyles.text}>Tela de Programação</Text>
      <Text style={placeholderStyles.subtext}>Aqui ficará a lista de modalidades.</Text>
    </View>
  );
}

const placeholderStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F9FAFB', // Novo fundo padrão
        paddingHorizontal: 20,
    },
    text: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#111827', // Nova cor de texto primária
        textAlign: 'center',
    },
    subtext: {
        fontSize: 16,
        color: '#6B7280', // Nova cor de texto secundária
        marginTop: 8,
        textAlign: 'center',
    }
});