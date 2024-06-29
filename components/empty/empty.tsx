import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "@/constants";
import CustomButton from "../button/custom_btn";
import { router } from "expo-router";

interface IProps {
  title?: string | undefined;
  subtitle?: string | undefined;
}

const EmptyState: React.FC<IProps> = ({ title, subtitle }) => {
  return (
    <View className="justify-center mt-10 items-center px-2">
      <Image
        source={images.empty}
        className="w-[217px] h-[215px]"
        resizeMode="contain"
      />

      <Text className="text-base text-center font-psemibold text-white mt-2">
        {title}
      </Text>
      <Text className="font-pmedium text-sm text-gray-400">{subtitle}</Text>

      <CustomButton
        title="Start Quest!"
        handlePress={() => router.push("challenge")}
        containerStyles={"w-full my-6"}
      />
    </View>
  );
};

export default EmptyState;
