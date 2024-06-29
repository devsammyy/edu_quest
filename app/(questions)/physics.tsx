import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PhysicsQuestion from "@/components/challenge/physics/physics";

const Physics = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="w-full items-center justify-center min-h-[83vh] px-4 my-6">
        <PhysicsQuestion />
      </View>
    </SafeAreaView>
  );
};

export default Physics;
