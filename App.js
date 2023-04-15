import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from './Profile/Profile';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Button } from 'react-native';

const Stack = createNativeStackNavigator();

function App() {
  return (
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
      </Stack.Navigator>
    </NavigationContainer>
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
