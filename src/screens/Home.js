import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AuthContext from "../AuthContext";

const Home = ({ navigation }) => {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    setUser(null);
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user?.username ?? "guest"}!</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 24,
  },
});

export default Home;
