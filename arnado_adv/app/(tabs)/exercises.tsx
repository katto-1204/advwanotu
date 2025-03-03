
import { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";

export default function Exercise() {
  const [selectedExercise, setSelectedExercise] = useState<number | null>(null);
  const router = useRouter();

  const exercises = [
    {
      title: "Exercise 3",
      description: [
        "Create login screen",
        "Login screen fields:",
        "• Email",
        "• Password",
      ],
      screen: "/login",
    },
    {
      title: "Exercise 4",
      description: [
        "Exercise: Stopwatch",
        "screen: /hooks",
        "Using the useState and useEffect hooks, create a stopwatch with the following features:",
        "• Start/Stop button",
        "• Reset button",
        "• Display elapsed time",
        "Then, link it to your exercise card.",
        "Submit the screenshot of the output and the GitHub repository",
      ],
      screen: "/hooks",
    },
    {
      title: "Exercise 5",
      description: [
        "Create register screen",
        "Register screen fields:",
        "• Image: Allows user to select image",
        "• Name",
        "• Email",
        "• Password",
      ],
      screen: "/register",
    },
    {
      title: "Exercise 6",
      description: [
        "Create a simple CRUD using useContext and useReducer",
        "Submit a screenshot of the output and the link to the GitHub repository.",
      ],
      screen: "/CRUD",
    },
    {
      title: "Exercise 7",
      description: [
        "Create a simple quiz using the API from Open Trivia Database.",
        "The user should be able to input the number of questions they want to answer, with a minimum of 10 and a maximum of 30.",
        "The UI will also be considered in grading this exercise.",
        "After completing the quiz, the user's score should be displayed as score/total questions.",
      ],
      screen: "/quiz",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {exercises.map((exercise, index) => (
        <TouchableOpacity
          key={index}
          onPress={() =>
            setSelectedExercise(selectedExercise === index ? null : index)
          }
          style={[
            styles.card,
            selectedExercise === index && styles.cardSelected,
          ]}
        >
          <Text style={styles.title}>{exercise.title}</Text>

          {selectedExercise === index && (
            <View style={styles.content}>
              {exercise.description.length > 0 ? (
                exercise.description.map((item, i) => (
                  <Text key={i} style={styles.text}>
                    {item}
                  </Text>
                ))
              ) : (
                <Text style={styles.text}>No content available</Text>
              )}

              {exercise.screen && (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => router.push(exercise.screen)}
                >
                  <Text style={styles.buttonText}>
                    {exercise.title.includes("3")
                      ? "Go to Login"
                      : exercise.title.includes("4")
                      ? "Go to Hooks and Events"
                      : exercise.title.includes("5")
                      ? "Go to Register"
                      : exercise.title.includes("6")
                      ? "Go to CRUD"
                      : "Go to Quiz"}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  cardSelected: {
    borderColor: "#007bff",
    borderWidth: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});