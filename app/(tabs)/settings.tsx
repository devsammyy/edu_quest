import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { useUserState } from "@/modules/auth/context";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import SettingComponent from "@/components/settings/main";

const Settings = () => {
  const { user, setUser } = useUserState(); // Use user context to access user data and functions

  const handleLogout = () => {
    // Clear user data and navigate to login screen
    setUser(null);
    router.replace("/login");
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full items-center min-h-[86vh] px-4">
          <Text className="text-white self-start p-2 my-5 font-pbold text-2xl ">
            Settings
          </Text>

          <SettingComponent />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
