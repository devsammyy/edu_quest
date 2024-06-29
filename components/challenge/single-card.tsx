import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

interface IProps {
  name: string;

  icon: ImageSourcePropType | undefined;
}

const QuestionCard: React.FC<IProps> = ({ name, icon }) => {
  return (
    <TouchableOpacity
      onPress={() => router.push(name.toLowerCase())}
      className="mt-5 relative"
    >
      <LinearGradient
        colors={["#ffa001", "#1E293B"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="relative items-center w-[160px] rounded-md justify-center bg-gradient-to-tr from-[#ffa001] to-[#1E293B] h-[160px]"
      >
        <Image
          source={icon}
          className="w-16 h-16"
          tintColor={"#f4f4f4"}
          resizeMode="contain"
        />

        <Text className=" text-white text-lg mt-3 font-psemibold">
          {name === "Mispelled" ? "Mispelled Words" : name}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default QuestionCard;
