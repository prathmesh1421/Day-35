// src/screens/DoctorsScreen.js
import {
    Alert,
    FlatList,
    Image,
    Linking,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    FadeIn,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

const doctors = [
  {
    id: "1",
    name: "Dr. Prathmesh Joshi",
    department: "Cardiology",
    experience: "8 Years",
    phone: "+91 9876543210",
    email: "prathmesh@hospital.com",
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  },
  {
    id: "2",
    name: "Dr. Akash Patil",
    department: "Neurology",
    experience: "6 Years",
    phone: "+91 9876543211",
    email: "akash@hospital.com",
    image: "https://cdn-icons-png.flaticon.com/512/3774/3774299.png",
  },
  {
    id: "3",
    name: "Dr. Priya Sharma",
    department: "Pediatrics",
    experience: "5 Years",
    phone: "+91 9876543212",
    email: "priya@hospital.com",
    image: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
  },
  {
    id: "4",
    name: "Dr. Sanjay Kulkarni",
    department: "Orthopedics",
    experience: "10 Years",
    phone: "+91 9876543213",
    email: "sanjay@hospital.com",
    image: "https://cdn-icons-png.flaticon.com/512/921/921071.png",
  },
];

// --- ANIMATED DOCTOR CARD ---
const DoctorCard = ({ item, index }) => {
  // 1. Entrance Animation (Staggered)
  const animationEnter = FadeIn.delay(index * 100)
    .duration(500)
    .springify();

  // 2. Gesture Animation State
  const translateX = useSharedValue(0);

  // 3. Gesture Handler (Swipe Right to Call)
  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX > 0 ? e.translationX : 0;
    })
    .onEnd(() => {
      if (translateX.value > 80) {
        Linking.openURL(`tel:${item.phone}`).catch(() =>
          Alert.alert("Error", "Unable to call"),
        );
        translateX.value = withSpring(0);
      } else {
        translateX.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const handleCardPress = () => {
    Alert.alert(
      item.name,
      `Department: ${item.department}\nExperience: ${item.experience}`,
      [
        { text: "Call", onPress: () => Linking.openURL(`tel:${item.phone}`) },
        { text: "Cancel", style: "cancel" },
      ],
    );
  };

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View entering={animationEnter} style={styles.cardContainer}>
        {/* Background Reveal (Swipe Action) */}
        <View style={styles.swipeBackground}>
          <Text style={styles.swipeText}>📱 Call</Text>
        </View>

        {/* Card Content */}
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.9}
          onPress={handleCardPress}
        >
          <Image source={{ uri: item.image }} style={styles.image} />

          <View style={styles.infoContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.department}>🏥 {item.department}</Text>
            <Text style={styles.experience}>
              ⭐ {item.experience} Experience
            </Text>
          </View>

          <View style={styles.actionContainer}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => Linking.openURL(`tel:${item.phone}`)}
            >
              <Text style={styles.icon}>📞</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </GestureDetector>
  );
};

export default function DoctorsScreen({ navigation }) {
  const handleLogout = () => navigation.replace("Login");

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Doctors</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={doctors}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <DoctorCard item={item} index={index} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
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
  // List Styles
  listContent: {
    padding: 15,
    paddingBottom: 100,
  },
  // Card Container (for Swipe)
  cardContainer: {
    marginBottom: 15,
    position: "relative",
    overflow: "hidden",
    borderRadius: 16,
  },
  // Swipe Background
  swipeBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#22c55e", // Green-500
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 25,
    borderRadius: 16,
  },
  swipeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  // Card
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#3b82f6",
  },
  infoContainer: {
    flex: 1,
    marginLeft: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 5,
  },
  department: {
    fontSize: 14,
    color: "#475569",
    marginBottom: 3,
  },
  experience: {
    fontSize: 13,
    color: "#f59e0b",
    fontWeight: "600",
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#e0f2fe",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 18,
  },
});
