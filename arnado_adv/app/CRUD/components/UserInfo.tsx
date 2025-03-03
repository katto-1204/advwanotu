import { useContext, useState } from "react";
import { View, Text, TextInput, Button, Switch, StyleSheet, ScrollView, Alert, TouchableOpacity } from "react-native";
import { UserContext } from "../useContext";
import { Avatar, DataTable, IconButton } from "react-native-paper";

export default function UserInfo() {
  const { users, dispatch } = useContext(UserContext);

  const [name, setName] = useState("");
  const [role, setRole] = useState("Viewer");
  const [status, setStatus] = useState("Active");
  const [promote, setPromote] = useState(false);
  const [rating, setRating] = useState(0);
  const [lastLogin, setLastLogin] = useState("");

  const addUser = () => {
    if (!name.trim() || !lastLogin.match(/^\d{4}-\d{2}-\d{2}$/)) {
      Alert.alert("Error", "All fields are required. Enter last login in YYYY-MM-DD format.");
      return;
    }

    dispatch({
      type: "add",
      user: {
        name,
        avatar: "https://via.placeholder.com/32",
        role,
        status,
        promote,
        rating,
        lastLogin,
      },
    });

    setName("");
    setRating(0);
    setPromote(false);
    setLastLogin("");
  };

  const totalUsers = users.length;
  const activeUsers = users.filter((user) => user.status === "Active").length;
  const avgRating = users.length > 0 ? (users.reduce((sum, user) => sum + user.rating, 0) / users.length).toFixed(1) : "N/A";

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>User Summary</Text>
        <View style={styles.overviewContainer}>
          <View style={[styles.card, styles.highlightCard]}>
            <Text style={[styles.cardTitle, { color: "white" }]}>Total Users</Text>
            <Text style={[styles.cardValue, { color: "white" }]}>{totalUsers}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Active Users</Text>
            <Text style={styles.cardValue}>{activeUsers}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Average Rating</Text>
            <View style={styles.starRating}>
              {[1, 2, 3, 4, 5].map((star) => (
                <IconButton
                  key={star}
                  icon={avgRating >= star ? "star" : "star-outline"}
                  color={avgRating >= star ? "#fbc02d" : "gray"}
                  size={20}
                />
              ))}
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Add User</Text>
        <View style={styles.formContainer}>
          <View style={styles.leftColumn}>
            <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />

            <Text>User Role</Text>
            <View style={styles.selectionContainer}>
              {["Administrator", "Viewer", "Moderator"].map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[styles.selectionButton, role === item && styles.selectedButton]}
                  onPress={() => setRole(item)}
                >
                  <Text style={role === item ? styles.selectedText : styles.buttonText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text>Status</Text>
            <View style={styles.selectionContainer}>
              {["Active", "Inactive"].map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[styles.selectionButton, status === item && styles.selectedButton]}
                  onPress={() => setStatus(item)}
                >
                  <Text style={status === item ? styles.selectedText : styles.buttonText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.rightColumn}>
            <View style={styles.switchRow}>
              <Text>Promote</Text>
              <Switch value={promote} onValueChange={setPromote} />
            </View>

            <Text>Rating</Text>
            <View style={styles.starRating}>
              {[1, 2, 3, 4, 5].map((star) => (
                <IconButton
                  key={star}
                  icon={rating >= star ? "star" : "star-outline"}
                  color={rating >= star ? "#fbc02d" : "gray"}
                  size={28}
                  onPress={() => setRating(star)}
                />
              ))}
            </View>

            <TextInput
              placeholder="Last Login (YYYY-MM-DD)"
              value={lastLogin}
              onChangeText={setLastLogin}
              style={styles.input}
            />
          </View>
        </View>

        <Button title="Add User" onPress={addUser} color="#007bff" />

        <DataTable>
          <DataTable.Header>
            <DataTable.Title>User</DataTable.Title>
            <DataTable.Title>Role</DataTable.Title>
            <DataTable.Title>Status</DataTable.Title>
            <DataTable.Title>Rating</DataTable.Title>
            <DataTable.Title>Last Login</DataTable.Title>
          </DataTable.Header>

          {users.map((user, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell>
                <Avatar.Image size={32} source={{ uri: user.avatar }} />
                <Text> {user.name}</Text>
              </DataTable.Cell>
              <DataTable.Cell>{user.role}</DataTable.Cell>
              <DataTable.Cell>{user.status}</DataTable.Cell>
              <DataTable.Cell>
                {[1, 2, 3, 4, 5].map((star) => (
                  <IconButton key={star} icon="star" color={star <= user.rating ? "#fbc02d" : "gray"} size={20} />
                ))}
              </DataTable.Cell>
              <DataTable.Cell>{user.lastLogin}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    scrollContainer: { flexGrow: 1, paddingVertical: 20, alignItems: "center" },
    container: { width: "90%", backgroundColor: "white", alignItems: "center", paddingBottom: 20 },
    header: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 30 },
    overviewContainer: { flexDirection: "row", justifyContent: "space-around", width: "100%", marginBottom: 30 },
    card: { width: "30%", padding: 15, backgroundColor: "#f0f0f0", borderRadius: 8, alignItems: "center", marginBottom: 0 },
    highlightCard: { backgroundColor: "#007bff" },
    cardTitle: { fontSize: 24, fontWeight: "bold", marginBottom: 0 },
    cardValue: { fontSize: 30, fontWeight: "bold", marginBottom: 0 },
    sectionTitle: { fontSize: 18, fontWeight: "bold", textAlign: "center", marginVertical: 20 },
    formContainer: { flexDirection: "row", justifyContent: "space-between", width: "90%", marginBottom: 30 },
    leftColumn: { width: "48%" },
    rightColumn: { width: "48%" },
    input: { borderBottomWidth: 1, marginVertical: 15, padding: 8, width: "100%", textAlign: "left" },
    switchRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
    starRating: { flexDirection: "row", justifyContent: "center", marginVertical: 0 },
    selectionContainer: { flexDirection: "row", justifyContent: "center", marginVertical: 15 },
    selectionButton: { padding: 12, marginHorizontal: 5, borderWidth: 1, borderRadius: 5, marginBottom: 10 },
    selectedButton: { backgroundColor: "#007bff" },
    buttonText: { color: "black" },
    selectedText: { color: "white", fontWeight: "bold" },
});
