import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

export default function State() {
  const [count, setCount] = useState(0);
  const router = useRouter();

  function handleButtonPress() {
    setCount((c) => c + 1);
  }

  return (
    <View style={styles.container}>
      <View style={styles.countDisplay}>
        <Text style={styles.countText}>{count}</Text>
      </View>
      <TouchableOpacity onPress={handleButtonPress} style={styles.button}>
        <Text style={styles.buttonText}>Click Me</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/")} style={styles.button}>
        <Text style={styles.buttonText}>Go to Hooks/Events</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  countDisplay: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 20,
    width: "80%",
    alignItems: "center",
  },
  countText: {
    fontSize: 100,
    fontWeight: "bold",
    color: "#5C8DFF",
  },
  button: {
    backgroundColor: "#5C8DFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
