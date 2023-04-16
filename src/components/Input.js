import React from "react";
import { StyleSheet, TextInput } from "react-native";

const Input = ({ placeholder, secureTextEntry, onChangeText }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#eee",
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    width: "80%",
    fontSize: 16,
  },
});

export default Input;
