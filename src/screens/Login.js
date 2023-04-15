import React, { useState, useContext } from "react";
import { View, Text } from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";
import api from "../utils/api";
import AuthContext from "../AuthContext";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setUser } = useContext(AuthContext);

  const handleLogin = async () => {
    const isValidUser = await api.validateUser(username, password);

    if (isValidUser) {
      setErrorMessage("");
      const user = { username }; // or any other user information you want to store
      setUser(user);
      navigation.navigate("DrawerNavigator");
    } else {
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Input placeholder="Username" onChangeText={setUsername} />
      <Input
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
  },
  error: {
    color: "red",
  },
};

export default Login;
