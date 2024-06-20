import { Text, View, Image } from "react-native";
import React, { useState } from "react";
import CustomButton from "../button/custom_btn";
import CTextInput from "../inputs/text_input";
import { ErrorMessage, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { Link } from "expo-router";
import { images } from "@/constants";

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username is too short")
    .max(50, "Username is too long")
    .required("Username is required"),

  password: Yup.string()
    .min(6, "Password is too short")
    .max(50, "Password is too long")
    .required("Password is required"),
});

const LoginComponent = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmission = (values: any) => {
    console.log(values);
    alert("Holla");
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
          email: "",
          matricNo: "",
          fullName: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={(values) => handleSubmission(values)}
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

            <View className="flex-1 my-3 items-end">
              <Link href="/forgot" className="text-lg font-psemibold text-main">
                Forgot Password?
              </Link>
            </View>

            <CustomButton
              title={`${isSubmitting ? "Please wait..." : "Login"}`}
              handlePress={handleSubmit}
              containerStyles="mt-3"
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default LoginComponent;
