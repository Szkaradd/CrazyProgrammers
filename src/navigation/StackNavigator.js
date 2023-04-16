import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DrawerNavigator } from "./DrawerNavigator";
import Login from "../screens/Login";
import CurrentTask from "../tasks/CurrentTask";
import BreakPage from "../breaks/BreakPage";

const Stack = createNativeStackNavigator();

export const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={Login} options={{ title: "Login" }} />
    <Stack.Screen
      name="DrawerNavigator"
      component={DrawerNavigator}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="CurrentTask"
      component={CurrentTask}
      options={{ title: "Current Task" }}
    />
    <Stack.Screen
      name="Break"
      component={BreakPage}
      options={{ title: "Break" }}
    />
  </Stack.Navigator>
);
