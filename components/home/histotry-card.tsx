import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const RecentChallengeCard = () => {
  return (
    <TouchableOpacity>
      <View className="flex-col items-center px-4 mb-14">
        <View className="flex-row gap-3 items-start">
          <View className="justify-center bg-slate-800 p-4 h-[200px] items-center flex-row flex-1">
            <Text className="text-white">RecentChallengeCard</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RecentChallengeCard;
