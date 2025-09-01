import { Stack } from 'expo-router';

export default function AlojamentoLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="[id]" 
        options={{ 
          headerBackTitleVisible: false, // Opcional: esconde o texto "Voltar" no iOS
        }} 
      />
    </Stack>
  );
}