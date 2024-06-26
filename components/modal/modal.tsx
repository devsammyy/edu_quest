import { BlurView } from "expo-blur";
import React, { useEffect, useRef } from "react";
import {
  Modal,
  NativeSyntheticEvent,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

interface ICMessage {
  message: string;
  title: string;
  className?: string;
  additionalMessage?: string;
  onClose: ((event: NativeSyntheticEvent<any>) => void) | undefined;
  visible: boolean;
  type: "success" | "error";
}

const CMessageModal: React.FC<ICMessage> = ({
  message,
  title,
  className = "",
  onClose,
  visible,
  type,
  additionalMessage = "",
}) => {
  const scaleValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(scaleValue, {
        toValue: 0,
        friction: 5,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      {visible && (
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
              style={[
                { transform: [{ scale: scaleValue }] },
                {
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  width: "90%",
                  padding: 20,
                  borderRadius: 10,
                  alignItems: "center",
                },
              ]}
            >
              <Text className="text-3xl mt-5 font-bold text-white mb-4 font-pblack">
                {title}
              </Text>
              <TouchableOpacity
                className="px-4 py-2 absolute right-0 top-0"
                onPress={onClose}
              >
                <Text className="font-psemibold text-xl text-white">x</Text>
              </TouchableOpacity>
              <Text className="mb-4 text-white text-md font-pbold">
                {message}!
              </Text>
              {type === "success" && (
                <Icon name="check-circle" size={100} color="green" />
              )}
              {type === "error" && <Icon name="error" size={100} color="red" />}
              <Text className="text-white mt-4 font-psemibold">
                {additionalMessage}
              </Text>
            </Animated.View>
          </View>
        </View>
      )}
    </Modal>
  );
};

export default CMessageModal;
