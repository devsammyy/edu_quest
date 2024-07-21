import { View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Question from "@/components/challenge/components/question";
import { useLocalSearchParams } from "expo-router";

const Edu = () => {
  const { difficulty, name } = useLocalSearchParams();
  console.log(difficulty, name);
  return (
    <SafeAreaView className="relative bg-primary h-full">
      <View className="items-center justify-center px-4 mb-8">
        <Question subject={name} difficulty={difficulty} />
      </View>
    </SafeAreaView>
  );
};

export default Edu;
