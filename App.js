import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigator } from "./src/navigation/StackNavigator";
import { AppContext } from "./src/context/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const App = () => {
  const [user, setUser] = React.useState(null);
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
