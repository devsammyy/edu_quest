import CustomButton from "@/components/button/custom_btn";
import CMessageModal from "@/components/modal/modal";
import { useUserState } from "@/modules/auth/context";
import { getData, saveData } from "@/modules/challenge/service";
import { useQuestionState } from "@/modules/question/context";
import { IQuestion } from "@/modules/question/model";
import { router } from "expo-router";
import React, { useState, useEffect, useRef } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import LottieView from "lottie-react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

interface IProps {
  subject: string | any;
  difficulty: string | undefined | any;
}

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
  const [remainingTime, setRemainingTime] = useState(90);
  const timerRef = useRef<NodeJS.Timeout | null>(null); // Total time in milliseconds
  const optionLabels = ["A", "B", "C", "D"];

  useEffect(() => {
    let isMounted = true;
    console.log("Fetching questions for subject:", subject);

    const fetchAndShuffleQuestions = async () => {
      try {
        await getQuestions(subject);
        console.log("Questions fetched successfully");
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchAndShuffleQuestions();

    return () => {
      isMounted = false;
      console.log("Component unmounted");
    };
  }, [subject, getQuestions]);

  useEffect(() => {
    console.log("Shuffling questions based on difficulty:", difficulty);

    if (questions && questions.length > 0) {
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
      console.log("Questions shuffled successfully");
    }
  }, [questions, difficulty]);

  useEffect(() => {
    if (remainingTime === 0) {
      handleSaveResult();
    } else {
      timerRef.current = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [remainingTime]);

  const handleSaveResult = async () => {
    console.log("Saving result");
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    try {
      await saveQuizResult();
      setShowModal(true);
      setTimeout(() => {
        router.replace("/home");
      }, 2000);
    } catch (error) {
      console.error("Error saving result:", error);
    }
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
      await handleSaveResult();
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
      const overallProgress = (await getData(
        `overall_progress_${user?.id}`
      )) || {
        totalQuizzes: 0,
        highScore: 0,
        completed: {
          easy: false,
          medium: false,
          hard: false,
        },
        level: "Beginner",
        points: 0,
      };

      const finalScore = ((score / shuffledQuestions.length) * 100).toFixed(2);
      const newXP = score;

      overallProgress.points += newXP;

      const newResult = {
        id: user?.id,
        userId: user?.id,
        subject: subject,
        difficulty: difficulty,
        score: score,
        xp: newXP,
        timestamp: new Date().toISOString(),
        level: finalScore === "100.00" ? getLevel(difficulty) : "none",
      };

      quizResults.push(newResult);
      await saveData("quiz_results", quizResults);

      const specificQuizResultsKey = `quiz_results_${user?.id}_${subject}_${difficulty}`;
      const specificQuizResults = (await getData(specificQuizResultsKey)) || [];
      specificQuizResults.push(newResult);
      await saveData(specificQuizResultsKey, specificQuizResults);

      if (difficulty === "easy" && finalScore === "100.00") {
        overallProgress.completed.easy = true;
      } else if (difficulty === "medium" && finalScore === "100.00") {
        overallProgress.completed.medium = true;
      } else if (difficulty === "hard" && finalScore === "100.00") {
        overallProgress.completed.hard = true;
      }

      if (score > overallProgress.highScore) {
        overallProgress.highScore = score;
      }

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
      console.log("Result saved successfully");
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
    const subjects = ["physics", "chemistry", "biology", "english"];
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
      <View className="p-5 bg-slate-800 rounded-lg">
        <View className="flex-row justify-between">
          <Text className="font-psemibold text-lg text-white mb-5">
            Subject:{" "}
            {subject === "physics"
              ? "Science & Tech"
              : subject === "chemistry"
              ? "General Knowledge"
              : subject.charAt(0).toUpperCase() + subject.slice(1)}
          </Text>
          <Text className="font-psemibold text-lg text-white">
            Difficulty:{" "}
            {difficulty!.charAt(0).toUpperCase() + difficulty?.slice(1)}
          </Text>
        </View>
        <View className="flex-row justify-between">
          <View>
            <Text className="font-pmedium text-lg text-white">
              Question {currentQuestionIndex + 1} of {shuffledQuestions.length}
            </Text>
          </View>
          <View className="">
            <Text
              className={`font-pmedium ${
                remainingTime < 20
                  ? "text-red-500"
                  : remainingTime < 10
                  ? "text-red-700"
                  : "text-white"
              }  text-lg `}
            >
              {remainingTime}s left
            </Text>
          </View>
        </View>
      </View>

      <Text className={`font-pmedium mt-8 text-xl text-white`}>
        {shuffledQuestions[currentQuestionIndex].question}
      </Text>
      <FlatList
        className="mt-3 mb-8"
        data={shuffledQuestions[currentQuestionIndex].options}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            className={`px-3 mb-3 border-[1px]  border-main py-3 rounded-lg ${
              item === selectedOptions[currentQuestionIndex] &&
              "bg-main rounded-lg"
            }`}
            onPress={() => handleOptionPress(item)}
          >
            <Text className="text-white font-pmedium text-xl">{`${optionLabels[index]}. ${item}`}</Text>
          </TouchableOpacity>
        )}
      />
      <View className="flex-row justify-between">
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
