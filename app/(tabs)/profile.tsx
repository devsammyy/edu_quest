import {
  View,
  Image,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { icons } from "@/constants";
import { useUserState } from "@/modules/auth/context";
import { CSegment } from "@/components/tabs/tabs";
import Profile from "@/components/profile/profile";

const UserProfile = () => {
  const { user } = useUserState();
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full min-h-[86vh] px-4 my-6">
          <Profile />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserProfile;
