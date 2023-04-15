import React, { useState, useEffect } from 'react';
import { Text, Alert } from 'react-native';
//import CurrentTask from './CurrentTask';


const Timer = () => {
  const [seconds, setSeconds] = useState(20);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (seconds === 0) {
        Alert.alert("Task Declined")
    }
  }, [seconds]);

  return (
    <Text>{seconds} seconds</Text>
  );
};

export default Timer;