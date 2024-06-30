import { Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import CustomButton from "../button/custom_btn";
import CTextInput from "../inputs/text_input";
import { ErrorMessage, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { Link, router } from "expo-router";
import { images } from "@/constants";
import { useUserState } from "@/modules/auth/context";
import { IUser } from "@/modules/auth/model";
import CMessageModal from "../modal/modal";

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

  const handleSubmission = async (values: IUser) => {
    try {
      await login(values.username, values.password);
      setStatus("Success");
      setShowModal(true);
      setTimeout(() => {
        router.replace("/home");
      }, 3000);
    } catch (error) {
      setStatus("Error");
      setShowModal(true);
    }
  };

  return (
    <View>
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
