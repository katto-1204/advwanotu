import { Tabs } from "expo-router";
import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          left: 20,
          right: 20,
          elevation: 5,
          backgroundColor: "#ffffff",
          borderRadius: 15,
          height: 70,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.2,
          shadowRadius: 10,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#007bff",
        tabBarInactiveTintColor: "#666",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: true,
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.tabItem}>
              <Feather name="home" size={size} color={color} />
              {focused && <Text style={styles.label}>Home</Text>}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="exercises"
        options={{
          title: "Exercises",
          headerShown: true,
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.tabItem}>
              <Feather name="list" size={size} color={color} />
              {focused && <Text style={styles.label}>Exercises</Text>}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: "Login",
          headerShown: true,
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.tabItem}>
              <Feather name="log-in" size={size} color={color} />
              {focused && <Text style={styles.label}>Login</Text>}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = {
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 12,
    color: "#007bff",
    marginTop: 2,
    fontWeight: "600",
  },
};
