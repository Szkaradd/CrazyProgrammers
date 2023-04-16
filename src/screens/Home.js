import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { Icon } from "react-native-elements";
import AuthContext from "../context/AuthContext";
import * as Font from "expo-font";

const Home = ({ navigation }) => {
  const { user, setUser } = useContext(AuthContext);
  const [fontLoaded, setFontLoaded] = useState(false);

  const loadFont = async () => {
    await Font.loadAsync({
      "Montserrat-Bold": require("../../assets/fonts/Montserrat-Bold.ttf"),
      "Montserrat-Regular": require("../../assets/fonts/Montserrat-Regular.ttf"),
    });
    setFontLoaded(true);
  };

  useEffect(() => {
    loadFont();
  }, []);

  if (!fontLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../assets/background.png")}
        style={styles.image}
      >
        <View style={styles.content}>
          <Text style={styles.title}>
            Welcome, {user?.username ?? "guest"}!
          </Text>
          <Text style={styles.subtitle}>Get things done today!</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("NewTask")}
          >
            <Icon name="check" size={30} color="white" />
            <Text style={styles.buttonText}>View new task</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 40,
    color: "white",
    marginBottom: 25,
    fontFamily: "Montserrat-Bold",
    textShadowColor: "black",
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 28,
    color: "white",
    marginBottom: 30,
    fontFamily: "Montserrat-Bold",
    textShadowColor: "black",
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 3,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#3f51b5",
  },
  buttonText: {
    marginLeft: 10,
    color: "#fff",
    fontSize: 18,
    fontFamily: "Montserrat-Regular",
  },
});

export default Home;
