import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';

const colors = {
  background: '#FFFFFF',
  drawerBackground: '#F9FAFB',
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  accent: '#3B82F6',
};

export default function AppLayout() {
  return (
    <Drawer
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#E5E7EB',
        },
        headerTintColor: colors.textPrimary,

        drawerStyle: {
          backgroundColor: colors.drawerBackground,
          width: 250,
        },
        drawerActiveTintColor: colors.accent,
        drawerActiveBackgroundColor: '#EFF6FF',
        drawerInactiveTintColor: colors.textSecondary,

        drawerLabelStyle: {
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