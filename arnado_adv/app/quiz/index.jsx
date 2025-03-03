import { useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";
import Svg, { Defs, Pattern, Rect, Line } from "react-native-svg";
import Quiz from "@/components/Quiz";

const GridBackground = () => {
  return (
    <Svg width="100%" height="100%" style={StyleSheet.absoluteFill}>
      <Defs>
        <Pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
          <Rect width="80" height="80" fill="white" />
          <Line
            x1="0"
            y1="0"
            x2="0"
            y2="80"
            stroke="#e0e0e0"
            strokeWidth="1"
            opacity="0.5"
          />
          <Line
            x1="0"
            y1="0"
            x2="80"
            y2="0"
            stroke="#e0e0e0"
            strokeWidth="1"
            opacity="0.5"
          />
        </Pattern>
      </Defs>
      <Rect width="100%" height="100%" fill="url(#grid)" />
    </Svg>
  );
};

export default function Index() {
  const [isStarted, setIsStarted] = useState(false);

  return (
    <View style={styles.container}>
      <GridBackground />
      {isStarted ? (
        <Quiz />
      ) : (
        <View style={styles.startContainer}>
          {/* Image Logotype */}
          <Image
            source={require("./quizcatlogotype.png")}
            style={styles.quizCatImage}
          />
          <Text style={styles.subtitle}>
            More than 1000+ students use this!
          </Text>

          {/* Original Image */}
          <Image source={require("./quizcatlogo1.png")} style={styles.image} />

          <TouchableOpacity
            style={styles.startButton}
            onPress={() => setIsStarted(true)}
          >
            <Text style={styles.startButtonText}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#e6e6e6",
    paddingTop: 120,
  },
  startContainer: {
    alignItems: "center",
  },
  quizCatImage: {
    width: 500,
    height: 100,
    resizeMode: "contain",
    marginBottom: 1,
  },
  subtitle: {
    fontSize: 26,
    color: "black",
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 40, // Adjust margin if needed
  },
  startButton: {
    backgroundColor: "#47b528",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: "center",
  },
  startButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
