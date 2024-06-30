import { View, Text, FlatList } from "react-native";
import React from "react";
import RecentChallengeCard from "./histotry-card";

interface IProps {
  data: ArrayLike<any> | null | undefined;
}

const History: React.FC<IProps> = ({ data }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View>
          <Text className="text-white">{item.id}</Text>
          <Text className="text-white">{item.name}</Text>
          <Text className="text-white">{item.email}</Text>
        </View>
      )}
      horizontal
    />
  );
};

export default History;
