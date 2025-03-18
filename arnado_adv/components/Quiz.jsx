import { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { Dimensions } from "react-native";
//import ConfettiCannon from "react-native-confetti-cannon";

export default function Quiz() {
  const [numQuestions, setNumQuestions] = useState("");
  const [quizzes, setQuizzes] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [answers, setAnswers] = useState([]);
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  useEffect(() => {
    if (started && !quizFinished && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setSelectedAnswer(null);
      if (current < quizzes.length - 1) {
        setCurrent((prev) => prev + 1);
        setTimeLeft(15);
      } else {
        setQuizFinished(true);
      }
    }
  }, [timeLeft, started, quizFinished]);

  
  function fetchQuestions() {
    if (
      !numQuestions ||
      isNaN(numQuestions) ||
      numQuestions < 1 ||
      numQuestions > 30
    ) {
      alert("Please enter a number between 1 and 30.");
      return;
    }
  
    setGenerating(true);
    fetch(
      `https://opentdb.com/api.php?amount=${numQuestions}`
    )
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          setQuizzes(data.results);
          setGenerating(false);
          setLoading(false);
          setStarted(true);
          setCurrent(0);
          setScore(0);
          setQuizFinished(false);
          setTimeLeft(15);
        }, 2000);
      });
  }
  

useEffect(() => {
  function shuffle(array: any[]) {
    return array.sort(() => Math.random() - 0.5);
  }

  if (quizzes.length > 0 && quizzes[current]) {
    const shuffledAnswers = shuffle([
      ...quizzes[current].incorrect_answers,
      quizzes[current].correct_answer,
    ]);
    setAnswers(shuffledAnswers);
  }
}, [current, quizzes]);


  function handleAnswerSelection(answer) {
    if (!quizzes || quizzes.length === 0 || !quizzes[current]) {
      return;
    }

    if (answer === quizzes[current].correct_answer) {
      setScore((prev) => prev + 1);
    }
    setSelectedAnswer(answer);

    setTimeout(() => {
      if (current < quizzes.length - 1) {
        setCurrent((prev) => prev + 1);
        setSelectedAnswer(null);
        setTimeLeft(15);
      } else {
        setQuizFinished(true);
      }
    }, 1000);
  }

  return (
    <View style={styles.container}>
      {!started ? (
        generating ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size={50} color="#47b528" />
            <Text
              style={[styles.loadingText, { fontSize: 20, fontWeight: "bold" }]}
            >
              Generating Questions...
            </Text>
          </View>
        ) : (
          <View style={styles.startContainer}>
            <Text style={styles.title}>Enter Number of Questions</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              maxLength={2}
              placeholder="1-30"
              onChangeText={(text) =>
                setNumQuestions(text.replace(/[^0-30]/g, ""))
              }
              value={numQuestions}
            />
            <TouchableOpacity
              style={[
                styles.startButton,
                (!numQuestions ||
                  parseInt(numQuestions) < 1 ||
                  parseInt(numQuestions) > 30) && { opacity: 0.5 },
              ]}
              onPress={fetchQuestions}
              disabled={
                !numQuestions ||
                parseInt(numQuestions) < 1 ||
                parseInt(numQuestions) > 30
              }
            >
              <Text style={styles.startButtonText}>Generate Questions</Text>
            </TouchableOpacity>
          </View>
        )
      ) : loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007BFF" />
          <Text style={styles.loadingText}>Loading Questions...</Text>
        </View>
      ) : quizFinished ? (
        <View style={styles.finishedContainer}>


          <View style={styles.quizCompleteBox}>
            <Text style={styles.finishedText}>Quiz Completed!</Text>
          </View>

          <Text
            style={[
              styles.largeScoreText,
              (score / numQuestions) * 100 >= 90
                ? styles.greenScore
                : (score / numQuestions) * 100 >= 50
                ? styles.blueScore
                : styles.redScore,
            ]}
          >
            {score} / {numQuestions}
          </Text>

          <Text style={styles.feedbackText}>
            {score / numQuestions >= 0.9
              ? "Excellent work! You're a quiz master! 🌟"
              : score / numQuestions >= 0.5
              ? "Good job! Keep practicing! 👍"
              : "Don't give up! Try again! 💪"}
          </Text>

          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => {
              setStarted(false);
              setNumQuestions("");
              setQuizzes([]);
            }}
          >
            <Text style={styles.retryText}>Retry Quiz</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.quizContainer}>
          {/* Timer & Question Counter */}
          <View style={styles.topBar}>
            <Text style={styles.timerText}>
              {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
              {String(timeLeft % 60).padStart(2, "0")}
            </Text>
            <View style={styles.questionCounter}>
              <Text style={styles.questionCounterText}>
                {current + 1} / {numQuestions}
              </Text>
            </View>
          </View>

          {/* Question */}
          <Text style={styles.question}>
            {quizzes[current]
              ? quizzes[current].question
              : "Loading question..."}
          </Text>

          {/* Answer Options */}
          <View style={styles.answersContainer}>
            {answers.map((answer, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.answerButton,
                  selectedAnswer && answer === quizzes[current].correct_answer
                    ? styles.correctAnswer
                    : selectedAnswer === answer
                    ? styles.wrongAnswer
                    : null,
                ]}
                onPress={() => handleAnswerSelection(answer)}
                disabled={!!selectedAnswer}
              >
                <Text
                  style={[
                    styles.answerText,
                    selectedAnswer && answer === quizzes[current].correct_answer
                      ? styles.correctAnswerText
                      : selectedAnswer === answer
                      ? styles.wrongAnswerText
                      : null,
                  ]}
                >
                  {answer}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Navigation Buttons */}
          <View style={styles.navButtons}>
            <TouchableOpacity
              style={[styles.navButton, current === 0 && styles.disabledButton]}
              onPress={() => {
                if (current > 0) {
                  setCurrent((prev) => prev - 1);
                  setTimeLeft(15);
                }
              }}
              disabled={current === 0}
            >
              <Text style={styles.navButtonText}>Previous</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.navButton,
                current === quizzes.length - 1 && styles.disabledButton,
              ]}
              onPress={() => {
                if (current < quizzes.length - 1) {
                  setCurrent((prev) => prev + 1);
                  setTimeLeft(15);
                } else {
                  setQuizFinished(true);
                }
              }}
              disabled={current === quizzes.length - 1}
            >
              <Text style={styles.navButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    padding: 20,
  },

  startContainer: {
    alignItems: "center",
  },
  input: {
    width: 120,
    height: 70,
    borderWidth: 2,
    borderColor: "#919191",
    borderRadius: 15,
    textAlign: "center",
    fontSize: 22,
    marginBottom: 30,
    marginTop: 30,
    color: "#c7c7c7",
  },

  startButton: {
    backgroundColor: "#47b528",

    paddingVertical: 18,

    paddingHorizontal: 45,

    borderRadius: 30,

    alignItems: "center",
  },

  startButtonText: {
    color: "white",

    fontSize: 18,

    fontWeight: "bold",
  },

  loadingContainer: {
    justifyContent: "center",

    alignItems: "center",
  },

  loadingText: {
    marginTop: 10,

    fontSize: 18,

    color: "black",
  },

  quizContainer: {
    width: "100%",

    maxWidth: 500,

    backgroundColor: "white",

    padding: 20,

    borderRadius: 15,

    shadowColor: "#000",

    shadowOffset: { width: 0, height: 3 },

    shadowOpacity: 0.2,

    shadowRadius: 5,

    elevation: 5,
  },

  questionNumber: {
    fontSize: 18,

    fontWeight: "bold",

    marginBottom: 10,

    color: "black",
  },

  title: {
    fontSize: 42,

    fontWeight: "bold",

    marginBottom: 12,

    color: "black",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  timerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  questionCounter: {
    backgroundColor: "#47b528",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  questionCounterText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  question: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
    color: "black",
  },
  answersContainer: {
    marginTop: 10,
  },
  answerButton: {
    padding: 15,
    borderRadius: 30,
    marginBottom: 10,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#7b8a81",
    backgroundColor: "transparent",
  },
  answerText: {
    color: "#7b8a81",
    fontSize: 18,
    fontWeight: "bold",
  },
  correctAnswer: {
    backgroundColor: "#47b528",
  },
  correctAnswerText: {
    color: "#FFFFFF",
  },
  wrongAnswer: {
    backgroundColor: "#FF4C4C",
  },
  wrongAnswerText: {
    color: "#FFFFFF",
  },
  navButtons: {
    flexDirection: "row",

    justifyContent: "space-between",

    marginTop: 20,
  },

  navButton: {
    padding: 15,

    backgroundColor: "#47b528",

    borderRadius: 30,

    marginHorizontal: 10,

    minWidth: 100,

    alignItems: "center",
  },

  navButtonText: {
    color: "white",

    fontSize: 16,

    fontWeight: "bold",
  },

  disabledButton: {
    backgroundColor: "gray",
  },

  finishedContainer: {
    justifyContent: "center",

    alignItems: "center",

    padding: 30,
  },

  quizCompleteBox: {
    //borderWidth: 1,

    // borderColor: "#47b528",

    //  borderRadius: 10,

    paddingVertical: 15,

    paddingHorizontal: 40,

    marginBottom: 30,
  },

  finishedText: {
    fontSize: 46,

    fontWeight: "bold",

    color: "black",

    textAlign: "center",

    lineHeight: 36,
  },

  largeScoreText: {
    fontSize: 150,

    fontWeight: "bold",

    textAlign: "center",

    marginBottom: 20,
  },

  redScore: {
    color: "red",
  },

  blueScore: {
    color: "#6778cf",
  },

  greenScore: {
    color: "#47b528",
  },

  feedbackText: {
    fontSize: 20,

    fontWeight: "bold",

    textAlign: "center",

    marginBottom: 25,

    color: "black",

    lineHeight: 30,
  },

  retryButton: {
    backgroundColor: "#47b528",

    paddingVertical: 18,

    paddingHorizontal: 60,

    borderRadius: 30,

    alignItems: "center",

    marginTop: 20,
  },

  retryText: {
    color: "white",

    fontSize: 20,

    fontWeight: "bold",
  },
});
