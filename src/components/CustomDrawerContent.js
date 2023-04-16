import React, { useContext } from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import AuthContext from "../AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomDrawerContent = (props) => {
  const { setUser } = useContext(AuthContext);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("user");
    setUser(null);
    props.navigation.navigate("Login");
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={handleLogout} />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
