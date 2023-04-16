import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import CustomDrawerContent from "../components/CustomDrawerContent";
import CurrentTask from "../tasks/CurrentTask";

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
      }}
    />
  </Drawer.Navigator>
);
