import { useEffect, useRef, useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from "react-native";

export default function Index() {
  const countRef = useRef(0);
  const [stateCount, setStateCount] = useState(0);
  const [history, setHistory] = useState<number[]>([]);

  useEffect(() => {
    console.log(`Ref Count: ${countRef.current}`);
    setHistory((prev) => [stateCount, ...prev].slice(0, 5));
  }, [stateCount]);

  const increment = () => {
    countRef.current += 1;
    setStateCount((prev) => prev + 1);
  };

  const decrement = () => {
    countRef.current -= 1;
    setStateCount((prev) => prev - 1);
  };

  const reset = () => {
    countRef.current = 0;
    setStateCount(0);
    setHistory([]);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const getColor = (value: number) => {
    return value > 0 ? "#28a745" : value < 0 ? "#dc3545" : "#333";
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>UseRef Counter</Text>

      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.label}>Ref Count</Text>
          <Text style={[styles.value, { color: getColor(countRef.current) }]}>{countRef.current}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>State Count</Text>
          <Text style={[styles.value, { color: getColor(stateCount) }]}>{stateCount}</Text>
        </View>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={increment} style={[styles.button, styles.blueButton]}>
          <Text style={styles.buttonText}>Increment</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={decrement} style={[styles.button, styles.orangeButton]}>
          <Text style={styles.buttonText}>Decrement</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={reset} style={[styles.button, styles.redButton]}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={clearHistory} style={[styles.button, styles.grayButton]}>
          <Text style={styles.buttonText}>Clear History</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.historyTitle}>Count History (Last 5)</Text>
      {history.length > 0 ? (
        <FlatList
          data={history}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <Text style={[styles.historyItem, { color: getColor(item) }]}>{item}</Text>
          )}
        />
      ) : (
        <Text style={styles.noHistory}>No history available</Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f8f9fa",
      paddingHorizontal: 20,
      paddingTop: 60, // Added padding on top
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      color: "#007bff",
      marginBottom: 30,
    },
    cardContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      marginBottom: 20,
    },
    card: {
      backgroundColor: "#fff",
      padding: 30,
      borderRadius: 15,
      width: "48%",
      alignItems: "center",
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 4,
    },
    label: {
      fontSize: 16,
      color: "#666",
      marginBottom: 10,
    },
    value: {
      fontSize: 28,
      fontWeight: "bold",
    },
    buttonRow: {
      flexDirection: "row",
      marginTop: 10,
      justifyContent: "space-between",
      width: "100%",
    },
    button: {
      flex: 1,
      marginHorizontal: 5,
      paddingVertical: 16,
      borderRadius: 30,
      alignItems: "center",
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    blueButton: { backgroundColor: "#007bff" },
    orangeButton: { backgroundColor: "#ff9800" },
    redButton: { backgroundColor: "#dc3545" },
    grayButton: { backgroundColor: "#6c757d" },
    buttonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
    historyTitle: {
      marginTop: 30,
      fontSize: 20,
      fontWeight: "bold",
      color: "#007bff",
    },
    historyItem: {
      fontSize: 18,
      marginTop: 5,
    },
    noHistory: {
      marginTop: 10,
      fontSize: 16,
      color: "#555",
    },
  });
  