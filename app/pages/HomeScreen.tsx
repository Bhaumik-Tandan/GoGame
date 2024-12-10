import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Button, ActivityIndicator } from 'react-native';
import request from 'app/helper/apiHelper'; // Assuming this is the path to your request helper
import { useAuth } from 'app/stores/auth';

const HomeScreen = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();

  // Fetch tasks on component load
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await request.get('/task');
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // Add a new task
  const handleAddTodo = async () => {
    if (!newTodo.trim()) return;
    setLoading(true);
    try {
      const response = await request.post('/task', { title: newTodo, isCompleted: false });
      setTodos([...todos, response.data]);
      setNewTodo('');
    } catch (error) {
      console.error('Error adding task:', error);
    } finally {
      setLoading(false);
    }
  };

  // Toggle task completion
  const toggleComplete = async (id, currentStatus) => {
    setLoading(true);
    try {
      const response = await request.patch(`/task/${id}`, { isCompleted: !currentStatus });
      setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
    } catch (error) {
      console.error('Error toggling task:', error);
    } finally {
      setLoading(false);
    }
  };

  // Edit a task
  const handleSaveEdit = async () => {
    if (!editingText.trim()) return;
    setLoading(true);
    try {
      const response = await request.patch(`/task/${editingTodo}`, { title: editingText });
      setTodos(todos.map(todo => (todo._id === editingTodo ? response.data : todo)));
      setEditingTodo(null);
      setEditingText('');
    } catch (error) {
      console.error('Error editing task:', error);
    } finally {
      setLoading(false);
    }
  };

  // Delete a task
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await request.delete(`/task/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#007BFF" style={styles.loadingIndicator} />;
  }

  return (
    <View style={styles.container}>
      <Button title="Logout" onPress={logout} />
      <Text style={styles.title}>To-Do List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new to-do"
          value={newTodo}
          onChangeText={setNewTodo}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <TouchableOpacity onPress={() => toggleComplete(item._id, item.isCompleted)}>
              <Text style={[styles.todoText, item.isCompleted && styles.completedText]}>
                {item.title}
              </Text>
            </TouchableOpacity>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => {
                setEditingTodo(item._id);
                setEditingText(item.title);
              }}>
                <Text style={styles.editButton}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item._id)}>
                <Text style={styles.deleteButton}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      {editingTodo && (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.input}
            placeholder="Edit your to-do"
            value={editingText}
            onChangeText={setEditingText}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleSaveEdit}>
            <Text style={styles.addButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff', // White background for a clean look
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20, // Adds spacing below the title
  },
  inputContainer: {
    flexDirection: 'row', // Horizontal alignment of input and button
    marginBottom: 20, // Spacing below the input section
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  todoText: {
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  actions: {
    flexDirection: 'row',
  },
  editButton: {
    color: 'orange',
    marginRight: 10,
  },
  deleteButton: {
    color: 'red',
  },
  editContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
