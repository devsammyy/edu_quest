import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import QuestionCard from "./components/single-card";
import { icons } from "@/constants";
import { getAllofQuestions } from "@/modules/question/service";

const ChallengeComponent = () => {
  const [question, setQuestion] = useState([]);

  const mapIcon = (icon: string) => {
    switch (icon) {
      case "English":
        return icons.dictionary;

      case "Physics":
        return icons.atom;

      case "Chemistry":
        return icons.book;

      case "Mispelled":
        return icons.learn;

      case "Maths":
        return icons.maths;

      case "Edu":
        return icons.edu;

      case "Edutech":
        return icons.edutech;

      default:
        return icons.learn;
    }
  };
  const fetchAllQuestions = async () => {
    const allQuestions = await getAllofQuestions();
    const allq = allQuestions.map((aq: any) => aq);
    setQuestion(allq as any);
  };
  useEffect(() => {
    fetchAllQuestions();
  }, []);

  return (
    <FlatList
      data={question}
      keyExtractor={(item: any) => item.id.toString()}
      centerContent
      contentContainerStyle={{
        marginHorizontal: "auto",
        alignItems: "flex-start",
      }}
      renderItem={({ item }) => (
        <View className="">
          <View className="">
            {question.length > 0 && (
              <QuestionCard name={item.name} icon={mapIcon(item.name)} />
            )}
          </View>
        </View>
      )}
      numColumns={2}
      ListHeaderComponent={() => (
        <Text className="font-psemibold text-white mt-8 mb-5 pl-20 text-2xl">
          All Categories
        </Text>
      )}
      // horizontal
    />
  );
};

export default ChallengeComponent;
