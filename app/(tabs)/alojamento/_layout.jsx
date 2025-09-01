import { Stack } from 'expo-router';

export default function AlojamentoLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Opções de Alojamento',
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerBackTitleVisible: false,
        }}
      />
    </Stack>
  );
}