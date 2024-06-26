import { View, Text, ScrollView, GestureResponderEvent } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RegisterComponent from "@/components/auth/register";

const Register = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[83vh] px-4 my-6">
          <RegisterComponent />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
