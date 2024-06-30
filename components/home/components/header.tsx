import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { icons } from "@/constants";
import DisplayCard from "./display-card";
import { useUserState } from "@/modules/auth/context";
import { getData } from "@/modules/challenge/service";

const Header = () => {
  const { user } = useUserState();
  const [xp, setXp] = useState(0);

  useEffect(() => {
    const fetchXP = async () => {
      try {
        const overallProgress = await getData(`overall_progress_${user?.id}`);
        console.log(overallProgress);
        if (overallProgress) {
          const parsedProgress = overallProgress;
          const { points } = parsedProgress;
          setXp(Number(points)); // Ensure points are a number
        }
      } catch (error) {
        console.error("Failed to load XP:", error);
      }
    };

    fetchXP();
  }, [user]);

  return (
    <View className="flex-col">
      <View className="flex-row my-6 justify-between items-center">
        <View className="flex-row items-center gap-2">
          <TouchableOpacity className="flex-col items-center justify-center">
            <Image
              source={icons.profile}
              className="w-10 h-10"
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View className="flex-col">
            <View className="flex-row">
              <Text className="font-pmedium mr-1 text-xl justify-between text-gray-100">
                Hello
              </Text>
              <Text className="font-pmedium text-xl text-white">
                {user?.username}
              </Text>
            </View>
            <View>
              <Text className="text-gray-500">Let's play the quiz</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity className=" flex-col items-center justify-center p-3 rounded-lg">
          <Image
            source={icons.winning}
            className="w-6 h-6"
            tintColor={"#ffff"}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <View className="flex-1 p-5 bg-main justify-center  rounded-lg mb-5">
        <View className="flex-row p-4 items-center justify-center">
          <DisplayCard name="Rank" value="20" />
          <View className="w-[2px] rounded-md h-full bg-slate-200" />

          <DisplayCard name="Coins" value="10" />
          <View className="w-[2px] rounded-md h-full bg-slate-200" />
          <DisplayCard name="Score" value={xp.toString()} />
        </View>
      </View>
    </View>
  );
};

export default Header;
