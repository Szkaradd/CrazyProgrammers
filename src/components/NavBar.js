import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const NavBar = ({ navigation }) => {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.toggleDrawer()}
      >
        <Text style={styles.buttonText}>Menu</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => navigation.navigate("Profile")}
      >
        <Text style={styles.buttonText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: "#1a1a1a",
  },
  menuButton: {
    backgroundColor: "#3a3a3a",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  profileButton: {
    backgroundColor: "#3a3a3a",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default NavBar;
