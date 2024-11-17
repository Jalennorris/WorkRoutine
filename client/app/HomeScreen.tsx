import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface HomeScreenProps {
  navigation: {
    navigate: (
      screen: string,
      params?: { goal?: 'weightLoss' | 'muscleGain'; exercise?: Exercise }
    ) => void;
  };
}

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  description: string;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const selectGoal = (goal: 'weightLoss' | 'muscleGain') => {
    navigation.navigate('WorkoutScreen', { goal }); // Ensure 'Workout' matches your navigation stack name
  };

  const startExercise = (exercise: Exercise) => {
    navigation.navigate('ExerciseScreen', { exercise });
  };

  // Example exercise data
  const exampleExercise: Exercise = {
    name: 'Push Ups',
    sets: 3,
    reps: 12,
    description: 'A basic upper body exercise to strengthen your chest, shoulders, and arms.',
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Fitness Goal</Text>
      <View style={styles.buttonContainer}>
        <Button title="Weight Loss" onPress={() => selectGoal('weightLoss')} />
        <Button title="Muscle Gain" onPress={() => selectGoal('muscleGain')} />
      </View>

      <Text style={styles.subtitle}>Or try this exercise:</Text>
      <Button
        title={`Start Exercise: ${exampleExercise.name}`}
        onPress={() => startExercise(exampleExercise)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 20,
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'space-evenly',
    height: 100,
  },
});

export default HomeScreen;
