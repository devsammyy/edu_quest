import {
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import React, { FormEvent } from "react";

interface ICustomButton {
  title: string;
  handlePress?: any;
  containerStyles: any;
}

const CustomButton: React.FC<ICustomButton> = ({
  title,
  handlePress,
  containerStyles,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      className={` bg-main rounded-xl min-h-[62px] justify-center items-center ${containerStyles}`}
    >
      <Text className="text-primary text-lg font-psemibold">{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
