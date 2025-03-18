import { useContext, useState } from "react";
import { View, Text, TextInput, Button, Switch, StyleSheet, ScrollView, Alert, TouchableOpacity } from "react-native";
import { UserContext } from "../useContext";
import { Avatar, DataTable, IconButton } from "react-native-paper";

export default function UserInfo() {
  const { users, dispatch } = useContext(UserContext);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
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

    clearForm();
  };

  const updateUser = () => {
    if (selectedIndex === null) {
      Alert.alert("Error", "No user selected for update.");
      return;
    }

    dispatch({
      type: "update",
      index: selectedIndex,
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

    clearForm();
    Alert.alert("Success", "User updated successfully.");
  };

  const deleteUser = (index: number) => {
    dispatch({ type: "delete", index });
    Alert.alert("Success", "User deleted successfully.");
  };

  const selectUser = (user: any, index: number) => {
    setSelectedIndex(index);
    setName(user.name);
    setRole(user.role);
    setStatus(user.status);
    setPromote(user.promote);
    setRating(user.rating);
    setLastLogin(user.lastLogin);
  };

  const clearForm = () => {
    setSelectedIndex(null);
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
            <Text style={styles.cardValue}>{avgRating}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>{selectedIndex === null ? "Add User" : "Update User"}</Text>
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
      color="#FFD700" // Gold color for stars
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

        {selectedIndex === null ? (
          <Button title="Add User" onPress={addUser} color="#007bff" />
        ) : (
          <Button title="Update User" onPress={updateUser} color="#28a745" />
        )}

        <DataTable>
          <DataTable.Header>
            <DataTable.Title>User</DataTable.Title>
            <DataTable.Title>Role</DataTable.Title>
            <DataTable.Title>Status</DataTable.Title>
            <DataTable.Title>Rating</DataTable.Title>
            <DataTable.Title>Actions</DataTable.Title>
          </DataTable.Header>

          {users.map((user, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell>
                <Avatar.Image size={32} source={{ uri: user.avatar }} />
                <Text> {user.name}</Text>
              </DataTable.Cell>
              <DataTable.Cell>{user.role}</DataTable.Cell>
              <DataTable.Cell>{user.status}</DataTable.Cell>
              <DataTable.Cell>{user.rating}</DataTable.Cell>
              <DataTable.Cell>
                <IconButton icon="pencil" size={20} onPress={() => selectUser(user, index)} />
                <IconButton icon="delete" size={20} onPress={() => deleteUser(index)} />
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    alignItems: "center",
  },
  container: {
    width: "90%",
    backgroundColor: "white",
    alignItems: "center",
    paddingBottom: 20,
    borderRadius: 12,
    elevation: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#007bff",
  },
  overviewContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 30,
  },
  card: {
    width: "30%",
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
  },
  highlightCard: {
    backgroundColor: "#007bff",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  cardValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#007bff",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#555",
  },
  formContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 30,
  },
  leftColumn: {
    width: "48%",
  },
  rightColumn: {
    width: "48%",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginVertical: 15,
    padding: 8,
    width: "100%",
    fontSize: 14,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  starRating: {
    flexDirection: "row",
    justifyContent: "center",
  },
  selectionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 15,
  },
  selectionButton: {
    padding: 12,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#007bff",
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: "#007bff",
  },
  buttonText: {
    color: "black",
  },
  selectedText: {
    color: "white",
    fontWeight: "bold",
  },
  dataTable: {
    width: "100%",
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
  },
  dataRow: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    height: 60,
    alignItems: "center",
  },
  dataHeader: {
    backgroundColor: "#007bff",
    height: 60,
  },
  dataHeaderText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  actionButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#eee",
    marginHorizontal: 4,
  },
});
