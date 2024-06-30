import { View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Question from "@/components/challenge/component/question";

const English = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="w-full items-center justify-center min-h-[83vh] px-4 my-6">
        <Question subject={"english"} difficulty={"easy"} />
      </View>
    </SafeAreaView>
  );
};

export default English;
