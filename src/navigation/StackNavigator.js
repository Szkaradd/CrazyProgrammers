import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DrawerNavigator } from "./DrawerNavigator";
import Login from "../screens/Login";
import BreakPage from "../breaks/BreakPage";
import NewTask from "../tasks/NewTask";
import { Location } from "../data/tasks";

const Stack = createNativeStackNavigator();

export const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={Login} options={{ title: "Login" }} />
    <Stack.Screen
      name="DrawerNavigator"
      component={DrawerNavigator}
      options={{
        headerShown: false,
        gestureEnabled: false,
      }}
    />
    <Stack.Screen
      name="NewTask"
      component={NewTask}
      options={{
        title: "New Task",
        headerShown: false,
        gestureEnabled: false,
      }}
      initialParams={{ task_details: null, curr_loc: new Location(1, "A") }}
    />
    <Stack.Screen
      name="Break"
      component={BreakPage}
      options={{ title: "Break" }}
    />
  </Stack.Navigator>
);