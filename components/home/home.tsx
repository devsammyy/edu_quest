import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React, { useEffect } from "react";
import { useUserState } from "@/modules/auth/context";

import SearchInput from "../search/search-input";
import { icons } from "@/constants";
import { useQuestionState } from "@/modules/question/context";

const Home = () => {
  const { user, users } = useUserState();
  const { questions, getQuestions } = useQuestionState();

  useEffect(() => {
    getQuestions("physics");
  }, []);

  return (
    <FlatList
      data={questions}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View>
          <Text className="text-white">{item.id}</Text>
          <Text className="text-white">{item.question}</Text>
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

          <SearchInput placeholder="Search for a topic/quiz" />
        </View>
      )}
    />
  );
};

export default Home;
