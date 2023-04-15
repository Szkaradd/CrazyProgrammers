import React, { useContext } from "react";
import { View, Text, Button, StyleSheet, SafeAreaView } from "react-native";
import AuthContext from "../AuthContext";
import NavBar from "../components/NavBar";

const Home = ({ navigation }) => {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    setUser(null);
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbar}>
        <NavBar navigation={navigation} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome, {user?.username ?? "guest"}!</Text>
        <Button title="Logout" onPress={handleLogout} />
        <Button
          title="Go to my profile"
          onPress={() => navigation.navigate("Profile")}
        />
        <Button
          title="View new task"
          onPress={() => navigation.navigate("NewTask", { task_details: null })}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    width: "100%",
  },
  content: {
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
