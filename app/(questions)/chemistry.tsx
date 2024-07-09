import { View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Question from "@/components/challenge/components/question";
import { useLocalSearchParams } from "expo-router";

const Chemistry = () => {
  const { difficulty, name } = useLocalSearchParams();
  console.log(difficulty, name);
  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="w-full items-center justify-center min-h-[83vh] px-4 my-6">
        <Question subject={name} difficulty={difficulty} />
      </View>
    </SafeAreaView>
  );
};

export default Chemistry;
