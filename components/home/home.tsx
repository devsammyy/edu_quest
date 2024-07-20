import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { useUserState } from "@/modules/auth/context";

import EmptyState from "../empty/empty";
import Header from "./components/header";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

// Predefined list of tips
const tips = [
  "Stay consistent with your study schedule to improve retention and understanding.",
  "Practice active recall by testing yourself on the material you've learned.",
  "Take regular breaks during study sessions to stay focused and fresh.",
  "Use mnemonic devices to help remember complex information.",
  "Explain what you've learned to someone else to reinforce your understanding.",
  "Organize your study space to minimize distractions.",
  "Set specific goals for each study session to stay on track.",
  "Review your notes regularly to keep the information fresh in your mind.",
  "Stay hydrated and get enough sleep to ensure optimal brain function.",
  "Mix up your study topics to keep things interesting and engaging.",
];

// Predefined list of study resources
const resources = [
  {
    title: "Khan Academy",
    description: "Free online courses, lessons, and practice.",
    url: "https://www.khanacademy.org",
  },
  {
    title: "Coursera",
    description: "Online courses from top universities and companies.",
    url: "https://www.coursera.org",
  },
  {
    title: "edX",
    description: "Online courses from leading institutions worldwide.",
    url: "https://www.edx.org",
  },
  {
    title: "Duolingo",
    description: "Learn languages for free.",
    url: "https://www.duolingo.com",
  },
  {
    title: "Quizlet",
    description: "Flashcards and study sets for various subjects.",
    url: "https://quizlet.com",
  },
];

const Home = () => {
  const [dailyTip, setDailyTip] = useState("");

  useEffect(() => {
    // Select a random tip from the predefined list
    const getRandomTip = () => {
      const randomIndex = Math.floor(Math.random() * tips.length);
      return tips[randomIndex];
    };

    setDailyTip(getRandomTip());
  }, []);

  return (
    <FlatList
      data={[{ id: 1 }]}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={() => <Header />}
      renderItem={({ item }) => (
        <View className="min-w-full px-1">
          {/* Daily Tips Section */}
          <Text className="text-gray-100 text-lg font-semibold mb-3">
            Daily Tips
          </Text>
          <View className="bg-slate-800 mb-5 rounded-lg p-3">
            <Text className="font-medium text-lg text-white mb-2">
              Tip of the Day
            </Text>
            <Text className="text-gray-400 text-md">{dailyTip}</Text>
          </View>

          {/* Study Resources Section */}
          <Text className="text-gray-100 text-lg font-psemibold mb-3">
            Study Resources
          </Text>
          <View className="bg-slate-800 mb-5 rounded-lg p-4">
            {resources.map((resource, index) => (
              <View key={index} className="mb-3">
                <Text className="font-pmedium text-md text-white">
                  {resource.title}
                </Text>
                <Text className="text-gray-400 text-sm">
                  {resource.description}
                </Text>
                <TouchableOpacity onPress={() => router.push(resource.url)}>
                  <Text className="text-blue-400 text-sm">{resource.url}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
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
