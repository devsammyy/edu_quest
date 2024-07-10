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
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const optionLabels = ["A", "B", "C", "D"];

  useEffect(() => {
    const fetchAndShuffleQuestions = async () => {
      await getQuestions(subject);
    };

    fetchAndShuffleQuestions();
  }, [subject]);

  useEffect(() => {
    console.log("Questions state updated:", questions);
    if (questions.length > 0) {
      const filteredQuestions = questions.filter(
        (q) => q.difficulty === difficulty
      );

      // Shuffle the questions
      const shuffled = shuffleArray([...filteredQuestions]);

      // Shuffle the options of each question
      const shuffledQuestionsWithShuffledOptions = shuffled.map((question) => ({
        ...question,
        options: shuffleArray([...question.options]),
      }));

      setShuffledQuestions(shuffledQuestionsWithShuffledOptions);
    } else {
      console.log("No questions available or fetching failed.");
    }
  }, [questions, difficulty]);

  const handleOptionPress = (option: string) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = async () => {
    if (selectedOption === shuffledQuestions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < shuffledQuestions.length - 1) {
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
      const finalScore = ((score / shuffledQuestions.length) * 100).toFixed(2);
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
      <Text className="font-psemibold text-2xl text-white mb-5">
        {subject.toUpperCase()}
      </Text>
      <Text className="font-psemibold text-2xl text-white mb-5">
        {`${currentQuestionIndex + 1}. `}
        {shuffledQuestions[currentQuestionIndex]?.question}
      </Text>
      <FlatList
        data={shuffledQuestions[currentQuestionIndex]?.options}
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
          currentQuestionIndex < shuffledQuestions.length - 1
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
        You scored ${((score / shuffledQuestions?.length) * 100).toFixed(
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
