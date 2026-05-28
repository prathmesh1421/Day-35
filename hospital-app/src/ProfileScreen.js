import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen({ navigation }) {
  // Logout Function
  const handleLogout = () => {
    navigation.replace("Login");
  };

  // Call Function
  const handleCall = () => {
    Linking.openURL("tel:+919876543210").catch(() => {
      Alert.alert("Error", "Unable to make call");
    });
  };

  // Email Function
  const handleEmail = () => {
    Linking.openURL("mailto:hospital@gmail.com").catch(() => {
      Alert.alert("Error", "Unable to send email");
    });
  };

  // Location Function
  const handleLocation = () => {
    Linking.openURL("https://maps.google.com/?q=City Hospital Pune").catch(
      () => {
        Alert.alert("Error", "Unable to open maps");
      },
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>

        <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Address Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🏥 Hospital Address</Text>

        <Text style={styles.cardText}>City Care Hospital</Text>

        <Text style={styles.cardText}>MG Road, Pune</Text>

        <Text style={styles.cardText}>Maharashtra - 411001</Text>
      </View>

      {/* Contact Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📞 Contact Number</Text>

        <Text style={styles.cardText}>+91 9876543210</Text>
      </View>

      {/* Email Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>✉️ Email Address</Text>

        <Text style={styles.cardText}>hospital@gmail.com</Text>
      </View>

      {/* Timing Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🕒 Working Hours</Text>

        <Text style={styles.cardText}>Monday - Sunday</Text>

        <Text style={styles.cardText}>Open 24 Hours</Text>
      </View>

      {/* Action Buttons */}
      <TouchableOpacity style={styles.actionButton} onPress={handleCall}>
        <Text style={styles.buttonText}>📞 Call Hospital</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton} onPress={handleEmail}>
        <Text style={styles.buttonText}>✉️ Send Email</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton} onPress={handleLocation}>
        <Text style={styles.buttonText}>📍 Open Location</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // Main Container
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#065f46",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  // Header Title
  headerTitle: {
    color: "#fff",

    fontSize: 30,

    fontWeight: "bold",
  },

  // Logout Button
  logoutBtn: {
    backgroundColor: "#047857",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },

  // Logout Text
  logoutText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },

  // Info Card
  card: {
    backgroundColor: "#ffffff",

    marginHorizontal: 18,

    marginTop: 18,

    padding: 20,

    borderRadius: 18,

    elevation: 3,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,

    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  // Card Title
  cardTitle: {
    fontSize: 20,

    fontWeight: "bold",

    color: "#0f172a",

    marginBottom: 10,
  },

  // Card Text
  cardText: {
    fontSize: 16,

    color: "#475569",

    marginBottom: 5,
  },

  // Action Buttons
  actionButton: {
    backgroundColor: "#065f46",

    marginHorizontal: 20,

    marginTop: 18,

    paddingVertical: 16,

    borderRadius: 16,

    alignItems: "center",
  },

  // Button Text
  buttonText: {
    color: "#fff",

    fontSize: 18,

    fontWeight: "bold",
  },
});
