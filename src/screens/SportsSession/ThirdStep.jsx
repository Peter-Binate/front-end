import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "@/Redux/hooks";
import { setSportSessionData } from "@/Redux/Slices/sportSessionSlice";
import * as yup from "yup";
import { useFormik } from "formik";

const validationSchema = yup.object().shape({
  description: yup
    .string()
    .max(500, "La description ne doit pas dépasser 500 caractères.")
    .matches(
      /^[a-zA-Z0-9\s]+$/,
      "La description ne doit contenir que des caractères alphanumériques."
    ),
});

const ThirdStepScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [description, setDescription] = useState("");

  const formik = useFormik({
    initialValues: { description: "" },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(setSportSessionData({ description: values.description }));
      navigation.navigate("FourthStepSportSessionPage");
    },
  });

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 100 }}>
      <View>
        <Text>Description (facultatif)</Text>
        <TextInput
          value={formik.values.description}
          onChangeText={formik.handleChange("description")}
          onBlur={formik.handleBlur("description")}
          style={{
            borderColor: formik.errors.description ? "red" : "gray",
            borderWidth: 1,
            padding: 10,
            borderRadius: 5,
            marginVertical: 10,
          }}
          multiline
        />
        {formik.errors.description && (
          <Text style={{ color: "red" }}>{formik.errors.description}</Text>
        )}
        <TouchableOpacity
          onPress={formik.handleSubmit}
          style={{
            backgroundColor: "blue",
            padding: 10,
            borderRadius: 5,
            marginTop: 20,
          }}
        >
          <Text style={{ color: "white" }}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ThirdStepScreen;
