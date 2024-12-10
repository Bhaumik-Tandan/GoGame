import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet, 
  SafeAreaView,
  StatusBar,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import request from 'app/helper/apiHelper';
import { useAuth } from 'app/stores/auth';

const HomeScreen = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [editingText, setEditingText] = useState('');
  const { logout } = useAuth();

  const fetchTasks = useCallback(async () => {
    try {
      const response = await request.get('/task');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      Alert.alert('Error', 'Failed to fetch tasks. Please try again.');
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAddTodo = async () => {
    if (!newTodo.trim()) return;
    const optimisticTodo = { _id: Date.now().toString(), title: newTodo, isCompleted: false };
    setTodos(prevTodos => [...prevTodos, optimisticTodo]);
    setNewTodo('');
    try {
      const response = await request.post('/task', { title: newTodo, isCompleted: false });
      setTodos(prevTodos => prevTodos.map(todo => 
        todo._id === optimisticTodo._id ? response.data : todo
      ));
    } catch (error) {
      console.error('Error adding task:', error);
      setTodos(prevTodos => prevTodos.filter(todo => todo._id !== optimisticTodo._id));
      Alert.alert('Error', 'Failed to add task. Please try again.');
    }
  };

  const toggleComplete = async (id, currentStatus) => {
    const updatedTodos = todos.map(todo => 
      todo._id === id ? { ...todo, isCompleted: !currentStatus } : todo
    );
    setTodos(updatedTodos);
    try {
      await request.patch(`/task/${id}`, { isCompleted: !currentStatus });
    } catch (error) {
      console.error('Error toggling task:', error);
      setTodos(todos); // Revert to original state
      Alert.alert('Error', 'Failed to update task. Please try again.');
    }
  };

  const handleSaveEdit = async () => {
    if (!editingText.trim()) return;
    const updatedTodos = todos.map(todo => 
      todo._id === editingTodo ? { ...todo, title: editingText } : todo
    );
    setTodos(updatedTodos);
    setEditingTodo(null);
    setEditingText('');
    try {
      await request.patch(`/task/${editingTodo}`, { title: editingText });
    } catch (error) {
      console.error('Error editing task:', error);
      setTodos(todos); // Revert to original state
      Alert.alert('Error', 'Failed to edit task. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    const updatedTodos = todos.filter(todo => todo._id !== id);
    setTodos(updatedTodos);
    try {
      await request.delete(`/task/${id}`);
    } catch (error) {
      console.error('Error deleting task:', error);
      setTodos(todos); // Revert to original state
      Alert.alert('Error', 'Failed to delete task. Please try again.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.todoItem}>
      <TouchableOpacity 
        style={styles.todoCheckbox} 
        onPress={() => toggleComplete(item._id, item.isCompleted)}
      >
        {item.isCompleted ? (
          <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
        ) : (
          <Ionicons name="ellipse-outline" size={24} color="#757575" />
        )}
      </TouchableOpacity>
      <View style={styles.todoContent}>
        {editingTodo === item._id ? (
          <TextInput
            style={styles.editInput}
            value={editingText}
            onChangeText={setEditingText}
            onSubmitEditing={handleSaveEdit}
            autoFocus
          />
        ) : (
          <Text style={[styles.todoText, item.isCompleted && styles.completedText]}>
            {item.title}
          </Text>
        )}
      </View>
      <View style={styles.actions}>
        {editingTodo === item._id ? (
          <TouchableOpacity onPress={handleSaveEdit}>
            <Ionicons name="checkmark" size={24} color="#4CAF50" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => {
            setEditingTodo(item._id);
            setEditingText(item.title);
          }}>
            <Ionicons name="create-outline" size={24} color="#FFA000" />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => handleDelete(item._id)}>
          <Ionicons name="trash-outline" size={24} color="#F44336" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <View style={styles.header}>
        <Text style={styles.title}>To-Do List</Text>
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={24} color="#757575" />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new to-do"
          value={newTodo}
          onChangeText={setNewTodo}
          onSubmitEditing={handleAddTodo}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
          <Ionicons name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  logoutButton: {
    padding: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginVertical: 5,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  todoCheckbox: {
    marginRight: 10,
  },
  todoContent: {
    flex: 1,
  },
  todoText: {
    fontSize: 16,
    color: '#333333',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#9E9E9E',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: 70,
  },
  editInput: {
    fontSize: 16,
    color: '#333333',
    borderBottomWidth: 1,
    borderBottomColor: '#007BFF',
    paddingVertical: 5,
  },
});

export default HomeScreen;

