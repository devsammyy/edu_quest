import { View, Text, ScrollView } from "react-native";
import React from "react";
import ChallengeComponent from "@/components/challenge/challenge";
import { SafeAreaView } from "react-native-safe-area-context";

const Challenge = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ChallengeComponent />
    </SafeAreaView>
  );
};

export default Challenge;
