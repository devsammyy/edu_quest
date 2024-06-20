import { SafeAreaView, ScrollView, View } from "react-native";
import React from "react";
import ChangePasswordScreen from "@/components/auth/change-password";

const ChangePassword = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[86vh] px-4 my-6">
          <ChangePasswordScreen />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePassword;
