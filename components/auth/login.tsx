import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Switch,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import CustomButton from "../button/custom_btn";
import CTextInput from "../inputs/text_input";
import { ErrorMessage, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { router } from "expo-router";
import { images } from "@/constants";
import { useUserState } from "@/modules/auth/context";
import { IUser } from "@/modules/auth/model";
import CMessageModal from "../modal/modal";
import * as SecureStore from "expo-secure-store";

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username is too short")
    .max(50, "Username is too long")
    .required("Username is required"),

  password: Yup.string()
    .min(4, "Password is too short")
    .max(50, "Password is too long")
    .required("Password is required"),
});

const LoginComponent = () => {
  const { login, fetchingState, setFetchingState, loading } = useUserState();
  const [status, setStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const checkStoredCredentials = async () => {
      const storedUsername = await SecureStore.getItemAsync(
        "remembered_username"
      );
      const storedPassword = await SecureStore.getItemAsync(
        "remembered_password"
      );
      if (storedUsername && storedPassword) {
        await login(storedUsername.trim(), storedPassword.trim()).then((_) => {
          router.replace("/home");
        });
      } else {
        setIsInitialized(true);
      }
    };
    checkStoredCredentials();
  }, []);
  const handleSubmission = async (values: IUser) => {
    try {
      await login(values.username.trim(), values.password.trim());
      setStatus("Success");
      setShowModal(true);

      if (rememberMe) {
        await SecureStore.setItemAsync(
          "remembered_username",
          values.username.trim()
        );
        await SecureStore.setItemAsync(
          "remembered_password",
          values.password.trim()
        );
      }

      setTimeout(() => {
        router.replace("/home");
      }, 3000);
    } catch (error) {
      setStatus("Error");
      setShowModal(true);
    }
  };

  if (!isInitialized) {
    return (
      <View className="absolute z-50 flex-1 w-screen h-screen justify-center items-center">
        <Image
          source={images.etLogo}
          className="w-60 h-60"
          resizeMode="contain"
        />
      </View>
    );
  }

  return (
    <View className="relative -z-40">
      <Image
        source={images.etLogo}
        className="rounded-xl my-4 flex-1 justify-center items-center w-full h-[150px] "
        resizeMode="contain"
      />
      <Text className="text-white text-center text-4xl font-psemibold">
        Login to Edu<Text className="text-main">Qest</Text>
      </Text>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={(values) => handleSubmission(values as any)}
      >
        {({
          values,
          handleBlur,
          handleChange,
          handleSubmit,
          errors,
          touched,
        }: FormikProps<any>) => (
          <View>
            <CTextInput
              name="username"
              title="Username"
              value={values.username}
              placeholder="Enter your username"
              otherStyles="mt-3"
              handler={handleChange("username")}
              onBlur={handleBlur("username")}
              onChangeText={handleChange("username")}
            />
            {errors.username && touched.username ? (
              <Text className="font-psemibold text-red-500">
                <ErrorMessage name="username" />
              </Text>
            ) : null}

            <CTextInput
              name="password"
              title="Password"
              value={values.password}
              placeholder="Enter your password"
              otherStyles="mt-3"
              handler={handleChange("password")}
              onBlur={handleBlur("password")}
              onChangeText={handleChange("password")}
              secureTextEntry
            />
            {errors.password && touched.password ? (
              <Text className="font-psemibold text-red-500">
                <ErrorMessage name="password" />
              </Text>
            ) : null}

            <View className="flex-row items-center mt-3">
              <Text className="text-lg font-psemibold text-white ml-2">
                Remember Me
              </Text>
              <Switch
                value={rememberMe}
                onValueChange={() => setRememberMe(!rememberMe)}
                trackColor={{ true: "#ffa001" }}
                thumbColor={"#fff"}
              />
            </View>

            <TouchableOpacity
              onPress={() => router.replace("/change")}
              className="flex-1 my-3 items-end"
            >
              <Text className="text-lg font-psemibold text-main">
                Forgot Password?
              </Text>
            </TouchableOpacity>

            <CustomButton
              title={`${loading ? "Please wait..." : "Login"}`}
              handlePress={handleSubmit}
              containerStyles="mt-3"
              disabled={false}
            />

            <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg font-pregular text-gray-100">
                Don't have account?
              </Text>
              <TouchableOpacity
                onPress={() => router.replace("/register")}
                className="my-3 items-end"
              >
                <Text className="text-lg font-psemibold text-main">
                  Register?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
      {status ? (
        <CMessageModal
          visible={showModal}
          title={`${status === "Success" ? "Success" : "Error!"}`}
          message={`${status === "Success" ? fetchingState : fetchingState}`}
          additionalMessage={`${
            status === "Success" ? "You will be redirected to the homepage" : ""
          }`}
          onClose={() => setShowModal(!showModal)}
          className="rounded-lg"
          type={`${status === "Success" ? "success" : "error"}`}
        />
      ) : null}
    </View>
  );
};

export default LoginComponent;
