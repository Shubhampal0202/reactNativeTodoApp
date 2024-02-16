import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { IconButton } from "react-native-paper";

const TodoScreens = () => {
  //   useEffect(function () {
  //     async function fn() {
  //       const res = await axios.get(
  //         "https://jsonplaceholder.typicode.com/todos/1"
  //       );
  //       console.log(res.data);
  //     }
  //     fn();
  //   }, []);

  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [editedTodo, setEditedTodo] = useState(null);

  const handleAddTodo = () => {
    if (inputValue === "") {
      return;
    }
    setTodos([...todos, { id: Date.now().toString(), title: inputValue }]);
    setInputValue("");
  };
  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(updatedTodos);
  };

  const editTodo = (item) => {
    setEditedTodo(item);
    setInputValue(item.title);
  };

  const updateTodo = () => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === editedTodo.id) {
        return { ...todo, title: inputValue };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setInputValue("");
    setEditedTodo(null);
  };

  const renderTodos = ({ item, index }) => {
    return (
      <View
        style={{
          backgroundColor: "#1e90ff",
          marginBottom: 10,
          marginHorizontal: 10,
          paddingVertical: 8,
          borderRadius: 8,
          flexDirection: "row",
          alignItems: "center",
        
        }}
      >
        <Text
          style={{
            paddingVertical: 16,
            paddingHorizontal: 10,
            fontSize: 22,
            fontWeight: "700",
            color: "#fff",
            flex: 1,
          }}
        >
          {item.title}
        </Text>
        <IconButton
          icon={"pencil"}
          iconColor="#fff"
          onPress={() => editTodo(item)}
        />
        <IconButton
          icon={"trash-can"}
          iconColor="#fff"
          onPress={() => handleDeleteTodo(item.id)}
        />
      </View>
    );
  };

  return (
    <>
      <View>
        <TextInput
          style={{
            borderWidth: 2,
            borderColor: "#1e90ff",
            padding: 10,
            borderRadius: 8,
            marginHorizontal: 10,
            marginTop: 10,
            fontSize: 20,
          }}
          placeholder="Add a task"
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
        />

        {editedTodo ? (
          <TouchableOpacity
            style={{
              marginTop: 20,
              backgroundColor: "#000",
              paddingHorizontal: 10,
              paddingVertical: 10,
              marginHorizontal: 10,
              marginBottom: 20,
              borderRadius: 8,
              alignItems: "center",
            }}
            onPress={updateTodo}
          >
            <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>
              Save
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              marginTop: 20,
              backgroundColor: "#000",
              paddingHorizontal: 10,
              paddingVertical: 10,
              marginHorizontal: 10,
              marginBottom: 20,
              borderRadius: 8,
              alignItems: "center",
            }}
            onPress={handleAddTodo}
          >
            <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>
              Add
            </Text>
          </TouchableOpacity>
        )}

        <FlatList data={todos} renderItem={renderTodos} />
      </View>
      {todos.length <= 0 && (
        <View style={{marginTop:30,alignItems:"center"}}>
          <Text style={{fontSize:26,fontWeight:800,color:"crimson"}}>Write your Todos here!</Text>
        </View>
      )}
    </>
  );
};

export default TodoScreens;
