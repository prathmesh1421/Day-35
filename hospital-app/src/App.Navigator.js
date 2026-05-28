import "react-native-gesture-handler";
import "react-native-reanimated";

import { Dimensions } from "react-native";

import { NavigationContainer } from "@react-navigation/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import AppointmentsScreen from "../screens/AppointmentsScreen";
import DashboardScreen from "../screens/DashboardScreen";
import DoctorsScreen from "../screens/DoctorsScreen";
import LoginScreen from "../screens/LoginScreen";
import PatientsScreen from "../screens/PatientsScreen";
import PharmacyScreen from "../screens/PharmacyScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const { width } = Dimensions.get("window");

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: "#007AFF",

        tabBarInactiveTintColor: "gray",

        tabBarStyle: {
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: "absolute",
          elevation: 10,
          backgroundColor: "#fff",
        },

        // Smooth tab animation
        animation: "shift",
      }}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />

      <Tab.Screen name="Patients" component={PatientsScreen} />

      <Tab.Screen name="Doctors" component={DoctorsScreen} />

      <Tab.Screen name="Appointments" component={AppointmentsScreen} />

      <Tab.Screen name="Pharmacy" component={PharmacyScreen} />

      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,

          // Enable gestures
          gestureEnabled: true,

          // Smooth animation
          animation: "slide_from_right",

          // Full screen gesture
          fullScreenGestureEnabled: true,

          // Gesture direction
          gestureDirection: "horizontal",
        }}
      >
        {/* LOGIN SCREEN */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            animation: "fade_from_bottom",
            gestureEnabled: false,
          }}
        />

        {/* MAIN APP */}
        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{
            animation: "slide_from_right",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
