import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const EndBreak = () => {
  const navigation = useNavigation();

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleViewNewTask = () => {
    navigation.navigate("NewTask", { task_details: null });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.breakText}>End of break!</Text>
      <Text style={styles.timeLeft}>{formatTime(0)}</Text>
      <Text style={styles.afterBreakMessage}>We hope you rested :)</Text>
      <TouchableOpacity
        style={styles.viewNewTaskButton}
        onPress={handleViewNewTask}
      >
        <Text style={styles.buttonText}>View new task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  breakText: {
    fontSize: 40,
    marginBottom: 20,
    fontWeight: "bold",
  },
  timeLeft: {
    fontSize: 50,
  },
  viewNewTaskButton: {
    marginTop: 40,
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 24,
    color: "#FFFFFF",
  },
  afterBreakMessage: {
    fontSize: 25,
    marginTop: 20,
  },
});

export default EndBreak;
