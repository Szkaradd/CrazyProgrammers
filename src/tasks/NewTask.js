/*
This file contains the implementation of "New Task" screen
It shows the employee some information about a proposed task assignment,
the employee can either decline (at most 3 times a day!) or accept the assignment
*/

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
import { GetTaskDetails } from "../data/tasks";
import { Location } from "../data/tasks";
import { timeForBreak } from "../breaks/BreakManager";
import { useEffect } from "react";
import { CurrentTaskContext } from "../context/CurrentTaskContext";
import { user } from "../User";
import { DeleteTask } from "../data/tasks";

export default function NewTask({ route }) {
  var { task, curr_loc } = route.params;
  const { tasks, setTasks } = useContext(TaskContext);
  const { currentTaskVar, setCurrentTaskVar } = useContext(CurrentTaskContext);
  const navigation = useNavigation();

  useEffect(() => { // break reminder handling
    if (timeForBreak()) {
      navigation.navigate("Break");
    }
  }, []);

  if (task == null) {
    task = AssignTask(tasks, curr_loc);
  }
  const task_id = task.package_id;
  var task_details = GetTaskDetails(task);

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
              setCurrentTaskVar(task);
              navigation.navigate("CurrentTask");
            }}
          />
        </View>
        <View style={styles.decline_style}>
          <Button
            title="Decline"
            color="white"
            onPress={() => {
              // declined - don't show this task again
              var new_tasks = DeleteTask(tasks, task_id);
              setTasks(new_tasks);
              Alert.alert("Task Declined");
              var new_task = AssignTask(new_tasks, curr_loc);
              navigation.navigate("NewTask", { task: new_task, curr_loc });
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
