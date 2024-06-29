import CustomButton from "@/components/button/custom_btn";
import { useUserState } from "@/modules/auth/context";
import { deleteData, getData, saveData } from "@/modules/challenge/service";
import { useQuestionState } from "@/modules/question/context";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

const PhysicsQuestion = () => {
  const { user } = useUserState();
  const { questions, getQuestions } = useQuestionState();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const filteredQuestions = questions.filter((q) => q.difficulty === "easy");
  const optionLabels = ["A", "B", "C", "D"];

  useEffect(() => {
    loadProgress();
    getQuestions("mispelled");
  }, []);

  const loadProgress = async () => {
    try {
      const progress = await getData(`progress_${user?.id}_${"easy"}`);
      if (progress) {
        setCurrentQuestionIndex(progress.currentQuestionIndex);
        setScore(progress.score);
      }
    } catch (error) {
      console.error("Failed to load progress:", error);
    }
  };

  const saveProgress = async () => {
    try {
      await deleteData(`progress_${user?.id}_${"easy"}`);
      await saveData(`progress_${user?.id}_${"easy"}`, {
        currentQuestionIndex,
        score,
      });
    } catch (error) {
      console.error("Failed to save progress:", error);
    }
  };

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
      await saveProgress();
    } else {
      await saveQuizResult();
      Alert.alert(
        "Challenge Completed",
        `You scored ${
          score +
          (selectedOption === filteredQuestions[currentQuestionIndex].options
            ? 1
            : 0)
        } out of ${filteredQuestions.length * 5}`
      );
    }
  };

  const saveQuizResult = async () => {
    try {
      const quizResults = (await getData("quiz_results")) || [];
      const newResult = {
        id: quizResults.length + 1,
        userId: user?.id,
        score:
          score +
          (selectedOption === filteredQuestions[currentQuestionIndex].options
            ? 1
            : 0),
        timestamp: new Date().toISOString(),
        level: "easy",
      };
      quizResults.push(newResult);
      await saveData("quiz_results", quizResults);
      await saveData(`progress_${user?.id}_${"easy"}`, null);

      // Update overall progress
      const overallProgress = (await getData(
        `overall_progress_${user?.id}`
      )) || {
        totalQuizzes: 0,
        quizzesCompleted: 0,
        points: 0,
      };
      overallProgress.quizzesCompleted += 1;
      overallProgress.points += score;
      overallProgress.totalQuizzes = questions.length;
      await saveData(`overall_progress_${user?.id}`, overallProgress);
    } catch (error) {
      console.error("Failed to save quiz result:", error);
      Alert.alert("Error", "Failed to save quiz result.");
    }
  };

  return (
    <View className="flex-1 min-h-[85vh] w-full justify-center">
      <Text className="font-psemibold text-2xl text-white mb-5">
        Question {currentQuestionIndex + 1}
      </Text>
      <Text className="font-psemibold text-2xl text-white mb-5">
        {filteredQuestions[currentQuestionIndex].question}
      </Text>
      <FlatList
        data={filteredQuestions[currentQuestionIndex].options}
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
        containerStyles={`w-full text-white ${
          !selectedOption && "bg-gray-100"
        }`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "bg-primary",
  },
  question: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  option: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: "#d3d3d3",
  },
  optionText: {
    fontSize: 18,
  },
});

export default PhysicsQuestion;
