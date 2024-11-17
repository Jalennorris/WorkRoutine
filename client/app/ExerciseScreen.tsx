import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';

interface ExerciseScreenProps {
  route: {
    params: {
      exercise: {
        name: string;
        sets: number;
        reps: number;
        description: string;
      };
    };
  };
  navigation: {
    goBack: () => void;
  };
}

const ExerciseScreen: React.FC<ExerciseScreenProps> = ({ route, navigation }) => {
  const { exercise } = route.params;
  const [timer, setTimer] = useState<number>(30); // Initial timer value
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    // Start the timer if active and countdown is not complete
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    // Handle timer reaching zero
    if (timer === 0) {
      setIsTimerActive(false); // Pause the timer
      alert("Time's up! Moving to the next exercise.");
      navigation.goBack(); // Navigate back or to another screen
    }

    // Cleanup interval on unmount or when timer stops
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive, timer, navigation]);

  const toggleTimer = () => {
    setIsTimerActive((prev) => !prev);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{exercise.name}</Text>
      <Text style={{ fontSize: 18 }}>{exercise.sets} sets of {exercise.reps}</Text>
      <Text style={{ fontSize: 16, marginVertical: 10 }}>{exercise.description}</Text>

      <Text style={{ fontSize: 40, marginVertical: 20 }}>{timer} seconds</Text>

      {/* Toggle timer */}
      <Button
        title={isTimerActive ? "Pause Timer" : "Start Timer"}
        onPress={toggleTimer}
      />

      {/* Navigate to the next exercise or screen */}
      <Button
        title="Next Exercise"
        onPress={() => navigation.goBack()}
        color="gray"
      
      />
    </View>
  );
};

export default ExerciseScreen;
