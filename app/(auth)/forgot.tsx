import { SafeAreaView, ScrollView, View } from "react-native";
import React from "react";

import ForgotComponent from "@/components/auth/forgot-password";

const ForgotPassword = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[86vh] px-4 my-6">
          <ForgotComponent />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
