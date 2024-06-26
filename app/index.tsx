import { Image, StyleSheet, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { Redirect, router } from "expo-router";
import { images } from "../constants";
import CustomButton from "@/components/button/custom_btn";
import { StatusBar } from "expo-status-bar";

const LandingPage = () => {
  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView>
        <View className=" w-full min-h-[85vh]  items-center px-4">
          <View className=" items-center">
            <Text className="font-pbold pt-20 text-white text-3xl">
              UNIVERSITY OF ILORIN
            </Text>
            <Text className="font-psemibold text-white text-lg">
              Department of Educational Technology
            </Text>
            <Image
              source={images.etLogo}
              className="rounded-2xl my-20 w-[200px] h-[250px] "
              resizeMode="contain"
            />
          </View>
          <View className=" items-center">
            <Text className="font-pbold text-white text-3xl">
              Welcome to <Text className="font-pblack text-main">EduQuest</Text>
            </Text>
            <Text className="font-pregular text-[16px] text-center text-gray-100">
              The ultimate educational game and quiz app designed to make
              learning fun and engaging!
            </Text>
          </View>

          <CustomButton
            title="Continue"
            handlePress={() => router.replace("/register")}
            containerStyles="w-full mt-7"
          />
        </View>
        <StatusBar style="dark" backgroundColor="#161622" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default LandingPage;
