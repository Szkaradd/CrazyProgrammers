import React, { useState, useEffect, useCallback } from "react";
import { Text, Alert } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const Timer = (props) => {
  const navigation = useNavigation();
  const task_details = props.task_details;
  const duration = props.duration;
  const [seconds, setSeconds] = useState(duration);

  const resetTimer = useCallback(() => {
    setSeconds(duration);
  }, [duration, task_details]);

  useEffect(() => {
    resetTimer();
  }, [resetTimer]);

  useFocusEffect(
    useCallback(() => {
      resetTimer();
      const interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);

      return () => clearInterval(interval);
    }, [resetTimer])
  );

  useEffect(() => {
    if (seconds === 0) {
      Alert.alert("Task accepted automatically");
      navigation.navigate("CurrentTask", { task_details });
    }
  }, [seconds]);

  return (
    <Text style={{ color: "white", fontSize: 15 }}>
      After {seconds} seconds the task will be accepted
    </Text>
  );
};

export default Timer;
