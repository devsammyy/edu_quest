import CustomButton from "@/components/button/custom_btn";
import CMessageModal from "@/components/modal/modal";
import { useUserState } from "@/modules/auth/context";
import { getData, saveData } from "@/modules/challenge/service";
import { useQuestionState } from "@/modules/question/context";
import { IQuestion } from "@/modules/question/model";
import { router } from "expo-router";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import LottieView from "lottie-react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

interface IProps {
  subject: string | any;
  difficulty: string | undefined | any;
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
 
  const [timeLeft, setTimeLeft] = useState(1000); // Total time in milliseconds
  const totalTime = 1000; // Total time in milliseconds
  const optionLabels = ["A", "B", "C", "D"];
  
  const fetchAndShuffleQuestions = async () => {
    await getQuestions(subject);
  };

  useEffect(() => {
    fetchAndShuffleQuestions();
  }, [subject]);
  
  const filteredQuestions = questions.filter(
    (q) => q.difficulty === difficulty
  );

  useEffect(() => {
    if (questions.length > 0) {
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

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer); // Clear the interval when time is up
          handleSaveResult(); // Call handleSaveResult when time is up
          return 0;
        }
        return prevTime - 1; // Decrease time by 10 milliseconds
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSaveResult = async () => {
    await saveQuizResult().then((_) => {
      setShowModal(true);
      setTimeout(() => {
        router.replace("/home");
      }, 3000);
    });
  };

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
      // Retrieve existing quiz results and overall progress
      const quizResults = (await getData("quiz_results")) || [];
      const overallProgress = (await getData(
        `overall_progress_${user?.id}`
      )) || {
        totalQuizzes: 0,
        highScore: 0, // High score across all subjects
        completed: {
          easy: false,
          medium: false,
          hard: false,
        },
        level: "Beginner",
        points: 0, // Ensure 'points' exists
      };

      // Calculate the exact score and XP
      const finalScore = ((score / shuffledQuestions.length) * 100).toFixed(2); // Calculate exact score percentage
      const newXP = score; // XP is equal to the score

      // Update the XP in overall progress
      overallProgress.points += newXP;

      // Prepare new result
      const newResult = {
        id: user?.id,
        userId: user?.id,
        subject: subject,
        difficulty: difficulty,
        score: score, // Save exact score
        xp: newXP, // XP earned in this quiz attempt
        timestamp: new Date().toISOString(),
        level: finalScore === "100.00" ? getLevel(difficulty) : "none",
      };

      // Save new quiz result
      quizResults.push(newResult);
      await saveData("quiz_results", quizResults);

      // Save specific quiz results
      const specificQuizResultsKey = `quiz_results_${user?.id}_${subject}_${difficulty}`;
      const specificQuizResults = (await getData(specificQuizResultsKey)) || [];
      specificQuizResults.push(newResult);
      await saveData(specificQuizResultsKey, specificQuizResults);

      // Update overall progress
      if (difficulty === "easy" && finalScore === "100.00") {
        overallProgress.completed.easy = true;
      } else if (difficulty === "medium" && finalScore === "100.00") {
        overallProgress.completed.medium = true;
      } else if (difficulty === "hard" && finalScore === "100.00") {
        overallProgress.completed.hard = true;
      }

      // Update high score if the current score is higher
      if (score > overallProgress.highScore) {
        overallProgress.highScore = score;
      }

      // Check if the player has completed all questions in the current difficulty
      const completedAllQuestionsInDifficulty =
        await checkCompletionInAllSubjects(difficulty);
      if (completedAllQuestionsInDifficulty) {
        if (difficulty === "easy") {
          overallProgress.level = "Intermediate Scholar";
        } else if (difficulty === "medium") {
          overallProgress.level = "Advanced Scholar";
        }
      }

      // Save updated overall progress
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
    const subjects = ["physics", "chemistry", "mispelled", "english"];
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

  const timerWidth = (timeLeft / totalTime) * 90;

  return (
    <View className="w-full">
      <View className="mb-15 p-4 bg-slate-800 rounded-lg">
        <View className="flex-row justify-between">
          <Text className="font-psemibold text-md text-white mb-5">
            Subject:{" "}
            {subject === "physics"
              ? "Science & Tech"
              : subject === "chemistry"
              ? "General Knowledge"
              : subject.charAt(0).toUpperCase() + subject.slice(1)}
          </Text>
          <Text className="font-psemibold text-md text-white">
            Difficulty:{" "}
            {difficulty!.charAt(0).toUpperCase() + difficulty?.slice(1)}
          </Text>
        </View>
        <Text className="font-pmedium text-md text-white">
          Question {currentQuestionIndex + 1} of {shuffledQuestions.length}
        </Text>
      </View>

      <View className="self-center my-5">
        <CountdownCircleTimer
          isPlaying
          size={100}
          duration={timerWidth}
          colors={["#ffa001", "#f77001", "#A30000", "#A30000"]}
          colorsTime={[7, 5, 2, 0]}
          onComplete={() => {
            handleSaveResult();
            setTimeLeft(0);
          }}
        >
          {({ remainingTime }) => (
            <Text className="text-white text-2xl">{remainingTime}</Text>
          )}
        </CountdownCircleTimer>
      </View>
      <Text className="font-pmedium text-xl text-white mb-4">
        {shuffledQuestions[currentQuestionIndex].question}
      </Text>
      <FlatList
        data={shuffledQuestions[currentQuestionIndex].options}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            className={`px-4 mb-3 border-[1px] border-main py-4 rounded-lg ${
              item === selectedOptions[currentQuestionIndex] &&
              "bg-main rounded-lg"
            }`}
            onPress={() => handleOptionPress(item)}
          >
            <Text className="text-white font-pmedium text-md">{`${optionLabels[index]}. ${item}`}</Text>
          </TouchableOpacity>
        )}
      />
      <View className="flex-row justify-between mt-15">
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
              ? "Next"
              : "Finish Quiz"
          }
          handlePress={handleNextQuestion}
          disabled={!selectedOptions[currentQuestionIndex]}
          containerStyles={`w-1/2 text-white ${
            !selectedOptions[currentQuestionIndex] && "bg-slate-800 p-[-10px]"
          }`}
          textColor="text-white"
        />
      </View>
      {showModal && (
        <CMessageModal
          visible={showModal}
          title={"Quiz Finished!"}
          message={"Congratulations! You've completed the quiz."}
          additionalMessage={`You scored ${(
            (score / shuffledQuestions?.length) *
            100
          ).toFixed(2)} out of 100.`}
          onClose={() => setShowModal(false)}
          type={"success"}
        />
      )}
    </View>
  );
};

export default Question;

