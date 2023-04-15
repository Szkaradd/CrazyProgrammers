import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/screens/Login";
import Home from "./src/screens/Home";
import AuthContext from "./src/AuthContext";

const Stack = createStackNavigator();

const App = () => {
  const [user, setUser] = React.useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: "Login" }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: "Home" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
