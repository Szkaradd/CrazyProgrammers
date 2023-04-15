import React from "react";
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
          {user ? (
            <Stack.Screen name="Home" component={Home} />
          ) : (
            <Stack.Screen name="Login" component={Login} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
