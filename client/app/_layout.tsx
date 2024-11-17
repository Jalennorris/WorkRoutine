import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './HomeScreen';
import ExerciseScreen from './ExerciseScreen';
import WorkoutScreen from './WorkoutScreen';

const Stack = createStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }} // No header for HomeScreen
        />
        <Stack.Screen
          name="ExerciseScreen"
          component={ExerciseScreen}
          options={{ headerShown: true, title: 'Exercise Details' }} // Customize header for ExerciseScreen
        />
        <Stack.Screen
          name="WorkoutScreen"
          component={WorkoutScreen}
          options={{ headerShown: true, title: 'Your Workout' }} // Customize header for WorkoutScreen
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
