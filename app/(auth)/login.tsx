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

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg font-pregular text-gray-100">
              Don't have account?
            </Text>
            <TouchableOpacity
              onPress={() => router.replace("/register")}
              className="my-3 items-end"
            >
              <Text className="text-lg font-psemibold text-main">
                Register?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
