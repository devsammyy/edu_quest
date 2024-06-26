import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";

const UserProfile = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full items-center justify-center min-h-[86vh] px-4 my-6">
          <Text className="text-white font-pbold text-xl">
            Profile screen Under Construction...
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserProfile;
