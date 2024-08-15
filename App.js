import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Task from './components/Task';
import CircularButton from './components/CircularButton';
import TaskModal from './components/TaskModal';

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
    scheduleMidnightTaskDeletion();
  }, []);

  const loadTasks = async () => {
    try {
      const savedTasks = JSON.parse(await AsyncStorage.getItem('tasks')) || [];
      setTasks(savedTasks);
    } catch (error) {
      console.error(error);
    }
  };

  const addTask = async (title, description) => {
    const newTask = { title, description };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setIsModalVisible(false);
  };

  const deleteTask = async (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const deleteAllTasks = async () => {
    setTasks([]);
    await AsyncStorage.removeItem('tasks');
  };

  const scheduleMidnightTaskDeletion = () => {
    const now = new Date();
    const midnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1, 
      0, 0, 0
    );
    const timeUntilMidnight = midnight - now;

    setTimeout(() => {
      deleteAllTasks(); 
      scheduleMidnightTaskDeletion(); 
    }, timeUntilMidnight);
  };

  return (
    <View style={styles.container}>
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>
        <ScrollView style={styles.items}>
          {tasks.map((task, index) => (
            <Task
              key={index}
              text={task.title}
              description={task.description}
              onEdit={() => Alert.alert('Edit Task', `Edit task at index ${index}`)}
              onDelete={() => deleteTask(index)}
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.addButton}>
        <CircularButton onPress={() => setIsModalVisible(true)} title={"+"} />
      </View>
      <TaskModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={addTask}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EADB',
  },
  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  items: {
    opacity: 0.9,
  },
  addButton: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
});
