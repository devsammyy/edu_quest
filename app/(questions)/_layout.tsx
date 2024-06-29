import { Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const QuestionsLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="physics"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="chemistry"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="english"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="mispelled"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar backgroundColor="#161622" style="dark" />
    </>
  );
};

export default QuestionsLayout;
