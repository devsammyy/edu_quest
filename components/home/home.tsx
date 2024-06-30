import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useUserState } from "@/modules/auth/context";

import EmptyState from "../empty/empty";

import History from "./history";
import Header from "./components/header";
import { router } from "expo-router";

const Home = () => {
  return (
    <FlatList
      data={[{ id: 1 }]}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={() => <Header />}
      renderItem={({ item }) => (
        <>
          <View>
            <View className="pt-2 flex-1 justify-between flex-row w-full">
              <Text className="text-gray-100 text-lg font-psemibold mb-3">
                Quiz Zone
              </Text>
              <TouchableOpacity onPress={() => router.push("/challenge")}>
                <Text className="text-gray-400 text-md font-psemibold mb-3">
                  View all
                </Text>
              </TouchableOpacity>
            </View>
            <View className="bg-slate-800 h-[150px] mb-5 flex-row rounded-lg p-4 items-center justify-center">
              <Text className="font-pmedium text-md text-white">
                Almost Ready! Click view all
              </Text>
            </View>
          </View>
          <View className="pt-2 flex-1 justify-between flex-row w-full">
            <Text className="text-gray-100 text-lg font-psemibold mb-3">
              Contest
            </Text>
            <TouchableOpacity>
              <Text className="text-gray-400 text-md font-psemibold mb-3">
                View all
              </Text>
            </TouchableOpacity>
          </View>
          <View className="bg-slate-800 h-[150px] mb-5 flex-row rounded-lg p-4 items-center justify-center">
            <Text className="font-pmedium text-md text-white">
              Coming soon!
            </Text>
          </View>
        </>
      )}
      ListEmptyComponent={() => (
        <EmptyState
          title="You haven't started any Quest"
          subtitle="Please proceed to challenge page"
        />
      )}
    />
  );
};

export default Home;
