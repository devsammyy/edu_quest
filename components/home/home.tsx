import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useUserState } from "@/modules/auth/context";

import SearchInput from "../search/search-input";
import { icons } from "@/constants";
import { useQuestionState } from "@/modules/question/context";
import EmptyState from "../empty/empty";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../button/custom_btn";
import History from "./history";
import { getData } from "@/modules/challenge/service";

const Home = () => {
  const { user, users } = useUserState();
  const { questions, getQuestions } = useQuestionState();
  const [quizResults, setQuizResults] = useState([]);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userQuizResults = (await getData("quiz_results")) || [];
        const userResults = userQuizResults.filter(
          (result: any) => result.userId === user?.id
        );
        setQuizResults(userResults);

        const userProgress = (await getData(`user_${user?.id}_progress`)) || {
          points: 0,
        };
        setPoints(userProgress.points);
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Failed to fetch user data.");
      }
    };
    fetchUserData();
  }, [user?.id]);

  const getLevelProgress = (level: any) => {
    const levelResults = quizResults.filter((result) => result.level === level);
    const totalQuestions = questions.filter(
      (q) => q.difficulty === level
    ).length;
    const totalCorrect = levelResults.reduce(
      (acc, result) => acc + result.score,
      0
    );
    return (totalCorrect / totalQuestions) * 100;
  };

  useEffect(() => {
    getQuestions("physics");
  }, []);

  return (
    <FlatList
      data={[{ id: 1 }]}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View>
          <Text className="text-white">{item.id}</Text>
        </View>
      )}
      ListHeaderComponent={() => (
        <View className="my-6  space-y-6">
          <View className="justify-between items-start flex-row mb-6">
            <View>
              <Text className="font-pmedium text-sm text-gray-100">
                Welcome Back
              </Text>
              <Text className="font-psemibold text-2xl text-white">
                {user?.fullName}
              </Text>
            </View>
            <View className="mt-1.5 flex-row-reverse">
              <TouchableOpacity>
                <Text className="text-white font-psemibold text-lg">XP: 0</Text>
              </TouchableOpacity>
              <Image
                source={icons.novice}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </View>
          </View>

          <SearchInput
            placeholder="Search for a subject
          "
          />
          <View className="pt-2 flex-1 w-full">
            <Text className="text-gray-300 text-lg font-psemibold mb-3">
              Your Journey So Far!
            </Text>
          </View>
          <History
            data={[
              { id: 1, name: "Babatunde", email: "babatunde@email.com" },
              { id: 2, name: "Joshua", email: "Joshua@email.com" },
              { id: 3, name: "Joshua", email: "Joshua@email.com" },
              { id: 4, name: "Joshua", email: "Joshua@email.com" },

              { id: 5, name: "Joshua", email: "Joshua@email.com" },
            ]}
          />
        </View>
      )}
      ListEmptyComponent={() => (
        <EmptyState
          title="You haven't started any Quest"
          subtitle="Please proceed to challenge page"
        />
      )}
    />
  );
};

export default Home;
