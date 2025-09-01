import { DrawerActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';

export default function AlojamentoLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={({ navigation }) => ({
          title: 'Opções de Alojamento',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
              style={{ marginRight: 12 }}
            >
              <Ionicons name="menu" size={24} color="#E5E7EB" />
            </TouchableOpacity>
          ),
        })}
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