// src/screens/PharmacyScreen.js
import {
    FlatList,
    StyleSheet,
    Text,
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

const medicines = [
  { id: "1", name: "Paracetamol", price: "₹20" },
  { id: "2", name: "Ibuprofen", price: "₹35" },
  { id: "3", name: "Amoxicillin", price: "₹80" },
  { id: "4", name: "Cough Syrup", price: "₹60" },
];

// --- ANIMATED CARD COMPONENT ---
const MedicineCard = ({ item, index }) => {
  // 1. Staggered Entrance Animation
  const animationEnter = FadeIn.delay(index * 100)
    .duration(500)
    .springify();

  // 2. Gesture State
  const translateX = useSharedValue(0);

  // 3. Gesture Handler (Swipe Right)
  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      // Only allow right swipe
      const x = e.translationX;
      translateX.value = x > 0 ? x : 0;
    })
    .onEnd(() => {
      if (translateX.value > 80) {
        // If swiped enough, trigger 'Add to Cart'
        translateX.value = withSpring(0);
        console.log("Added to cart!");
      } else {
        // Snap back
        translateX.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View entering={animationEnter} style={styles.cardContainer}>
        {/* Background (Revealed on Swipe) */}
        <View style={styles.backgroundAction}>
          <Text style={styles.actionText}>Add to Cart</Text>
        </View>

        {/* Card Content */}
        <View style={styles.card}>
          <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>+</Text>
          </View>
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

export default function PharmacyScreen({ navigation }) {
  const handleLogout = () => navigation.replace("Login");

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pharmacy</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={medicines}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <MedicineCard item={item} index={index} />
        )}
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
  listContent: {
    padding: 15,
  },
  // Swipe Container
  cardContainer: {
    marginBottom: 15,
    position: "relative",
    overflow: "hidden",
    borderRadius: 16,
  },
  // Background revealed on swipe
  backgroundAction: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#065f46", // Emerald-500
    borderRadius: 16,
    justifyContent: "center",
    paddingLeft: 25,
  },
  actionText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  // The actual card
  card: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },
  price: {
    fontSize: 16,
    color: "#059669", // Green-600
    fontWeight: "600",
    marginTop: 4,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ecfdf5", // Green-50
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 24,
    color: "#065f46",
    fontWeight: "bold",
  },
});
