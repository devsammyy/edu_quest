import { Text, View, Image } from "react-native";
import React, { useState } from "react";
import CustomButton from "../button/custom_btn";
import CTextInput from "../inputs/text_input";
import { ErrorMessage, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { images } from "@/constants";

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username is too short")
    .max(50, "Username is too long")
    .required("Username is required"),
  email: Yup.string()
    .email("The email address is invalid")
    .required("Email is required"),
  matricNo: Yup.string()
    .required("Matric number is required")
    .matches(/^\d{2}\/\d{2}[A-Z]{2}\d{3}$/, "Invalid Matric Number format")
    .min(3, "Matric number is too short")
    .max(50, "Matric number is too long"),
  fullName: Yup.string()
    .min(3, "Full name is too short")
    .max(50, "Full name is too long")
    .required("Full name is required"),
  password: Yup.string()
    .min(6, "Password is too short")
    .max(50, "Password is too long")
    .required("Password is required"),
});

const RegisterComponent = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmission = (values: any) => {
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
        Signup to Edu<Text className="text-main">Qest</Text>
      </Text>
      <Formik
        initialValues={{
          username: "",
          email: "",
          matricNo: "",
          fullName: "",
          password: "",
        }}
        validationSchema={RegisterSchema}
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
              name="fullName"
              title="Full Name"
              value={values.fullName}
              placeholder="Enter your Full Name"
              otherStyles="mt-7"
              handler={handleChange("fullName")}
              onChangeText={handleChange("fullName")}
              onBlur={handleBlur("fullName")}
            />
            {errors.fullName && touched.fullName ? (
              <Text className=" font-psemibold text-red-500">
                <ErrorMessage name="fullName" />
              </Text>
            ) : null}

            <CTextInput
              name="email"
              title="Email"
              value={values.email}
              placeholder="Enter your email address"
              otherStyles="mt-3"
              handler={handleChange("email")}
              onBlur={handleBlur("email")}
              onChangeText={handleChange("email")}
              keyboardType="email-address"
            />
            {errors.email && touched.email ? (
              <Text className=" font-psemibold text-red-500">
                <ErrorMessage name="email" />
              </Text>
            ) : null}

            <CTextInput
              name="username"
              title="Username"
              value={values.username}
              placeholder="Choose a username"
              otherStyles="mt-3"
              handler={handleChange("username")}
              onBlur={handleBlur("username")}
              onChangeText={handleChange("username")}
            />
            {errors.username && touched.username ? (
              <Text className=" font-psemibold text-red-500">
                <ErrorMessage name="username" />
              </Text>
            ) : null}

            <CTextInput
              name="matricNo"
              title="Matric No"
              value={values.matricNo}
              placeholder="Enter your matric no"
              otherStyles="mt-3"
              handler={handleChange("matricNo")}
              onBlur={handleBlur("matricNo")}
              onChangeText={handleChange("matricNo")}
            />
            {errors.matricNo && touched.matricNo ? (
              <Text className=" font-psemibold text-red-500">
                <ErrorMessage name="matricNo" />
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
              <Text className=" font-psemibold text-red-500">
                <ErrorMessage name="password" />
              </Text>
            ) : null}

            <CustomButton
              title={`${isSubmitting ? "Please wait..." : "Register"}`}
              handlePress={handleSubmit}
              containerStyles="mt-3"
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default RegisterComponent;
