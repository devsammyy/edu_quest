import { View, Text } from "react-native";
import React from "react";
import Tile from "./tile";
import { icons } from "@/constants";
import { useUserState } from "@/modules/auth/context";

const General = () => {
  const { user } = useUserState();
  return (
    <View>
      <Tile title={"Name"} value={user?.fullName} icon={icons.usericon} />
      <Tile title={"Email"} value={user?.email} icon={icons.usericon} />
      <Tile title={"Matric No"} value={user?.matricNo} icon={icons.usericon} />
      <Tile title={"Username"} value={user?.username} icon={icons.usericon} />
      <Tile title={"Password"} value={user?.password} icon={icons.usericon} />
    </View>
  );
};

export default General;
