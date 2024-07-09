import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Tile from "./tile";
import { icons } from "@/constants";
import { useUserState } from "@/modules/auth/context";
import { router } from "expo-router";

const General = () => {
  const { user } = useUserState();
  return (
    <View className="mt-5">
      <Tile title={"Name"} value={user?.fullName} />
      <Tile title={"Username"} value={user?.username} />
      <Tile title={"Email"} value={user?.email} />
      <Tile title={"Matric No"} value={user?.matricNo} />
      <TouchableOpacity onPress={() => router.replace("/login")}>
        <Tile title={"Logout"} value={""} />
      </TouchableOpacity>
    </View>
  );
};

export default General;
