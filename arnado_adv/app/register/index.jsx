import { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [imageError, setImageError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const router = useRouter();

  const pickImage = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("You need to allow access to your photos to upload an image.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setImageError("");
    }
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    if (!text.includes("@")) {
      setEmailError("Email must contain @");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);

    if (text.length < 6) {
      setPasswordStrength("Weak ❌");
      setPasswordError("Password must be at least 6 characters.");
    } else if (text.match(/[A-Z]/) && text.match(/\d/)) {
      setPasswordStrength("Strong ✅");
      setPasswordError("");
    } else {
      setPasswordStrength("Medium ⚠️");
      setPasswordError("");
    }
  };

  const handleRegister = () => {
    let hasError = false;

    if (!name) {
      setNameError("Name is required.");
      hasError = true;
    } else {
      setNameError("");
    }

    if (!email) {
      setEmailError("Email is required.");
      hasError = true;
    }

    if (!password) {
      setPasswordError("Password is required.");
      hasError = true;
    }

    if (!image) {
      setImageError("Profile image is required.");
      hasError = true;
    }

    if (passwordStrength === "Weak ❌") {
      setPasswordError("Password must be Medium or Strong.");
      hasError = true;
    }

    if (hasError) return;

    console.log("Registered with:", { name, email, password, image });

    Toast.show({
      type: "success",
      text1: "Registration Successful",
      visibilityTime: 2000,
    });

    setTimeout(() => {
      router.push("/login");
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text style={styles.imageText}>Upload Image</Text>
        )}
      </TouchableOpacity>
      {imageError ? <Text style={styles.errorText}>{imageError}</Text> : null}

      {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />

      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={handleEmailChange}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={handlePasswordChange}
      />

      {password ? (
        <Text
          style={[
            styles.passwordStrength,
            passwordStrength === "Weak ❌"
              ? { color: "red" }
              : passwordStrength === "Medium ⚠️"
              ? { color: "orange" }
              : { color: "green" },
          ]}
        >
          {passwordStrength}
        </Text>
      ) : null}

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.secondaryButtonText}>Go to Login</Text>
      </TouchableOpacity>

      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
  },
  imageUpload: {
    width: 120,
    height: 120,
    backgroundColor: "#ddd",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    overflow: "hidden",
  },
  imageText: {
    fontSize: 14,
    color: "#666",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#f0f0f0",
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#000",
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  passwordStrength: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007bff",
    width: "100%",
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  secondaryButton: {
    marginTop: 15,
  },
  secondaryButtonText: {
    color: "#007bff",
    fontSize: 16,
    fontWeight: "600",
  },
});
