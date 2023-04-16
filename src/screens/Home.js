import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { Icon } from "react-native-elements";
import AuthContext from "../context/AuthContext";
import { CurrentTaskContext } from "../context/CurrentTaskContext";
import * as Font from "expo-font";
import { Asset } from "expo-asset";

const Home = ({ navigation }) => {
  const { user, setUser } = useContext(AuthContext);
  const { currentTaskVar } = useContext(CurrentTaskContext);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const loadFontAndImage = async () => {
    await Font.loadAsync({
      "Montserrat-Bold": require("../../assets/fonts/Montserrat-Bold.ttf"),
      "Montserrat-Regular": require("../../assets/fonts/Montserrat-Regular.ttf"),
    });

    const imageAsset = Asset.fromModule(require("../../assets/background.png"));
    await imageAsset.downloadAsync();

    setFontLoaded(true);
    setImageLoaded(true);
  };

  useEffect(() => {
    loadFontAndImage();
  }, []);

  if (!fontLoaded || !imageLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3f51b5" />
      </View>
    );
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
          {!currentTaskVar && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("NewTask")}
            >
              <Icon name="check" size={30} color="white" />
              <Text style={styles.buttonText}>View new task</Text>
            </TouchableOpacity>
          )}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;
