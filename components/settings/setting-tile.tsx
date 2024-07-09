import { View, Text, Image, ImageSourcePropType } from "react-native";
import React from "react";
import { icons } from "@/constants";

interface IProps {
  title: string;
  value: string | undefined;
}

const SettingTile: React.FC<IProps> = ({ title, value }) => {
  return (
    <View className="flex-row justify-between items-center mb-7">
      <View className="flex-row  gap-2 ">
        <View>
          <Text className="text-white text-lg font-psemibold ">{title}</Text>
        </View>
      </View>
      <Image
        source={icons.greater}
        tintColor={"#fff"}
        resizeMode="contain"
        className="w-3 h-3"
      />
    </View>
  );
};

export default SettingTile;
