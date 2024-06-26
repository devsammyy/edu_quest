import { View, Text, ScrollView } from "react-native";
import React from "react";
import Home from "@/components/home/home";
import { SafeAreaView } from "react-native-safe-area-context";

const UserHome = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="w-full  justify-center min-h-[86vh] px-4">
        <Home />
      </View>
    </SafeAreaView>
  );
};

export default UserHome;
