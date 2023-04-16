import { Button } from "react-native";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Alert,
  Platform,
  StatusBar,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Timer from "./Timer";
import { AssignTask } from "./AssignTask";
import React, { useContext } from "react";
import { TaskContext } from "./TaskContext";
import { GetTaskDetails, Location, DeleteTask } from "../data/tasks";
import { CurrentTaskContext } from "./CurrentTaskContext";

function GetNewTaskDetails(tasks) {
  var loc = new Location(1, "A");
  var new_task = AssignTask(tasks, loc, "M", "FAR");
  return GetTaskDetails(new_task);
}

export default function NewTask({ route }) {
  const { tasks, setTasks } = useContext(TaskContext);
  const { currentTaskVar, setCurrentTaskVar } = useContext(CurrentTaskContext);
  const navigation = useNavigation();
  var { task_details } = route.params;

  if (task_details == null) {
    task_details = GetNewTaskDetails(tasks);
  }
  const task_id = task_details[4].value;

  const ListItem = ({ item }) => (
    <View style={list_styles.item}>
      <Text style={list_styles.text}>{item.label}:</Text>
      <Text style={list_styles.text}>{item.value}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title_container}>
        <Text style={styles.text_style}>You have a new task!</Text>
      </View>

      <View style={styles.task_container}>
        <FlatList
          data={task_details}
          renderItem={({ item }) => <ListItem item={item} />}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={list_styles.separator} />}
        />
        <View style={styles.timer_container}>
          <Timer task_details={task_details} duration={20} />
        </View>
      </View>

      <View style={styles.decision_container}>
        <View style={styles.accept_style}>
          <Button
            title="Accept"
            color="white"
            fontSize="50"
            onPress={() => {
              Alert.alert("Task Accepted");
              setCurrentTaskVar(task_details);
              navigation.navigate("CurrentTask", { task_details });
            }}
          />
        </View>
        <View style={styles.decline_style}>
          <Button
            title="Decline"
            color="white"
            onPress={() => {
              var new_tasks = DeleteTask(tasks, task_id);
              setTasks(new_tasks);
              Alert.alert("Task Declined");
              new_details = GetNewTaskDetails(new_tasks);
              navigation.navigate('NewTask');
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const list_styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 15,
  },
  text: {
    fontSize: 20,
    color: "white",
  },
  separator: {
    height: 1,
  },
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',
    //paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  title_container: {
    backgroundColor: "green",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text_style: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  task_container: {
    backgroundColor: "#077dc9",
    flex: 4,
    justifyContent: "center",
  },
  decision_container: {
    backgroundColor: "red",
    flex: 1,
    flexDirection: "row",
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  accept_style: {
    backgroundColor: "green",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  decline_style: {
    backgroundColor: "red",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  timer_container: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 15,
    paddingLeft: 15,
  },
});
