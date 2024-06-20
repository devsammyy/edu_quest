import { View, Text, ScrollView, GestureResponderEvent } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import RegisterComponent from "@/components/auth/register";
import { Link } from "expo-router";

const Register = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[83vh] px-4 my-6">
          <RegisterComponent />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg font-pregular text-gray-100">
              Already have an account?
            </Text>
            <Link href={"/login"} className="text-lg font-psemibold text-main">
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
