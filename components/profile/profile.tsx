import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { icons } from "@/constants";
import { CSegment } from "../tabs/tabs";
import { useUserState } from "@/modules/auth/context";
import General from "./components/general";
import Badge from "./components/badges";

const Profile = () => {
  const { user } = useUserState();
  return (
    <View className="flex-col my-20 items-center justify-center">
      <TouchableOpacity>
        <Image
          source={icons.profile}
          className="w-28 h-28"
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Text className="font-psemibold mt-3 text-2xl text-white">
        {user?.fullName}
      </Text>
      <Text className="font-psemibold text-white">{user?.username}</Text>
      <CSegment
        containerClassName="w-full rounded-lg my-5"
        items={[
          {
            label: "General",
            key: "1",
            children: () => <General />,
          },
          {
            label: "Badges",
            key: "2",
            children: () => <Badge />,
          },
        ]}
      />
    </View>
  );
};

export default Profile;
