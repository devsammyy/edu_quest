import {
  View,
  Text,
  ScrollView,
  GestureResponderEvent,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import RegisterComponent from "@/components/auth/register";
import { Link, router } from "expo-router";
import LoginComponent from "@/components/auth/login";

const Register = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[86vh] px-4 my-6">
          <LoginComponent />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
