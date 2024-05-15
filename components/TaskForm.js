import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const TaskForm = ({ addTask, isEditing, currentTask, updateTask, cancelEdit }) => {
  const [task, setTask] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditing) {
      setTask(currentTask.text);
    } else {
      setTask('');
    }
  }, [isEditing, currentTask]);

  const handleSubmit = () => {
    if (task.trim() === '') {
      setError('Task cannot be empty');
      return;
    }
    setError('');
    if (isEditing) {
      updateTask(currentTask.id, task);
    } else {
      addTask(task);
    }
    setTask('');
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        label="Task"
        mode="outlined"
        value={task}
        onChangeText={setTask}
        style={styles.input}
        error={!!error}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        {isEditing ? "Update Task" : "Add Task"}
      </Button>
      {isEditing && (
        <Button mode="text" onPress={cancelEdit} style={styles.button}>
          Cancel
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
  },
});

export default TaskForm;
