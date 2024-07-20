import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { getData } from "@/modules/challenge/service";
import { useUserState } from "@/modules/auth/context";

const Achievements: React.FC = () => {
  const { user } = useUserState();
  const [level, setLevel] = useState("Beginner");
  const [completedLevels, setCompletedLevels] = useState({
    easy: false,
    medium: false,
    hard: false,
  });

  useEffect(() => {
    const fetchOverallProgress = async () => {
      try {
        const overallProgress = await getData(`overall_progress_${user?.id}`);
        if (overallProgress) {
          setCompletedLevels(overallProgress.completed);
          setLevel(overallProgress.level);
        }
      } catch (error) {
        console.error("Failed to fetch overall progress:", error);
      }
    };

    fetchOverallProgress();
  }, [user]);

  const getBadgeText = () => {
    return `${level} Achieved!`;
  };

  const getBadgeImage = () => {
    switch (level) {
      case "Intermediate Scholar":
        return require("@/assets/icons/intermediate.png");
      case "Advanced Scholar":
        return require("@/assets/icons/advanced.png");
      default:
        return require("@/assets/icons/badge.png");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={getBadgeImage()} style={styles.badge} />
      <Text style={styles.badgeText}>{getBadgeText()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E1E1E", // Dark background for contrast
  },
  animation: {
    width: 100,
    height: 100,
  },
  badge: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  badgeText: {
    fontSize: 18,
    color: "white",
  },
});

export default Achievements;
