import { View, Text, SafeAreaView, StyleSheet, Alert, Platform, StatusBar } from 'react-native';

export default function CurrentTask() {
    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.title_container}>
            <Text style={styles.text_style}>Your current task</Text>
          </View>
  
          <View>
            <Text style={styles.text_style}>
              Weight: {task.weight}kg {'\n'}
              Location: {task.location} {'\n'}
              Destination: {task.destination} {'\n'}
              Total Distance: {task.total_distance}m {'\n'}
              Package ID: {task.package_id} {'\n'}
            </Text>
          </View>
  
          <View style={styles.decision_container}>
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