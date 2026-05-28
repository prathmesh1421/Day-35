import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  SafeAreaView,
  Alert,
} from "react-native";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";

// --- Main Screen ---
export default function PatientsScreen({ navigation }) {
  const [patients, setPatients] = useState([]);
  const [name, setName] = useState("");
  const [disease, setDisease] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);

  // Initial data loading
  useEffect(() => {
    loadInitialPatients();
  }, []);

  const loadInitialPatients = () => {
    const initial = [
      { id: "1", name: "Rahul Sharma", disease: "Fever" },
      { id: "2", name: "Priya Mehta", disease: "Diabetes" },
      { id: "3", name: "Amit Shah", disease: "Flu" },
      { id: "4", name: "Sneha Joshi", disease: "Cold" },
    ];
    setPatients(initial);
    setPage(1);
  };

  // Add Patient
  const handleAdd = () => {
    if (!name.trim() || !disease.trim()) {
      Alert.alert("Error", "Please enter name and disease");
      return;
    }

    const newPatient = {
      id: Date.now().toString(),
      name: name.trim(),
      disease: disease.trim(),
    };

    setPatients((prev) => [newPatient, ...prev]);
    setName("");
    setDisease("");
  };

  // Delete Patient
  const handleDelete = (id) => {
    Alert.alert("Delete", "Are you sure you want to delete?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setPatients((prev) => prev.filter((p) => p.id !== id));
        },
      },
    ]);
  };

  // Pull to Refresh
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    setTimeout(() => {
      loadInitialPatients();
      setRefreshing(false);
    }, 1000);
  }, []);

  // Load More (Infinite Scroll)
  const handleLoadMore = useCallback(() => {
    if (loadingMore) return;
    setLoadingMore(true);

    setTimeout(() => {
      const newData = Array.from({ length: 5 }).map((_, i) => ({
        id: Date.now().toString() + i,
        name: `Patient ${page * 5 + i + 1}`,
        disease: "General Checkup",
      }));

      setPatients((prev) => [...prev, ...newData]);
      setPage((prev) => prev + 1);
      setLoadingMore(false);
    }, 1000);
  }, [page, loadingMore]);

  // Render Footer
  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#065f46" />
      </View>
    );
  };

  // Swipe Actions
  const renderRightActions = (id) => (
    <TouchableOpacity
      style={styles.deleteBox}
      onPress={() => handleDelete(id)}
    >
      <Text style={styles.deleteText}>🗑️ Delete</Text>
    </TouchableOpacity>
  );

  // List Item
  const renderItem = ({ item }) => (
    <Swipeable
      renderRightActions={() => renderRightActions(item.id)}
      overshootRight={false}
    >
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.disease}>{item.disease}</Text>
        </View>
      </View>
    </Swipeable>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Patients</Text>
          <TouchableOpacity onPress={() => navigation.getParent().reset({
            index: 0,
            routes: [{ name: "Login" }],
          })}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Add Patient Form */}
        <View style={styles.form}>
          <TextInput
            placeholder="Patient Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholderTextColor="#999"
          />

          <TextInput
            placeholder="Disease / Condition"
            value={disease}
            onChangeText={setDisease}
            style={styles.input}
            placeholderTextColor="#999"
          />

          <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
            <Text style={styles.btnText}>+ Add Patient</Text>
          </TouchableOpacity>
        </View>

        {/* Patients List */}
        <FlatList
          data={patients}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={["#065f46"]}
              tintColor="#065f46"
            />
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.3}
          ListFooterComponent={renderFooter}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            !refreshing ? (
              <Text style={styles.empty}>No patients found</Text>
            ) : null
          }
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6fb",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#065f46",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  headerTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },

  logoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  form: {
    backgroundColor: "#fff",
    margin: 15,
    marginBottom: 5,
    padding: 15,
    borderRadius: 12,
    elevation: 3,
  },

  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: "#fafafa",
  },

  addBtn: {
    backgroundColor: "#065f46",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  listContent: {
    paddingBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginVertical: 6,
    padding: 16,
    borderRadius: 10,
    elevation: 2,
  },

  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    flex: 1,
  },

  disease: {
    fontSize: 14,
    color: "#666",
    backgroundColor: "#e8f4fd",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  deleteBox: {
    backgroundColor: "#ef4444",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    marginVertical: 6,
    marginRight: 15,
    borderRadius: 10,
  },

  deleteText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },

  footerLoader: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },

  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#999",
    fontSize: 16,
  },
});
