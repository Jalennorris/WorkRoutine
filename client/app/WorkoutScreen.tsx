import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  description: string;
}

interface WorkoutScreenProps {
  route: {
    params: {
      goal: 'weightLoss' | 'muscleGain';
    };
  };
  navigation: {
    navigate: (screen: string, params?: { exercise?: Exercise }) => void;
  };
}

const workoutRoutines = {
  weightLoss: [
    { name: 'Jumping Jacks', sets: 3, reps: 30, description: 'A full-body cardio exercise.' },
    { name: 'Push-ups', sets: 3, reps: 15, description: 'Strengthen your upper body.' },
  ],
  muscleGain: [
    { name: 'Squats', sets: 4, reps: 12, description: 'Strengthens lower body.' },
    { name: 'Bench Press', sets: 4, reps: 8, description: 'Targets the chest.' },
  ],
};

const WorkoutScreen: React.FC<WorkoutScreenProps> = ({ route, navigation }) => {
  const { goal } = route.params;
  const workout = workoutRoutines[goal];

  if (!workout) {
    return (
      <View style={styles.container}>
        <Text>No workout routine available for this goal.</Text>
      </View>
    );
  }

  const renderItem: React.FC<{ item: Exercise }> = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.exerciseName}>{item.name}</Text>
      <Text style={styles.exerciseDetails}>
        {item.sets} sets of {item.reps} reps
      </Text>
      <Text style={styles.exerciseDescription}>{item.description}</Text>
      <Button
        title="Start Exercise"
        onPress={() => navigation.navigate('ExerciseScreen', { exercise: item })}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {goal === 'weightLoss' ? 'Weight Loss Routine' : 'Muscle Gain Routine'}
      </Text>
      <FlatList
        data={workout}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  exerciseDetails: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  exerciseDescription: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
});

export default WorkoutScreen;
