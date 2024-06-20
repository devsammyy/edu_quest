import { View, Text, Image } from "react-native";
import React from "react";

interface IProps {
  color: string;
  name: string;
  focused: any;
  icon: any;
}

const TabIcon: React.FC<IProps> = ({ name, icon, focused, color }) => {
  return (
    <View className="justify-center items-center gap-2">
      <Image source={icon} className="w-6 h-6" style={{ tintColor: color }} />
      <Text
        className={`${
          focused ? "text-main font-psemibold" : "text-white font-pregular"
        } text-sm`}
      >
        {name}
      </Text>
    </View>
  );
};

export default TabIcon;
