import { Image, StyleSheet, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { Link } from "expo-router";
import { images } from "../constants";

const LandingPage = () => {
  console.log(images.logo);
  return (
    <SafeAreaView className=" h-full bg-primary">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className=" w-full h-full flex-1 items-center px-4">
          <View className=" items-center">
            <Text className="font-pbold pt-20 text-white text-3xl">
              UNIVERSITY OF ILORIN
            </Text>
            <Text className="font-psemibold text-white text-lg">
              Department of Educational Technology
            </Text>
            <Image
              source={images.logo}
              className=" rounded-2xl w-[135px]"
              resizeMode="center"
            />
          </View>
          <View className=" items-center">
            <Text className="font-pbold text-white text-3xl">
              Welcome to <Text className="font-pblack text-main">EduQuest</Text>
            </Text>
            <Text className="font-pregular text-md text-center text-gray-100">
              The ultimate educational game and quiz app designed to make
              learning fun and engaging!
            </Text>
            <Text className="font-pregular text-md text-center text-gray-100">
              The ultimate educational game and quiz app designed to make
              learning fun and engaging!
            </Text>
            <Text className="font-pregular text-md text-center text-gray-100">
              The ultimate educational game and quiz app designed to make
              learning fun and engaging!
            </Text>
            <Text className="font-pregular text-md text-center text-gray-100">
              The ultimate educational game and quiz app designed to make
              learning fun and engaging!
            </Text>
            <Text className="font-pregular text-md text-center text-gray-100">
              The ultimate educational game and quiz app designed to make
              learning fun and engaging!
            </Text>
            <Text className="font-pregular text-md text-center text-gray-100">
              The ultimate educational game and quiz app designed to make
              learning fun and engaging!
            </Text>
            <Text className="font-pregular text-md text-center text-gray-100">
              The ultimate educational game and quiz app designed to make
              learning fun and engaging!
            </Text>
            <Text className="font-pregular text-md text-center text-gray-100">
              The ultimate educational game and quiz app designed to make
              learning fun and engaging!
            </Text>
            <Text className="font-pregular text-md text-center text-gray-100">
              The ultimate educational game and quiz app designed to make
              learning fun and engaging!
            </Text>
            <Text className="font-pregular text-md text-center text-gray-100">
              The ultimate educational game and quiz app designed to make
              learning fun and engaging!
            </Text>
            <Text className="font-pregular text-md text-center text-gray-100">
              The ultimate educational game and quiz app designed to make
              learning fun and engaging!
            </Text>
            <Text className="font-pregular text-md text-center text-gray-100">
              The ultimate educational game and quiz app designed to make
              learning fun and engaging!
            </Text>
            <Text className="font-pregular text-md text-center text-gray-100">
              The ultimate educational game and quiz app designed to make
              learning fun and engaging!
            </Text>
            <Text className="font-pregular text-md text-center text-gray-100">
              The ultimate educational game and quiz app designed to make
              learning fun and engaging!
            </Text>
            <Text className="font-pregular text-md text-center text-gray-100">
              The ultimate educational game and quiz app designed to make
              learning fun and engaging!
            </Text>
            <Text className="font-pregular text-md text-center text-gray-100">
              The ultimate educational game and quiz app designed to make
              learning fun and engaging!
            </Text>
            <Text className="font-pregular text-md text-center text-gray-100">
              The ultimate educational game and quiz app designed to make
              learning fun and engaging!
            </Text>
          </View>
          <Link className="text-white" href={"/home"}>
            {" "}
            Go to home
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LandingPage;
