import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import CustomDrawerContent from "../components/CustomDrawerContent";
import NewTask from "../tasks/NewTask";

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => (
  <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerContent {...props} />}
  >
    <Drawer.Screen name="Home" component={Home} />
    <Drawer.Screen name="Profile" component={Profile} />
    <Drawer.Screen
      name="NewTask"
      options={{ title: "New Task" }}
      component={NewTask}
      initialParams={{ task_details: null }}
    />
  </Drawer.Navigator>
);
