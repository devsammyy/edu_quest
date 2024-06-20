import { Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="register"
          options={{
            headerShown: false,
            contentStyle: {
              height: 100,
            },
          }}
        />
        <Stack.Screen
          name="change"
          options={{
            headerShown: false,
            contentStyle: {
              height: 100,
            },
          }}
        />
        <Stack.Screen
          name="forgot"
          options={{
            headerShown: false,
            contentStyle: {
              height: 100,
            },
          }}
        />
      </Stack>
      <StatusBar backgroundColor="#161622" style="dark" />
    </>
  );
};

export default AuthLayout;
