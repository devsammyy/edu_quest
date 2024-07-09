import { View, Text, Image, ImageSourcePropType } from "react-native";
import React from "react";
import { icons } from "@/constants";

interface IProps {
  title: string;
  value: string | undefined;
}

const Tile: React.FC<IProps> = ({ title, value }) => {
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

      case "Logout":
        return icons.logout;

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
          <Text className="text-white font-psemibold text-lg">{title}</Text>
          <Text className="text-white font-pregular text-md">{value}</Text>
        </View>
      </View>
      {/* <TouchableOpacity>
        <Text className="font-psemibold text-md text-main">Edit</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default Tile;
