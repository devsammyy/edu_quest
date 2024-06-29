import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useUserState } from "@/modules/auth/context";
import QuestionCard from "./single-card";
import { icons } from "@/constants";
import { useQuestionState } from "@/modules/question/context";
import { getAllofQuestions } from "@/modules/question/service";

const ChallengeComponent = () => {
  const { questions, loading, getAllQuestions, allQuestions, getQuestions } =
    useQuestionState();
  const [question, setQuestion] = useState([]);

  const mapIcon = (icon: string) => {
    switch (icon) {
      case "English":
        return icons.vocabulary;
        break;
      case "Physics":
        return icons.enzyme;
        break;
      case "Chemistry":
        return icons.atom;
        break;
      case "Mispelled":
        return icons.learn;
        break;
      default:
        break;
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
  if (loading) {
    return <Text>Loading...</Text>;
  } else
    return (
      <FlatList
        data={question}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }) => (
          <View className=" px-1">
            <View>
              {question.length > 0 && (
                <QuestionCard name={item.name} icon={mapIcon(item.name)} />
              )}
            </View>
          </View>
        )}
        numColumns={2}
        ListHeaderComponent={() => (
          <Text className="font-psemibold text-white my-6 px-4 text-2xl">
            All Categories
          </Text>
        )}
        // horizontal
      />
    );
};

export default ChallengeComponent;
