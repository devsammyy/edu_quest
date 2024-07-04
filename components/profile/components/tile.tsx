import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { icons } from "@/constants";

interface IProps {
  title: string;
  value: string | undefined;
  icon: ImageSourcePropType | undefined;
}

const Tile: React.FC<IProps> = ({ title, value, icon }) => {
  const mapIcon = () => {
    switch (title) {
      case "Name":
        return icons.usericon;

      case "Username":
        return icons.usericon;
      case "Matric No":
        return icons.learn;

      case "Email":
        return icons.envelope;

      case "Password":
        return icons.padlock;

      default:
    }
  };
  return (
    <View className="flex-row justify-between items-center mb-7">
      <View className="flex-row  gap-2 ">
        <Image
          source={mapIcon()}
          tintColor={"#fff"}
          resizeMode="contain"
          className="w-5 h-5"
        />
        <View>
          <Text className="text-white font-psemibold text-md">{title}</Text>
          <Text className="text-white font-pregular text-xs">{value}</Text>
        </View>
      </View>
      <TouchableOpacity>
        <Text className="font-psemibold text-md text-main">Edit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Tile;
