import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from './app/Profile/Profile';
import NewTask from './app/Tasks/NewTask';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Button } from 'react-native';
import CurrentTask from './app/Tasks/CurrentTask';
import { TaskProvider } from './app/Tasks/TaskContext';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <TaskProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Welcome to my app!' }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ title: 'My Profile' }}
          />
          <Stack.Screen
            name="NewTask"
            component={NewTask}
            options={{ title: 'New Task' }}
          />
          <Stack.Screen
            name="CurrentTask"
            component={CurrentTask}
            options={{ title: 'Current Task' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TaskProvider>
  );
}

function HomeScreen({ navigation }) {
  return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
        <Text>Welcome to my app!</Text>
          <Button
            title="Go to my profile"
            onPress={() => navigation.navigate('Profile')}
          />
          <Button
            title="View new task"
            onPress={() => navigation.navigate('NewTask', {task_details: null})}
          />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
