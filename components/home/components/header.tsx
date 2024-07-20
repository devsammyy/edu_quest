import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { icons } from "@/constants";
import DisplayCard from "./display-card";
import { useUserState } from "@/modules/auth/context";
import { getData } from "@/modules/challenge/service";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

const Header = () => {
  const { user } = useUserState();
  const [xp, setXp] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [level, setLevel] = useState("Beginner");
  const [reward, setReward] = useState("");

  const handleNavigate = () => {
    router.push({
      pathname: "/profile",
      params: { route: 1 },
    });
  };

  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        const overallProgress = await getData(`overall_progress_${user?.id}`);
        if (overallProgress) {
          const { xp: points, completedQuizzes, highScore } = overallProgress;
          setXp(Number(overallProgress.points));
          setCompleted(Number(completedQuizzes));
          setHighScore(Number(highScore));

          // Determine level based on points
          if (points >= 200) {
            setLevel("Advanced Scholar");
            setReward(
              "Congratulations! You've reached Advanced Scholar level!"
            );
          } else if (points >= 100) {
            setLevel("Intermediate Scholar");
            setReward("Great job! You're now an Intermediate Scholar!");
          } else {
            setLevel("Beginner");
            setReward(""); // No specific reward for Beginner level
          }
        }
      } catch (error) {
        console.error("Failed to load user progress:", error);
      }
    };

    fetchUserProgress();
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
        <TouchableOpacity
          onPress={handleNavigate}
          className="flex-col items-center justify-center p-3 rounded-lg"
        >
          <Image
            source={icons.winning}
            className="w-6 h-6"
            tintColor={"#ffff"}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <LinearGradient
        colors={["#ffa001", "#1E293B"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="mb-3 w-full flex-1 justify-center rounded-lg p-5 bg-gradient-to-tr from-[#ffa001] to-[#1E293B]"
      >
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View className="flex-row py-4 items-center justify-center">
            <DisplayCard name="Level" value={level} />
            <View className="w-[2px] rounded-md h-full bg-slate-200" />
            <DisplayCard name="Points" value={xp as any} />
            <View className="w-[2px] rounded-md h-full bg-slate-200" />
            <DisplayCard name="High Score" value={highScore.toString()} />
          </View>
        </ScrollView>
        {reward && (
          <View className="mt-4 p-4 bg-green-600 rounded-lg">
            <Text className="text-white font-pmedium text-center">
              {reward}
            </Text>
          </View>
        )}
      </LinearGradient>
    </View>
  );
};

export default Header;
