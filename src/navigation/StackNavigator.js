import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DrawerNavigator } from "./DrawerNavigator";
import Login from "../screens/Login";
import StartBreak from "../breaks/StartBreak";
import BreakPage from "../breaks/BreakPage";
import EndBreak from "../breaks/EndBreak";
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
      name="StartBreak"
      component={StartBreak}
      options={{
        title: "Break",
        headerShown: false,
        gestureEnabled: false,
      }}
    />
    <Stack.Screen
      name="BreakPage"
      component={BreakPage}
      options={{
        title: "Break",
        headerShown: false,
        gestureEnabled: false,
      }}
    />
    <Stack.Screen
      name="EndBreak"
      component={EndBreak}
      options={{
        title: "Break",
        headerShown: false,
        gestureEnabled: false,
      }}
    />
  </Stack.Navigator>
);
