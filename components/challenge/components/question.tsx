import CustomButton from "@/components/button/custom_btn";
import CMessageModal from "@/components/modal/modal";
import { useUserState } from "@/modules/auth/context";
import { getData, saveData } from "@/modules/challenge/service";
import { useQuestionState } from "@/modules/question/context";
import { IQuestion } from "@/modules/question/model";
import { router } from "expo-router";
import React, { useState, useEffect, useMemo } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import LottieView from "lottie-react-native";

interface IProps {
  subject: string | any;
  difficulty: string | undefined|any;
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
      if (streak === 5) {
        setShowModal(true);
        setScore(score + 50); // Add streak bonus directly to the score
      }
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
        subject: subject,
        difficulty: difficulty,
        score: finalScore,
        xp: score,
        timestamp: new Date().toISOString(),
        level: finalScore === "100.00" ? getLevel(difficulty) : "none",
        streakReward: streak >= 5 ? "Streak Bonus" : "",
      };
      quizResults.push(newResult);
      await saveData("quiz_results", quizResults);

      // Save specific quiz results by subject and difficulty
      const specificQuizResultsKey = `quiz_results_${user?.id}_${subject}_${difficulty}`;
      const specificQuizResults = (await getData(specificQuizResultsKey)) || [];
      specificQuizResults.push(newResult);
      await saveData(specificQuizResultsKey, specificQuizResults);

      const overallProgress = (await getData(
        `overall_progress_${user?.id}`
      )) || {
        totalQuizzes: 0,
        quizzesCompleted: 0,
        points: 0,
        highScore: 0,
        completed: {
          easy: false,
          medium: false,
          hard: false,
        },
        level: "Beginner",
      };

      // Update points based on completion of difficulty levels across all subjects
      overallProgress.points = 0;
      if (overallProgress.completed.easy) {
        overallProgress.points += 100;
      }
      if (overallProgress.completed.medium) {
        overallProgress.points += 200;
      }
      if (overallProgress.completed.hard) {
        overallProgress.points += 300;
      }

      // Update completion status based on current quiz results
      if (difficulty === "easy" && finalScore === "100.00") {
        overallProgress.completed.easy = true;
      } else if (difficulty === "medium" && finalScore === "100.00") {
        overallProgress.completed.medium = true;
      } else if (difficulty === "hard" && finalScore === "100.00") {
        overallProgress.completed.hard = true;
      }

      // Calculate the new points based on the updated completion status
      if (overallProgress.completed.easy) {
        overallProgress.points += 100;
      }
      if (overallProgress.completed.medium) {
        overallProgress.points += 100; // Additional 100 points
      }
      if (overallProgress.completed.hard) {
        overallProgress.points += 100; // Additional 100 points
      }

      // Cap the total points at 300
      overallProgress.points = Math.min(overallProgress.points, 300);

      // Update high score if current score is higher
      if (score > overallProgress.highScore) {
        overallProgress.highScore = score;
      }

      overallProgress.quizzesCompleted += 1;

      // Upgrade level only if all questions in current difficulty level are completed with 100% score across all subjects
      const completedAllQuestionsInDifficulty =
        await checkCompletionInAllSubjects(difficulty);
      if (completedAllQuestionsInDifficulty) {
        if (difficulty === "easy") {
          overallProgress.level = "Intermediate Scholar";
        } else if (difficulty === "medium") {
          overallProgress.level = "Advanced Scholar";
        }
      }

      await saveData(`overall_progress_${user?.id}`, overallProgress);
    } catch (error) {
      console.error("Failed to save quiz result:", error);
      Alert.alert("Error", "Failed to save quiz result.");
    }
  };

  const getLevel = (difficulty: string | undefined) => {
    if (difficulty === "easy") {
      return "Beginner";
    } else if (difficulty === "medium") {
      return "Intermediate Scholar";
    } else if (difficulty === "hard") {
      return "Advanced Scholar";
    }
    return "none";
  };

  const checkCompletionInAllSubjects = async (
    difficulty: string | undefined
  ) => {
    const subjects = ["physics", "chemistry", "mispelled", "english"]; // Add all relevant subjects here
    for (const subject of subjects) {
      const quizResults = await getData(
        `quiz_results_${user?.id}_${subject}_${difficulty}`
      );
      if (
        !quizResults ||
        !quizResults.find((result: any) => result.score === "100.00")
      ) {
        return false;
      }
    }
    return true;
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
        <Text className="font-pmedium text-md text-white">
          Question {currentQuestionIndex + 1} of {shuffledQuestions.length}
        </Text>
      </View>
      <Text className="font-pmedium text-lg text-white mb-4">
        {shuffledQuestions[currentQuestionIndex].question}
      </Text>
      <FlatList
        data={shuffledQuestions[currentQuestionIndex].options}
        keyExtractor={(item) => item}
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
