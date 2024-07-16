import { Text, View, Image } from "react-native";
import React, { useState } from "react";

import { ErrorMessage, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { images } from "@/constants";
import CustomButton from "@/components/button/custom_btn";
import CTextInput from "@/components/inputs/text_input";
import { useUserState } from "@/modules/auth/context";
import CMessageModal from "../modal/modal";

const ChangeSchema = Yup.object().shape({
  email: Yup.string().email().required("Please enter a valid email address"),
  password: Yup.string()
    .min(4, "Password is too short")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .min(4, "Password is too short")
    .required("Password is required"),
});

const ChangePasswordScreen = () => {
  const {updateUser, loading, fetchingState} = useUserState()
  const [showModal, setShowModal] = useState(false)
  const [isError, setIsError] = useState(false)

  const handleSubmission = (values: any) => {
    
    updateUser(values)
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
          email: "",
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
              name="email"
              title="Email address"
              value={values.email}
              placeholder="Enter your email address"
              otherStyles="mt-3"
              handler={handleChange("email")}
              onBlur={handleBlur("email")}
              onChangeText={handleChange("email")}
            />
            {errors.email && touched.email ? (
              <Text className="text-red-500 font-psemibold">
                <ErrorMessage name="email" />
              </Text>
            ) : null}

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
              title={`${loading ? "Please wait..." : "Change Password"}`}
              handlePress={handleSubmit}
              containerStyles="mt-3"
              disabled={false}
            />
        <CMessageModal
          visible={showModal}
          title={`${!isError ? "Success" : "Error!"}`}
          message={`${!isError ? fetchingState : fetchingState}`}
          additionalMessage={`${
            !isError
              ? "You will be redirected to the login page"
              : ""
          }`}
          onClose={() => setShowModal(!showModal)}
          className="rounded-lg"
          type={`${!isError ? "success" : "error"}`}
        />
          </View>
        )}

      </Formik>
    </View>
  );
};

export default ChangePasswordScreen;
