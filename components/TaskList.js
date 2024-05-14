// components/TaskList.js
import React from 'react';
import { StyleSheet } from 'react-native';
import { List, IconButton } from 'react-native-paper';

const TaskList = ({ tasks, deleteTask, editTask }) => {
  return (
    <>
      {tasks.map(task => (
        <List.Item
          key={task.id}
          title={task.text}
          right={() => (
            <>
              <IconButton
                icon="pencil"
                size={20}
                onPress={() => editTask(task)}
              />
              <IconButton
                icon="delete"
                size={20}
                onPress={() => deleteTask(task.id)}
              />
            </>
          )}
          style={styles.listItem}
        />
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 4,
    elevation: 1,
  },
});

export default TaskList;
