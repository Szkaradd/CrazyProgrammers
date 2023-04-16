import React, { useContext, useEffect } from "react";
import { Alert } from "react-native";
import { CurrentTaskContext } from "../context/CurrentTaskContext";
import CurrentTask from "../tasks/CurrentTask";

const CurrentTaskWrapper = (props) => {
  const { currentTaskVar } = useContext(CurrentTaskContext);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      if (currentTaskVar === null) {
        Alert.alert("No Current Task", "There is no current task available.", [
          { text: "OK" },
        ]);
        props.navigation.goBack(); // Navigate back to the previous screen
      }
    });

    return unsubscribe;
  }, [currentTaskVar, props.navigation]);

  if (currentTaskVar === null) {
    return null;
  }

  return <CurrentTask {...props} />;
};

export default CurrentTaskWrapper;
