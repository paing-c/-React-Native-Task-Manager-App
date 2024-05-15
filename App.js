import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Appbar, FAB, Snackbar } from 'react-native-paper';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarColor, setSnackbarColor] = useState('#6200ee');

  const showSnackbar = (message, color) => {
    setSnackbarMessage(message);
    setSnackbarColor(color);
    setSnackbarVisible(true);
  };

  const addTask = (task) => {
    if (task.trim() === '') {
      showSnackbar('Task cannot be empty', '#f44336'); // Red for error
      return;
    }
    setTasks([...tasks, { id: Date.now().toString(), text: task }]);
    setFormVisible(false);
    showSnackbar('Task added successfully', '#4caf50'); // Green for success
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    showSnackbar('Task deleted successfully', '#f44336'); // Red for deletion
  };

  const updateTask = (taskId, newTask) => {
    if (newTask.trim() === '') {
      showSnackbar('Task cannot be empty', '#f44336'); // Red for error
      return;
    }
    setTasks(tasks.map(task => task.id === taskId ? { ...task, text: newTask } : task));
    setFormVisible(false);
    setIsEditing(false);
    setCurrentTask(null);
    showSnackbar('Task updated successfully', '#ff9800'); // Orange for update
  };

  const editTask = (task) => {
    setIsEditing(true);
    setCurrentTask(task);
    setFormVisible(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setCurrentTask(null);
    setFormVisible(false);
    showSnackbar('Task editing cancelled', '#2196f3'); // Blue for cancellation
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Appbar.Header>
          <Appbar.Content title="Task Manager" />
        </Appbar.Header>
        <View style={styles.content}>
          {formVisible ? (
            <TaskForm
              addTask={addTask}
              isEditing={isEditing}
              currentTask={currentTask}
              updateTask={updateTask}
              cancelEdit={cancelEdit}
            />
          ) : (
            <TaskList
              tasks={tasks}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          )}
        </View>
        {!formVisible && (
          <FAB
            style={styles.fab}
            icon="plus"
            onPress={() => setFormVisible(true)}
          />
        )}
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={3000}
          style={[styles.snackbar, { backgroundColor: snackbarColor }]}
        >
          {snackbarMessage}
        </Snackbar>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  snackbar: {
    margin: 16,
    borderRadius: 4,
  },
});

export default App;
