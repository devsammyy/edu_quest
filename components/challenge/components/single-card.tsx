import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  Modal,
  StyleSheet,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import BlurView from "expo-blur/build/BlurView";

interface IProps {
  name: string;
  icon: ImageSourcePropType | undefined;
}

const QuestionCard: React.FC<IProps> = ({ name, icon }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = () => {
    setModalVisible(true);
  };

  const handleDifficultySelect = (difficulty: string) => {
    setModalVisible(false);
    router.push({
      pathname: `${name.toLowerCase()}`,
      params: { difficulty, name: name.toLowerCase() },
    });
  };
  const scaleValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (modalVisible) {
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(scaleValue, {
        toValue: 0,
        friction: 3,
        useNativeDriver: true,
      }).start();
    }
  }, [modalVisible]);

  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <LinearGradient
          colors={["#ffa001", "#1E293B"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="items-center w-[150px] m-1 rounded-md justify-center bg-gradient-to-tr from-[#ffa001] to-[#1E293B] h-[150px]"
        >
          <Image
            source={icon}
            className="w-16 h-16"
            tintColor={"#f4f4f4"}
            resizeMode="contain"
          />
          <Text className=" text-white text-lg mt-3 font-psemibold">
            {name === "Mispelled"
              ? "Mispelled Words"
              : name === "Edu"
              ? "Education"
              : name === "Maths"
              ? "Mathematics"
              : name === "Edutech"
              ? "Educational Technology"
              : name}
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={{ flex: 1 }}>
          <BlurView
            style={{
              position: "absolute",

              backgroundColor: "rgba(0,0,0,.9)",
              width: "100%",
              height: "100%",
            }}
            tint="dark"
            intensity={50}
          />
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Animated.View
              className="bg-primary"
              style={[
                { transform: [{ scale: scaleValue }] },
                {
                  width: "90%",
                  padding: 20,
                  borderRadius: 10,
                  alignItems: "center",
                },
              ]}
            >
              <Text className="text-white font-psemibold my-5 text-xl">
                Select Difficulty
              </Text>
              {["easy", "medium", "hard"].map((level) => (
                <LinearGradient
                  key={level}
                  colors={["#ffa001", "#1E293B"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="my-2 rounded-xl w-full  min-h-[62px] justify-center items-center"
                >
                  <TouchableOpacity
                    onPress={() => handleDifficultySelect(level)}
                    className="w-full justify-normal items-center"
                  >
                    <Text className="text-lg font-psemibold text-white">
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              ))}
            </Animated.View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginVertical: 5,
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default QuestionCard;
