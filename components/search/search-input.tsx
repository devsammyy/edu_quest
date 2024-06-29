import {
  View,
  TextInput,
  ColorValue,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";

interface IProps {
  value?: string | undefined;
  title?: string | undefined;
  placeholder?: string | undefined;
  placeholderTextColor?: ColorValue | undefined;
  handleChangeText?: ((text: string) => void) | undefined;
  secureTextEntry?: boolean | undefined;
}

const SearchInput: React.FC<IProps> = ({
  value,
  placeholder,
  handleChangeText,
  title,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className="border-2 border-slate-900 w-full h-16 px-4 bg-slate-800 rounded-2xl focus:border-main items-center flex-row space-x-4">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
        secureTextEntry={title === "Password" && !showPassword}
      />
      {true && (
        <TouchableOpacity onPress={() => {}}>
          <Image
            source={!showPassword ? icons.search : icons.eyehide}
            className="w-6 h-6 "
            style={{ tintColor: "white" }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchInput;
