import { Text, View, Image } from "react-native";
import React, { useState } from "react";

import { ErrorMessage, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { images } from "@/constants";
import CustomButton from "@/components/button/custom_btn";
import CTextInput from "@/components/inputs/text_input";

const ChangeSchema = Yup.object().shape({
  password: Yup.string()
    .min(4, "Password is too short")
    .required("Email is required"),
  confirmPassword: Yup.string()
    .min(4, "Password is too short")
    .required("Email is required"),
});

const ChangePasswordScreen = () => {
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
        Change Password
      </Text>
      <Formik
        initialValues={{
          password: "",
          confirmPassword: "",
        }}
        validationSchema={ChangeSchema}
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
              name="password"
              title="New Password"
              value={values.password}
              placeholder="Enter a new password"
              otherStyles="mt-3"
              handler={handleChange("password")}
              onBlur={handleBlur("password")}
              onChangeText={handleChange("password")}
            />
            {errors.password && touched.password ? (
              <Text className="text-red-500 font-psemibold">
                <ErrorMessage name="password" />
              </Text>
            ) : null}

            <CTextInput
              name="confirmPassword"
              title="Confirm Password"
              value={values.confirmPassword}
              placeholder="Confirm Password"
              otherStyles="mt-3"
              handler={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              onChangeText={handleChange("confirmPassword")}
            />
            {errors.confirmPassword && touched.confirmPassword ? (
              <Text className="text-red-500 font-psemibold">
                <ErrorMessage name="confirmPassword" />
              </Text>
            ) : null}

            <CustomButton
              title={`${isSubmitting ? "Please wait..." : "Change Password"}`}
              handlePress={handleSubmit}
              containerStyles="mt-3"
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default ChangePasswordScreen;
