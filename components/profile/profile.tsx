import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { icons } from "@/constants";
import { CSegment } from "../tabs/tabs";
import { useUserState } from "@/modules/auth/context";
import General from "./components/general";
import { useLocalSearchParams } from "expo-router";
import Achievements from "./components/badges";

const Profile = () => {
  const { user } = useUserState();
  const { route } = useLocalSearchParams();
  console.log(route);
  const [currentTab, setCurrentTab] = useState(0);
  useEffect(() => {
    if (route) {
      setCurrentTab(route as any);
    }
  }, [route]);

  // Step 2: Update the state variable when a tab is selected
  const handleTabChange = (key: any) => {
    setCurrentTab(key);
  };
  return (
    <View className="flex-col mt-12 items-center justify-center">
      <TouchableOpacity>
        <Image
          source={icons.profile}
          className="w-28 h-28"
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Text className="font-psemibold text-center mt-3 text-2xl text-white">
        {user?.fullName}
      </Text>
      <Text className="font-psemibold my-2 text-white">@{user?.username}</Text>
      <CSegment
        containerClassName="w-full rounded-lg my-5"
        items={[
          {
            label: "General",
            key: "1",
            children: () => <General />,
          },

          {
            label: "Achievements",
            key: "2",
            children: () => <Achievements />,
          },
        ]}
        selectedIndex={currentTab}
        onSelect={handleTabChange}
      />
    </View>
  );
};

export default Profile;
