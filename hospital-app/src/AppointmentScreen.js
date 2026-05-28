// src/screens/AppointmentsScreen.js
import { useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const doctorsList = [
  "Dr. Prathmesh Joshi",
  "Dr. Akash Patil",
  "Dr. Sanjay Kulkarni",
  "Dr. Priya Sharma",
];

// --- ANIMATED APPOINTMENT CARD ---
const AppointmentCard = ({ item, index, onDelete }) => {
  // 1. Entrance Animation
  const animationEnter = FadeIn.delay(index * 100).duration(400);

  // 2. Gesture State
  const translateX = useSharedValue(0);

  // 3. Swipe to Delete Gesture
  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      // Only allow left swipe for delete
      const x = e.translationX;
      translateX.value = x < 0 ? x : 0;
    })
    .onEnd(() => {
      if (translateX.value < -80) {
        // Trigger delete
        onDelete();
        translateX.value = withSpring(-500, {}, () => (translateX.value = 0)); // Fly out
      } else {
        translateX.value = withSpring(0); // Snap back
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        entering={animationEnter}
        style={styles.appointmentContainer}
      >
        {/* Background Reveal (Delete) */}
        <View style={styles.deleteBackground}>
          <Text style={styles.deleteIcon}>🗑️</Text>
          <Text style={styles.deleteText}>Swipe to Delete</Text>
        </View>

        {/* Card Content */}
        <Animated.View style={[styles.appointmentCard, animatedStyle]}>
          <Text style={styles.patientName}>👤 {item.patientName}</Text>
          <Text style={styles.info}>👨‍⚕️ {item.doctor}</Text>
          <View style={styles.dateTimeRow}>
            <Text style={styles.info}>📅 {item.date}</Text>
            <Text style={styles.info}>🕒 {item.time}</Text>
          </View>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

export default function AppointmentsScreen({ navigation }) {
  const [patientName, setPatientName] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [appointments, setAppointments] = useState([]);

  const handleLogout = () => navigation.replace("Login");

  const handleBooking = () => {
    if (!patientName || !doctor || !date || !time) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    const newAppointment = { id: Date.now(), patientName, doctor, date, time };
    setAppointments([newAppointment, ...appointments]);
    setPatientName("");
    setDoctor("");
    setDate("");
    setTime("");
    Alert.alert("Success", "Appointment Booked ✅");
  };

  const handleDelete = (id) => {
    const updated = appointments.filter((item) => item.id !== id);
    setAppointments(updated);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Appointments</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Booking Card */}
        <View style={styles.card}>
          <Text style={styles.title}>📅 Book Appointment</Text>

          <TextInput
            placeholder="Patient Name"
            style={styles.input}
            value={patientName}
            onChangeText={setPatientName}
          />

          {/* Custom Picker List (Simple implementation) */}
          <View style={styles.pickerContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {doctorsList.map((doc) => (
                <TouchableOpacity
                  key={doc}
                  style={[
                    styles.pickerItem,
                    doctor === doc && styles.pickerItemActive,
                  ]}
                  onPress={() => setDoctor(doc)}
                >
                  <Text
                    style={[
                      styles.pickerText,
                      doctor === doc && styles.pickerTextActive,
                    ]}
                  >
                    {doc}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <TextInput
            placeholder="Date (DD/MM/YYYY)"
            style={styles.input}
            value={date}
            onChangeText={setDate}
          />

          <TextInput
            placeholder="Time (10:30 AM)"
            style={styles.input}
            value={time}
            onChangeText={setTime}
          />

          <TouchableOpacity style={styles.button} onPress={handleBooking}>
            <Text style={styles.buttonText}>Book Appointment 🚀</Text>
          </TouchableOpacity>
        </View>

        {/* Appointment List */}
        <Text style={styles.sectionTitle}>Booked Appointments</Text>

        {appointments.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>No Appointments Yet</Text>
          </View>
        ) : (
          appointments.map((item, index) => (
            <AppointmentCard
              key={item.id}
              item={item}
              index={index}
              onDelete={() => handleDelete(item.id)}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
  },
  // Header Styles
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#065f46",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
  logoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
    alignItems: "center",
  },
  // Card Styles
  card: {
    width: Platform.OS === "web" ? 500 : "100%",
    backgroundColor: "#ffffff",
    padding: 25,
    borderRadius: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
    color: "#065f46",
  },
  input: {
    backgroundColor: "#f8fafc",
    padding: 15,
    borderRadius: 12,
    marginBottom: 18,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  pickerContainer: {
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 10,
  },
  pickerItem: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: "#e2e8f0",
  },
  pickerItemActive: {
    backgroundColor: "#065f46",
  },
  pickerText: {
    color: "#475569",
    fontWeight: "600",
  },
  pickerTextActive: {
    color: "#fff",
  },
  button: {
    backgroundColor: "#065f46",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 35,
    marginBottom: 20,
    color: "#1f2937",
    width: Platform.OS === "web" ? 500 : "100%",
  },
  // Appointment List Item
  appointmentContainer: {
    width: Platform.OS === "web" ? 500 : "100%",
    marginBottom: 15,
    position: "relative",
    overflow: "hidden",
    borderRadius: 18,
  },
  deleteBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#ef4444",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 25,
    borderRadius: 18,
    flexDirection: "row",
  },
  deleteIcon: { fontSize: 20, marginRight: 10 },
  deleteText: { color: "#fff", fontWeight: "bold" },
  appointmentCard: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 18,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  patientName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#0f172a",
  },
  dateTimeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  info: {
    fontSize: 15,
    color: "#475569",
    marginTop: 4,
  },
  emptyCard: {
    backgroundColor: "#ffffff",
    padding: 30,
    borderRadius: 18,
    width: Platform.OS === "web" ? 500 : "100%",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#64748b",
  },
});
