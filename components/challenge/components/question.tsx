import CustomButton from "@/components/button/custom_btn";
import CMessageModal from "@/components/modal/modal";
import { useUserState } from "@/modules/auth/context";
import { getData, saveData } from "@/modules/challenge/service";
import { useQuestionState } from "@/modules/question/context";
import { IQuestion } from "@/modules/question/model";
import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import LottieView from "lottie-react-native";

interface IProps {
  subject: string | any;
  difficulty: string | undefined;
}

// Function to shuffle an array
const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Question: React.FC<IProps> = ({ subject, difficulty }) => {
  const { user } = useUserState();
  const { questions, loading, getQuestions } = useQuestionState();
  const [shuffledQuestions, setShuffledQuestions] = useState<IQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<(string | null)[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [streak, setStreak] = useState(0);
  const optionLabels = ["A", "B", "C", "D"];

  useEffect(() => {
    const fetchAndShuffleQuestions = async () => {
      await getQuestions(subject);
    };

    fetchAndShuffleQuestions();
  }, [subject]);

  useEffect(() => {
    if (questions.length > 0) {
      const filteredQuestions = questions.filter(
        (q) => q.difficulty === difficulty
      );
      const shuffled = shuffleArray([...filteredQuestions]);
      const shuffledQuestionsWithShuffledOptions = shuffled.map((question) => ({
        ...question,
        options: shuffleArray([...question.options]),
      }));

      setShuffledQuestions(shuffledQuestionsWithShuffledOptions);
      setSelectedOptions(
        Array(shuffledQuestionsWithShuffledOptions.length).fill(null)
      );
    } else {
      console.log("No questions available or fetching failed.");
    }
  }, [questions, difficulty]);

  const handleOptionPress = (option: string) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestionIndex] = option;
    setSelectedOptions(newSelectedOptions);
  };

  const handleNextQuestion = async () => {
    if (
      selectedOptions[currentQuestionIndex] ===
      shuffledQuestions[currentQuestionIndex].answer
    ) {
      setScore(score + 1);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }

    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      await saveQuizResult();
      setShowModal(true);
      setTimeout(() => {
        router.replace("/home");
      }, 3000);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const saveQuizResult = async () => {
    try {
      const quizResults = (await getData("quiz_results")) || [];
      const finalScore = ((score / shuffledQuestions.length) * 100).toFixed(2);
      const newResult = {
        id: user?.id,
        userId: user?.id,
        score: finalScore,
        xp: score,
        timestamp: new Date().toISOString(),
        level: finalScore === "100.00" ? "Upgraded" : "easy",
        streakReward: streak >= 5 ? "Streak Bonus" : "",
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

      if (finalScore === "100.00") {
        overallProgress.level = "Upgraded";
      }

      if (streak >= 5) {
        overallProgress.streakBonus = true;
        overallProgress.points += 50; // Bonus points for streak
      }

      overallProgress.quizzesCompleted += 1;
      overallProgress.points += score; // Correctly add points
      overallProgress.totalQuizzes = shuffledQuestions.length;
      await saveData(`overall_progress_${user?.id}`, overallProgress);
    } catch (error) {
      console.error("Failed to save quiz result:", error);
      Alert.alert("Error", "Failed to save quiz result.");
    }
  };

  if (loading || shuffledQuestions.length === 0) {
    return (
      <View className="w-full flex-1 justify-center items-center">
        <LottieView
          source={require("@/assets/animations/loader.json")}
          autoPlay
          loop
          style={{ width: 200, height: 200 }}
        />
        <Text className="font-psemibold text-2xl text-white mt-5">
          Loading questions...
        </Text>
      </View>
    );
  }

  return (
    <View className="w-full">
      <View className="mb-4 p-4 bg-slate-800 rounded-lg">
        <View className="flex-row justify-between">
          <Text className="font-psemibold text-md text-white mb-5">
            Subject: {subject.charAt(0).toUpperCase() + subject.slice(1)}
          </Text>
          <Text className="font-psemibold text-md text-white mb-5">
            Difficulty:{" "}
            {difficulty!.charAt(0).toUpperCase() + difficulty?.slice(1)}
          </Text>
        </View>
        <Text className="font-psemibold text-xl text-white mb-5">
          {`${currentQuestionIndex + 1}. `}
          {shuffledQuestions[currentQuestionIndex]?.question}
        </Text>
      </View>
      <FlatList
        data={shuffledQuestions[currentQuestionIndex]?.options}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            className={`px-4 border-[1px] border-main mb-2 py-3 rounded-lg ${
              item === selectedOptions[currentQuestionIndex] &&
              "bg-main rounded-lg"
            }`}
            onPress={() => handleOptionPress(item)}
          >
            <Text className="text-white font-pmedium text-md">{`${optionLabels[index]}. ${item}`}</Text>
          </TouchableOpacity>
        )}
      />
      <View className="flex-row justify-between mt-8">
        <CustomButton
          title="Previous"
          handlePress={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
          containerStyles={`w-1/2 text-white mr-2 ${
            currentQuestionIndex === 0 && "bg-slate-800 mr-3 p-[-10px]"
          }`}
          textColor="text-white"
        />
        <CustomButton
          title={
            currentQuestionIndex < shuffledQuestions.length - 1
              ? "Next "
              : "Finish Quiz"
          }
          handlePress={handleNextQuestion}
          disabled={!selectedOptions[currentQuestionIndex]}
          containerStyles={`w-1/2 text-white  ${
            !selectedOptions[currentQuestionIndex] && "bg-slate-800"
          }`}
          textColor="text-white"
        />
      </View>
      {showModal && (
        <CMessageModal
          visible={showModal}
          title={`Challenge Completed`}
          message={`
        You scored ${((score / shuffledQuestions?.length) * 100).toFixed(
          2
        )} out of 100. ${streak >= 5 ? "You earned a streak bonus!" : ""}
        ${score === 100.0 ? "Level Up!" : ""}`}
          onClose={() => setShowModal(!showModal)}
          className="rounded-lg"
          type={`success`}
        />
      )}
    </View>
  );
};

export default Question;
