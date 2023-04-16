import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const StartBreak = () => {
  const navigation = useNavigation();

  const breakLength = 10; // 30 minutes in seconds

  const handleStartBreak = () => {
    navigation.navigate("BreakPage");
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.breakText}>It's time for a break!</Text>
      <Text style={styles.breakLength}>{formatTime(breakLength)}</Text>
      <TouchableOpacity
        style={styles.startBreakButton}
        onPress={handleStartBreak}
      >
        <Text style={styles.buttonText}>Start your break</Text>
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
    fontSize: 30,
    marginBottom: 20,
    fontWeight: "bold",
  },
  breakLength: {
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

export default StartBreak;
