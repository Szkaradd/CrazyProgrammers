import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigator } from "./src/Navigation";
import { AppContext } from "./src/Context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to fetch stored user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getUserData();
  }, []);

  if (isLoading) {
    return null; // Show a loading screen
  }

  return (
    <AppContext>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </AppContext>
  );
};

export default App;
