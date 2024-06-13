import React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  View,
  AccessibilityInfo,
} from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { setRegisterUserData } from "@/Redux/Slices/registerSlice";
import { useNavigation } from "@react-navigation/native";

// Schéma de validation avec yup
const schema = yup.object().shape({
  firstname: yup
    .string()
    .matches(/^[A-Za-z]+$/, "Le prénom ne doit contenir que des lettres.")
    .min(3, "Le prénom doit contenir au moins 3 lettres.")
    .max(50, "Le prénom ne doit pas dépasser 50 lettres.")
    .required("Le prénom est obligatoire."),
  lastname: yup
    .string()
    .matches(/^[A-Za-z]+$/, "Le nom ne doit contenir que des lettres.")
    .min(3, "Le nom doit contenir au moins 3 lettres.")
    .max(50, "Le nom ne doit pas dépasser 50 lettres.")
    .required("Le nom est obligatoire."),
  phoneNumber: yup
    .string()
    .matches(
      /^((\+)33|0)[1-9](\d{2}){4}$/,
      "Le numéro de téléphone doit être un numéro français valide."
    ),
  biography: yup
    .string()
    .matches(
      /^[A-Za-z0-9\s]*$/,
      "La biographie ne doit contenir que des caractères alphanumériques."
    ),
});

const Step3 = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.register.registerUserData);

  const formik = useFormik({
    initialValues: {
      firstname: userData.firstname || "",
      lastname: userData.lastname || "",
      phoneNumber: userData.phoneNumber || "",
      location: userData.location || "",
      birthDate: userData.birthDate || "",
      biography: userData.biography || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(setRegisterUserData(values));
      navigation.navigate("Step4");
    },
  });

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 100 }}>
      <View>
        <Text>First Name</Text>
        <TextInput
          value={formik.values.firstname}
          onChangeText={formik.handleChange("firstname")}
          onBlur={formik.handleBlur("firstname")}
        />
        {formik.touched.firstname && formik.errors.firstname ? (
          <Text style={{ color: "red" }}>{formik.errors.firstname}</Text>
        ) : null}

        <Text>Last Name</Text>
        <TextInput
          value={formik.values.lastname}
          onChangeText={formik.handleChange("lastname")}
          onBlur={formik.handleBlur("lastname")}
        />
        {formik.touched.lastname && formik.errors.lastname ? (
          <Text style={{ color: "red" }}>{formik.errors.lastname}</Text>
        ) : null}

        <Text>Phone Number</Text>
        <TextInput
          value={formik.values.phoneNumber}
          onChangeText={formik.handleChange("phoneNumber")}
          onBlur={formik.handleBlur("phoneNumber")}
        />
        {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
          <Text style={{ color: "red" }}>{formik.errors.phoneNumber}</Text>
        ) : null}

        <Text>Location</Text>
        <TextInput
          value={formik.values.location}
          onChangeText={formik.handleChange("location")}
          onBlur={formik.handleBlur("location")}
        />

        <Text>Birth Date</Text>
        <TextInput
          value={formik.values.birthDate}
          onChangeText={formik.handleChange("birthDate")}
          onBlur={formik.handleBlur("birthDate")}
        />

        <Text>Biographie</Text>
        <TextInput
          value={formik.values.biography}
          onChangeText={formik.handleChange("biography")}
          onBlur={formik.handleBlur("biography")}
        />
        {formik.touched.biography && formik.errors.biography ? (
          <Text style={{ color: "red" }}>{formik.errors.biography}</Text>
        ) : null}

        <TouchableOpacity onPress={formik.handleSubmit}>
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Step3;
