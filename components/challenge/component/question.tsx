import CustomButton from "@/components/button/custom_btn";
import CMessageModal from "@/components/modal/modal";
import { useUserState } from "@/modules/auth/context";
import { getData, saveData } from "@/modules/challenge/service";
import { useQuestionState } from "@/modules/question/context";
import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";

interface IProps {
  subject: string;
  difficulty: string;
}

const Question: React.FC<IProps> = ({ subject, difficulty }) => {
  const { user } = useUserState();
  const { questions, getQuestions } = useQuestionState();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const filteredQuestions = questions.filter(
    (q) => q.difficulty === difficulty
  );
  const optionLabels = ["A", "B", "C", "D"];

  useEffect(() => {
    getQuestions(subject);
  }, []);

  const handleOptionPress = (option: any) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = async () => {
    if (selectedOption === filteredQuestions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      await saveQuizResult();
      setShowModal(true);
      setTimeout(() => {
        router.replace("/home");
      }, 3000);
    }
  };

  const saveQuizResult = async () => {
    try {
      const quizResults = (await getData("quiz_results")) || [];
      const finalScore = ((score / filteredQuestions.length) * 100).toFixed(2);
      const newResult = {
        id: user?.id,
        userId: user?.id,
        score: finalScore,
        xp: score * 10,
        timestamp: new Date().toISOString(),
        level: "easy",
      };
      quizResults.push(newResult);
      await saveData("quiz_results", quizResults);

      const overallProgress = (await getData(
        `overall_progress_${user?.id}`
      )) || {
        totalQuizzes: 0,
        quizzesCompleted: 0,
        points: 0,
      };
      overallProgress.quizzesCompleted += 1;
      overallProgress.points += score * 10; // Correctly add points
      overallProgress.totalQuizzes = questions.length;
      await saveData(`overall_progress_${user?.id}`, overallProgress);
    } catch (error) {
      console.error("Failed to save quiz result:", error);
      Alert.alert("Error", "Failed to save quiz result.");
    }
  };

  return (
    <View className="w-full">
      <Text className="font-psemibold text-2xl text-white mb-5">
        {subject.toUpperCase()}
      </Text>
      <Text className="font-psemibold text-2xl text-white mb-5">
        {`${currentQuestionIndex + 1}. `}
        {filteredQuestions[currentQuestionIndex]?.question}
      </Text>
      <FlatList
        data={filteredQuestions[currentQuestionIndex]?.options}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            className={`px-4 py-2 ${
              item === selectedOption && "bg-main rounded-lg"
            }`}
            onPress={() => handleOptionPress(item)}
          >
            <Text className="text-white font-pmedium text-lg">{`${optionLabels[index]}. ${item}`}</Text>
          </TouchableOpacity>
        )}
      />
      <CustomButton
        title={
          currentQuestionIndex < filteredQuestions.length - 1
            ? "Next Question"
            : "Finish Quiz"
        }
        handlePress={handleNextQuestion}
        disabled={!selectedOption}
        containerStyles={`w-full text-white mt-8 ${
          !selectedOption && "bg-gray-100"
        }`}
      />
      {showModal && (
        <CMessageModal
          visible={showModal}
          title={`Challenge Completed`}
          message={`
        You scored ${((score / filteredQuestions?.length) * 100).toFixed(
          2
        )} out of 100`}
          onClose={() => setShowModal(!showModal)}
          className="rounded-lg"
          type={`success`}
        />
      )}
    </View>
  );
};

export default Question;
