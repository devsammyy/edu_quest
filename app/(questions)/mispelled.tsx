import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Mispelled = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full items-center justify-center min-h-[83vh] px-4 my-6">
          <Text className="text-white">Mispelled</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Mispelled;
