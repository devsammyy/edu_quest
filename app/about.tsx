import React from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AboutScreen = () => {
  return (
    <>
      <SafeAreaView className="m-h-[86vh]" />
      <ScrollView className="flex-1  bg-gray-100 p-4">
        <View className="items-center mb-6">
          <Text className="text-3xl font-bold text-gray-800">
            About Edu Quest
          </Text>
        </View>
        <View className="mb-6">
          <Text className="text-xl font-semibold text-gray-700">
            Welcome to Edu Quest
          </Text>
          <Text className="text-base text-gray-600 text-justify mt-2">
            Edu Quest is an innovative and engaging quiz app designed to enhance
            learning through interactive and challenging quizzes. Our mission is
            to provide a fun, educational, and rewarding experience for users of
            all ages and backgrounds.
          </Text>
        </View>

        <View className="mb-6">
          <Text className="text-xl font-semibold text-gray-700">Purpose</Text>
          <Text className="text-base text-gray-600 text-justify mt-2">
            The primary goal of Edu Quest is to facilitate learning and
            knowledge retention through quizzes that cover a wide range of
            subjects and difficulty levels. Whether you are a student looking to
            reinforce your classroom learning, a professional seeking to brush
            up on your knowledge, or just someone who enjoys testing their
            brainpower, our app has something for everyone.
          </Text>
        </View>

        <View className="mb-6">
          <Text className="text-xl font-semibold text-gray-700">Features</Text>
          <Text className="text-base text-gray-600 text-justify mt-2">
            {`1. Diverse Subject Matter: Our app offers quizzes on a variety of subjects, including Mathematics, Science, History, Literature, Geography, General Knowledge, and more.`}
          </Text>
          <Text className="text-base text-gray-600 text-justify mt-2">
            {`2. Multiple Difficulty Levels: To cater to learners of all skill levels, our quizzes are categorized into three difficulty levels: Easy, Medium, and Hard.`}
          </Text>
          <Text className="text-base text-gray-600 text-justify mt-2">
            {`3. User Progression and Rewards: We believe in rewarding our users for their efforts and achievements with a scoring system, levels and upgrades, XP and points.`}
          </Text>
          <Text className="text-base text-gray-600 text-justify mt-2">
            {`4. Interactive and User-Friendly Interface: Designed to be intuitive and easy to navigate with real-time feedback and progress tracking.`}
          </Text>
          <Text className="text-base text-gray-600 text-justify mt-2">
            {`5. Engaging Content: Thought-provoking content that is carefully crafted to test and improve your knowledge.`}
          </Text>
        </View>

        <View className="mb-6">
          <Text className="text-xl font-semibold text-gray-700">
            Our Vision
          </Text>
          <Text className="text-base text-gray-600 text-justify mt-2">
            At Edu Quest, we envision a world where learning is a continuous,
            enjoyable, and rewarding process. We aim to create a community of
            curious minds who are always eager to learn and grow. By offering a
            platform that combines education with gamification, we hope to
            inspire and motivate our users to reach their full potential.
          </Text>
        </View>

        <View className="mb-6">
          <Text className="text-xl font-semibold text-gray-700">Join Us</Text>
          <Text className="text-base text-gray-600 text-justify mt-2">
            We invite you to join us on this exciting journey of knowledge and
            discovery. Download Edu Quest today and start challenging yourself
            with our wide array of quizzes. Whether you are looking to learn
            something new or test your existing knowledge, our app is here to
            support and encourage your learning endeavors.
          </Text>
        </View>

        <Text className="text-base text-gray-600 text-justify mt-2 mb-10">
          Thank you for choosing Edu Quest. Let the learning adventure begin!
        </Text>
      </ScrollView>
    </>
  );
};

export default AboutScreen;
