import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { icons } from "@/constants";
import DisplayCard from "./display-card";
import { useUserState } from "@/modules/auth/context";
import { getData } from "@/modules/challenge/service";
import { LinearGradient } from "expo-linear-gradient";

const Header = () => {
  const { user } = useUserState();
  const [xp, setXp] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [level, setLevel] = useState("Beginner");
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        const overallProgress = await getData(`overall_progress_${user?.id}`);
        console.log(overallProgress);
        if (overallProgress) {
          const { points, quizzesCompleted, highScore, streak } =
            overallProgress;
          setXp(Number(points));
          setCompleted(Number(quizzesCompleted));
          setHighScore(Number(highScore));
          setStreak(Number(streak));

          // Determine level based on points
          if (points >= 200) {
            setLevel("Advanced Scholar");
          } else if (points >= 100) {
            setLevel("Intermediate Scholar");
          } else {
            setLevel("Beginner");
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
        <TouchableOpacity className="flex-col items-center justify-center p-3 rounded-lg">
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
        <View className="flex-row p-4 items-center justify-center">
          <DisplayCard name="Level" value={level} />
          <View className="w-[2px] rounded-md h-full bg-slate-200" />
          <DisplayCard name="Attempted" value={completed.toString()} />
          <View className="w-[2px] rounded-md h-full bg-slate-200" />
          <DisplayCard name="Score" value={xp.toString()} />
          <View className="w-[2px] rounded-md h-full bg-slate-200" />
          <DisplayCard name="High Score" value={highScore.toString()} />
          <View className="w-[2px] rounded-md h-full bg-slate-200" />
          <DisplayCard name="Streak" value={streak.toString()} />
        </View>
      </LinearGradient>
    </View>
  );
};

export default Header;
