import {
  View,
  Text,
  TextInput,
  Image,
  KeyboardTypeOptions,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputProps,
} from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";

interface IFormInput extends TextInputProps {
  name: string;
  title: string;
  value?: string | undefined;
  placeholder?: string | undefined;
  handler?: any | undefined;
  onBlur?:
    | ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
    | undefined;
  onChangeText?: ((text: string) => void) | undefined;
  otherStyles?: string | undefined;
  ignoreFormik?: boolean;
  keyboardType?: KeyboardTypeOptions | undefined;
}

const CTextInput: React.FC<IFormInput> = ({
  name,
  title,
  value,
  placeholder,
  ignoreFormik,
  handler,
  otherStyles,
  keyboardType,
  onBlur,
  onChangeText,
  ...props
}) => {
  const [showPassword, setshowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className={`text-base text-gray-100 font-pmedium`}>{title}</Text>
      <View className="w-full h-16 px-4 bg-slate-900 border-2 border-slate-600 rounded-2xl flex-row items-center focus:border-main">
        <TextInput
          {...props}
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          onBlur={onBlur}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChange={handler}
          keyboardType={keyboardType}
          secureTextEntry={title === "Password" && !showPassword}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setshowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyehide}
              className="w-6 h-6 "
              style={{ tintColor: "white" }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CTextInput;
