import { Button } from 'react-native';
import { View, Text, SafeAreaView, StyleSheet, Alert, Platform, StatusBar } from 'react-native';
import { tasks } from './data/tasks';
import { useNavigation } from '@react-navigation/native';
import Timer from './Timer';

function AssignTask() {
    // TODO
    var task = tasks[0];
    return task;
}

export default function NewTask() {
  const navigation = useNavigation();

  const handleCurrentTask = () => {
    navigation.navigate('CurrentTask');
  };
  var task = AssignTask();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title_container}>
        <Text style={styles.text_style}>You have a new task!</Text>
      </View>

      <View style={styles.task_container}>
        <Text style={styles.text_style}>
            Weight: {task.weight}kg {'\n'}
            Location: {task.location} {'\n'}
            Destination: {task.destination} {'\n'}
            Total Distance: {task.total_distance}m {'\n'}
            Package ID: {task.package_id} {'\n'}
            <Timer />
        </Text>
      </View>

      <View style={styles.decision_container}>
        <View style={styles.accept_style}>
            <Button
                title="Accept"
                color="white"
                onPress={() => {
                    Alert.alert("Task Accepted");
                    handleCurrentTask();
                    }
                }
            />
        </View>
        <View style={styles.decline_style}>
            <Button
                title="Decline"
                color="white"
                onPress={() => Alert.alert("Task Declined")} 
            />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#fff",
      flex: 1,
      //alignItems: 'center',
      //justifyContent: 'center',
      //paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    title_container: {
        backgroundColor: 'green',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text_style: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    task_container: {
        backgroundColor: '#077dc9',
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    decision_container: {
        backgroundColor: 'red',
        flex: 1,
        flexDirection: 'row',
        //alignItems: 'center',
        //justifyContent: 'center',
    },
    accept_style: {
        backgroundColor: 'green',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    decline_style: {
        backgroundColor: 'red',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

