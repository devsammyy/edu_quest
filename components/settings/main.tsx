import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import SettingTile from "./setting-tile";

const SettingComponent = () => {
  return (
    <View className="w-full px-2 mt-3">
      <TouchableOpacity>
        <SettingTile title={"Change Password"} value={"Change your password"} />
      </TouchableOpacity>
      <TouchableOpacity>
        <SettingTile title={"Privacy"} value={"Privacy"} />
      </TouchableOpacity>

      <TouchableOpacity>
        <SettingTile title={"About"} value={"About this application"} />
      </TouchableOpacity>
    </View>
  );
};

export default SettingComponent;
