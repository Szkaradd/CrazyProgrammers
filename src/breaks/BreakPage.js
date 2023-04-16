import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { setBreakEnd } from "./BreakManager";
import { useNavigation } from "@react-navigation/native";

const BreakPage = () => {
  const navigation = useNavigation();

  const breakLength = 5; // 30 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(breakLength);
  const [timerActive, setTimerActive] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    let interval = null;
    if (timerActive) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (!timerActive && timeLeft !== 0) {
      clearInterval(interval);
    }
    if (timeLeft === 0) {
      setBreakEnd(new Date());
    }
  }, [timerActive, timeLeft]);

  const handleStartBreak = () => {
    setTimerActive(true);
    setButtonClicked(true);
  };

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
      {timeLeft > 0 && (
        <Text style={styles.breakText}>It's time for a break!</Text>
      )}
      {timeLeft <= 0 && <Text style={styles.breakText}>End of break!</Text>}
      {timeLeft <= 0 && (
        <TouchableOpacity
          style={styles.startBreakButton}
          onPress={handleViewNewTask}
        >
          <Text style={styles.buttonText}>View new task</Text>
        </TouchableOpacity>
      )}
      {timeLeft >= 0 && (
        <Text style={styles.timeLeft}>{formatTime(timeLeft)}</Text>
      )}
      {!buttonClicked && (
        <TouchableOpacity
          style={styles.startBreakButton}
          onPress={handleStartBreak}
        >
          <Text style={styles.buttonText}>Start your break</Text>
        </TouchableOpacity>
      )}
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
    fontSize: 30,
    marginBottom: 20,
  },
  timeLeft: {
    fontSize: 50,
  },
  startBreakButton: {
    marginTop: 20,
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 24,
    color: "#FFFFFF",
  },
});

export default BreakPage;
