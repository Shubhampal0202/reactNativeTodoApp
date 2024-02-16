import React from "react";
import { Text, TextInput, View } from "react-native";
import TodoScreens from "./screens/TodoScreens";
export default function App() {
  console.log("hello");
  console.log("Shubham");
  return (
    <View style={{ marginTop: 30 }}>
      <TodoScreens />
    </View>
  );
}
