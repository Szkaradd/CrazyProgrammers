import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import CustomDrawerContent from "./components/CustomDrawerContent";
import CurrentTask from "./tasks/CurrentTask";
import NewTask from "./tasks/NewTask";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => (
  <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerContent {...props} />}
  >
    <Drawer.Screen name="Home" component={Home} />
    <Drawer.Screen name="Profile" component={Profile} />
    <Drawer.Screen
      name="CurrentTask"
      component={CurrentTask}
      options={{
        title: "Current Task",
        gestureEnabled: false,
      }}
    />
  </Drawer.Navigator>
);

export const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Login"
      component={Login}
      options={{
        title: "Login",
        gestureEnabled: false,
      }}
    />
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
      initialParams={{ task_details: null }}
    />
  </Stack.Navigator>
);
