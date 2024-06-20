import { Text, View, Image } from "react-native";
import React, { useState } from "react";

import { ErrorMessage, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { images } from "@/constants";
import CustomButton from "@/components/button/custom_btn";
import CTextInput from "@/components/inputs/text_input";

const ForgotSchema = Yup.object().shape({
  email: Yup.string()
    .email("The email address is invalid")
    .required("Email is required"),
});

const ForgotComponent = () => {
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
      <Text className="text-white text-center text-3xl font-psemibold">
        Enter your email address
      </Text>
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={ForgotSchema}
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
              title="Email"
              value={values.email}
              placeholder="Enter your email address"
              otherStyles="mt-3"
              handler={handleChange("email")}
              onBlur={handleBlur("email")}
              onChangeText={handleChange("email")}
            />
            {errors.email && touched.email ? (
              <Text className="text-red-500">
                <ErrorMessage name="email" />
              </Text>
            ) : null}

            <CustomButton
              title={`${isSubmitting ? "Please wait..." : "Proceed"}`}
              handlePress={handleSubmit}
              containerStyles="mt-3"
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default ForgotComponent;
