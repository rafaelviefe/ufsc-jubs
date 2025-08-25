// Lembre-se de instalar as dependências:
// npx expo install @react-navigation/drawer react-native-gesture-handler react-native-reanimated

import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';

// Definição da nova paleta de cores para fácil manutenção
const colors = {
  background: '#FFFFFF', // Fundo principal e do header
  drawerBackground: '#F9FAFB', // Fundo do menu (um cinza bem claro)
  textPrimary: '#111827',   // Texto principal (preto suave)
  textSecondary: '#6B7280', // Texto inativo/secundário (cinza)
  accent: '#3B82F6',        // Cor de destaque (azul moderno)
};

export default function AppLayout() {
  return (
    <Drawer
      screenOptions={{
        // Estilos do Header (barra superior)
        headerStyle: {
          backgroundColor: colors.background,
          elevation: 0, // Remove a sombra no Android
          shadowOpacity: 0, // Remove a sombra no iOS
          borderBottomWidth: 1,
          borderBottomColor: '#E5E7EB', // Borda sutil
        },
        headerTintColor: colors.textPrimary, // Cor do título e ícone do menu

        // Estilos do Menu Lateral (Drawer)
        drawerStyle: {
          backgroundColor: colors.drawerBackground,
          width: 250, // Um pouco mais de espaço
        },
        drawerActiveTintColor: colors.accent, // Cor do item ativo
        drawerActiveBackgroundColor: '#EFF6FF', // Fundo do item ativo (azul bem claro)
        drawerInactiveTintColor: colors.textSecondary, // Cor do item inativo

        // Estilo do texto do menu - AJUSTE PRINCIPAL
        drawerLabelStyle: {
          // marginLeft removido para corrigir o espaçamento
          // O valor padrão agora cria um espaço adequado
          fontSize: 16,
          fontWeight: '500',
        }
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: 'Início',
          title: 'JUBs 2024 - Florianópolis',
          drawerIcon: ({ size, color }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="programacao"
        options={{
          drawerLabel: 'Programação',
          title: 'Programação dos Jogos',
          drawerIcon: ({ size, color }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="lista-interesse"
        options={{
          drawerLabel: 'Minha Lista',
          title: 'Minha Lista de Interesse',
          drawerIcon: ({ size, color }) => (
            <Ionicons name="star-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="alojamento"
        options={{
          drawerLabel: 'Alojamentos',
          title: 'Opções de Alojamento',
          drawerIcon: ({ size, color }) => (
            <Ionicons name="bed-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}