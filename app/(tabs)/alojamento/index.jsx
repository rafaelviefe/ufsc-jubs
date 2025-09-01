import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import alojamentosData from "../../../assets/data/alojamentos.json";

export default function AlojamentosScreen() {
  const [alojamentos, setAlojamentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sortedData = [...alojamentosData].sort((a, b) =>
      a.nome.localeCompare(b.nome)
    );
    setAlojamentos(sortedData);
    setLoading(false);
  }, []);

  const renderItem = ({ item }) => (
    <Link
      href={{ pathname: "/alojamento/[id]", params: { id: item.id } }}
      asChild
    >
      <TouchableOpacity style={styles.itemContainer}>
        <Ionicons
          name="bed-outline"
          size={32}
          color="#3B82F6"
          style={styles.icon}
        />
        <View style={styles.textContainer}>
          <Text style={styles.itemTitle}>{item.nome}</Text>
          <Text style={styles.itemSubtitle}>Diária: {item.diaria}</Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={24} color="#9CA3AF" />
      </TouchableOpacity>
    </Link>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={alojamentos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingVertical: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  icon: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },
  itemSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
});
