import React, { useState, useEffect } from "react";
import { StyleSheet, Text, SafeAreaView, Image } from "react-native";
import { setBreakEnd } from "./BreakManager";
import { useNavigation } from "@react-navigation/native";

const BreakPage = () => {
  const navigation = useNavigation();
  const breakLength = 30 * 60; // 30 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(breakLength);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((seconds) => seconds - 1);
    }, 1000);
    if (timeLeft === 0) {
      setBreakEnd(new Date());
      navigation.navigate("EndBreak");
    }
    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.breakText}>It's time for a break!</Text>
      <Text style={styles.timeLeft}>{formatTime(timeLeft)}</Text>
      <Text style={styles.encouragement}>
        We encourage you to do some stretching exercises:
      </Text>
      <Image
        source={require("../../assets/stretch-workout.jpg")}
        style={{
          width: 460,
          height: 460,
          resizeMode: "contain",
          marginTop: 20,
        }}
      />
    </SafeAreaView>
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
  timeLeft: {
    fontSize: 50,
  },
  buttonText: {
    fontSize: 24,
    color: "#FFFFFF",
  },
  encouragement: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    paddingLeft: 25,
    paddingRight: 25,
  },
});

export default BreakPage;
