import { View, Text, SafeAreaView, StyleSheet, Alert, FlatList, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useContext } from "react";
import { TaskContext } from "./TaskContext";
import { DeleteTask } from "../data/tasks";
import { CurrentTaskContext } from './CurrentTaskContext';

export default function CurrentTask() {
    const { tasks, setTasks } = useContext(TaskContext);
    const { currentTaskVar, setCurrentTaskVar } = useContext(CurrentTaskContext);
    const navigation = useNavigation();
    const task_details = currentTaskVar;
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
            <Text style={styles.text_style}>Your current task</Text>
          </View>
  
          <View style={styles.task_container}>
            <FlatList
              data={task_details}
              renderItem={({ item }) => <ListItem item={item} />}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={() => <View style={list_styles.separator} />}
            />
          </View>
  
          <View style={styles.finish_style}>
            <Button
                title="Finish task"
                color="white"
                onPress={() => Alert.alert("Are you sure?", "I have finished this task", [
                    {text: "Yes", onPress: () => {
                        setTasks(DeleteTask(tasks, task_id));
                        Alert.alert("Well done!");
                        navigation.navigate('NewTask', {task_details: null});
                    }},
                    {text: "No", onPress: () => Alert.alert("Keep working. Good luck!")}
                ])} 
            />
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
        color: 'black',
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
        backgroundColor: '#2986cc',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text_style: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
    },
    task_container: {
        backgroundColor: '#cfe2f3',
        flex: 4,
        paddingRight: 10,
        justifyContent: 'center',
    },
    finish_style: {
        backgroundColor: '#cc0000',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});