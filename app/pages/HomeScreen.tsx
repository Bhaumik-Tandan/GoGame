import { useAuth } from 'app/stores/auth';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Button } from 'react-native';

const HomeScreen = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [editingText, setEditingText] = useState('');
  const {logout} = useAuth();
  // Add a new to-do
  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  // Toggle completion of a to-do
  const toggleComplete = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  // Start editing a to-do
  const startEditing = (id, text) => {
    setEditingTodo(id);
    setEditingText(text);
  };

  // Save edited to-do
  const handleSaveEdit = () => {
    setTodos(todos.map(todo => todo.id === editingTodo ? { ...todo, text: editingText } : todo));
    setEditingTodo(null);
    setEditingText('');
  };

  // Delete a to-do
  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

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
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <TouchableOpacity onPress={() => toggleComplete(item.id)}>
              <Text style={[styles.todoText, item.completed && styles.completedText]}>
                {item.text}
              </Text>
            </TouchableOpacity>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => startEditing(item.id, item.text)}>
                <Text style={styles.editButton}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text style={styles.deleteButton}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      {editingTodo !== null && (
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
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
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
});

export default HomeScreen;
