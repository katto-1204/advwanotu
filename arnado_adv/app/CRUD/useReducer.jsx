import React, { useReducer, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";

interface Task {
  title: string;
  description: string;
  subtasks: string[];
  tags: string[];
}

interface Action {
  type: "add" | "delete" | "update" | "addSubtask" | "deleteSubtask";
  payload?: Task;
  index?: number;
  subtaskIndex?: number;
}

function taskReducer(state: Task[], action: Action) {
  switch (action.type) {
    case "add":
      return action.payload ? [...state, action.payload] : state;
    case "delete":
      return state.filter((_, index) => index !== action.index);
    case "update":
      return state.map((task, index) =>
        index === action.index ? { ...task, ...action.payload } : task
      );
    case "addSubtask":
      return state.map((task, index) =>
        index === action.index
          ? { ...task, subtasks: [...task.subtasks, "New Subtask"] }
          : task
      );
    case "deleteSubtask":
      return state.map((task, index) =>
        index === action.index
          ? { ...task, subtasks: task.subtasks.filter((_, i) => i !== action.subtaskIndex) }
          : task
      );
    default:
      return state;
  }
}

export default function TaskManager() {
  const [tasks, dispatch] = useReducer(taskReducer, []);
  const [input, setInput] = useState("");
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);


  const addTask = () => {
    if (input.trim()) {
      dispatch({ type: "add", payload: { title: input, description: "", subtasks: [], tags: [] } });
      setInput("");
    }
  };

  const updateTask = (key, value) => {
    if (selectedTaskIndex !== null) {
      dispatch({ type: "update", index: selectedTaskIndex, payload: { [key]: value } });
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.leftPanel}>
        <Text style={styles.title}>Today <Text style={styles.count}>{tasks.length}</Text></Text>
        <View style={styles.addTaskContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add New Task"
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity onPress={addTask} style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <FlatList
  data={tasks}
  keyExtractor={(_, index) => index.toString()}
  renderItem={({ item, index }) => (
    <TouchableOpacity style={styles.taskItem} onPress={() => setSelectedTaskIndex(index)}>
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text style={styles.taskDescription}>{item.description}</Text>
    </TouchableOpacity>
  )}
/>

      </View>
      <View style={styles.rightPanel}>
      {selectedTaskIndex !== null ? (
  <>
    <Text style={styles.sectionTitle}>Task Details</Text>
    
    <Text style={styles.label}>Title</Text>
    <TextInput
      style={styles.input}
      placeholder="Task Title"
      value={tasks[selectedTaskIndex].title}
      onChangeText={(text) => updateTask("title", text)}
    />
    
    <Text style={styles.label}>Description</Text>
    <TextInput
      style={styles.input}
      placeholder="Description"
      value={tasks[selectedTaskIndex].description}
      onChangeText={(text) => updateTask("description", text)}
    />
    
<View style={styles.buttonContainer}>
  <TouchableOpacity
    style={styles.saveButton}
    onPress={() => alert("Changes Saved!")}
  >
    <Text style={styles.saveButtonText}>Save Changes</Text>
  </TouchableOpacity>
  
  <TouchableOpacity
    style={styles.deleteButton}
    onPress={() => {
      dispatch({ type: "delete", index: selectedTaskIndex });
      setSelectedTaskIndex(null);
    }}
  >
    <Text style={styles.deleteButtonText}>Delete Task</Text>
  </TouchableOpacity>
</View>

  </>
) : (
  <Text>Select a task to view details</Text>
)}

</View>

    </View>
  );
}
<Text>Select a task to view details</Text>
const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "row" },
  leftPanel: { flex: 1, padding: 20, backgroundColor: "#f4f4f4" },
  rightPanel: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: "bold" },
  count: { color: "#007bff" },
  addTaskContainer: { flexDirection: "row", marginVertical: 10 },
  input: { 
    flex: 1, 
    borderWidth: 1, 
    borderColor: "#ccc", 
    padding: 8, 
    borderRadius: 8, 
    fontSize: 14, 
    minHeight: 40,
    maxHeight: 100
  },
  addButton: { backgroundColor: "#007bff", padding: 15, borderRadius: 8, marginLeft: 10 },
  addButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  taskItem: { padding: 15, backgroundColor: "#fff", borderBottomWidth: 1, borderColor: "#ccc" },
  sectionTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  subtaskButton: { marginVertical: 10, backgroundColor: "#e7f1ff", padding: 10, borderRadius: 8 },
  subtask: { flexDirection: "row", justifyContent: "space-between", padding: 10, backgroundColor: "#f9f9f9", marginVertical: 5, borderRadius: 8 },
  deleteText: { color: "#dc3545", fontWeight: "bold" },
  deleteButton: { marginTop: 20, backgroundColor: "#dc3545", padding: 15, borderRadius: 8 },
  deleteButtonText: { color: "#fff", fontWeight: "bold" },
  taskTitle: { fontWeight: "bold", fontSize: 16 },
taskDescription: { fontSize: 12, color: "#666" },
label: {
  fontSize: 14,
  fontWeight: "bold",
  marginTop: 10,
},
buttonContainer: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 20,
},

saveButton: {
  backgroundColor: "#007bff",
  padding: 15,
  borderRadius: 8,
  flex: 1,
  marginRight: 10,
},

saveButtonText: {
  color: "#fff",
  fontWeight: "bold",
  textAlign: "center",
},

deleteButton: {
  backgroundColor: "#dc3545",
  padding: 15,
  borderRadius: 8,
  flex: 1,
},

deleteButtonText: {
  color: "#fff",
  fontWeight: "bold",
  textAlign: "center",
}


});
