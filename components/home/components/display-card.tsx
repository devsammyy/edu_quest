import { View, Text } from "react-native";
import React from "react";

interface IProps {
  name: string;
  value: string;
}

const DisplayCard: React.FC<IProps> = ({ name, value }) => {
  return (
    <View className=" flex-col mx-8 items-center">
      <Text className="text-lg text-slate-100 font-pmedium">{name}</Text>
      <Text className="text-xl text-white font-pmedium">{value}</Text>
    </View>
  );
};

export default DisplayCard;
