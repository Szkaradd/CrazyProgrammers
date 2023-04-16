import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Login from "./src/screens/Login";
import Home from "./src/screens/Home";
import AuthContext from "./src/AuthContext";
import Profile from "./src/screens/Profile";
import CustomDrawerContent from "./src/components/CustomDrawerContent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NewTask from "./src/tasks/NewTask";
import CurrentTask from "./src/tasks/CurrentTask";
import { TaskProvider } from './src/tasks/TaskContext';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerContent {...props} />}
  >
    <Drawer.Screen name="Home" component={Home} />
    <Drawer.Screen name="Profile" component={Profile} />
    <Drawer.Screen name="New Task" component={NewTask} />
  </Drawer.Navigator>
);

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
    <TaskProvider>
      <AuthContext.Provider value={{ user, setUser }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ title: "Login" }}
            />
            <Stack.Screen
              name="DrawerNavigator"
              component={DrawerNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Current Task"
              component={CurrentTask}
              options={{ title: "Current Task" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </TaskProvider>
  );
};

export default App;
