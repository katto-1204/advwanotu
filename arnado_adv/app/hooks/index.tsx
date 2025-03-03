import { Link } from "expo-router";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { useRef } from "react";

export default function Index() {
  const scale1 = useRef(new Animated.Value(1)).current;
  const scale2 = useRef(new Animated.Value(1)).current;

  const handlePressIn = (scale: Animated.Value) => {
    Animated.spring(scale, {
      toValue: 0.9,
      useNativeDriver: true,
      speed: 50,
    }).start();
  };

  const handlePressOut = (scale: Animated.Value) => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ scale: scale1 }] }}>
        <Link href="/hooks/state" asChild>
          <TouchableOpacity
            style={styles.button}
            onPressIn={() => handlePressIn(scale1)}
            onPressOut={() => handlePressOut(scale1)}
          >
            <Text style={styles.buttonText}>useState</Text>
          </TouchableOpacity>
        </Link>
      </Animated.View>

      <Animated.View style={{ transform: [{ scale: scale2 }] }}>
        <Link href="/hooks/effects" asChild>
          <TouchableOpacity
            style={styles.button}
            onPressIn={() => handlePressIn(scale2)}
            onPressOut={() => handlePressOut(scale2)}
          >
            <Text style={styles.buttonText}>useEffect</Text>
          </TouchableOpacity>
        </Link>
      </Animated.View>
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
  button: {
    backgroundColor: "#5C8DFF",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
