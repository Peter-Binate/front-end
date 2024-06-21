import React, { useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { setSportSessionData } from "@/Redux/Slices/sportSessionSlice";
import * as yup from "yup";
import { useFormik } from "formik";
import Header from "@/components/Header/Header";
import CustomButton from "@/components/Button";

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
  const sportSessionData = useAppSelector(
    (state) => state.sportSession.sportSessionData
  );
  const isEditing = useAppSelector((state) => state.sportSession.isEditing);

  const formik = useFormik({
    initialValues: { description: sportSessionData.description || "" },
    validationSchema,
    onSubmit: (values) => {
      dispatch(setSportSessionData({ description: values.description }));
      navigation.navigate("FourthStepSportSessionPage");
    },
    enableReinitialize: true, // Important to reinitialize form when initialValues change
  });

  useEffect(() => {
    // Update Formik initial values when editing
    if (isEditing) {
      formik.setFieldValue("description", sportSessionData.description || "");
    }
  }, [isEditing, sportSessionData.description]);

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 100 }}>
      <Header
        title="Description"
        accessibilityLabel="Description de déance de sport"
        accessibilityHint="Décrivez le contenu de votre séance"
      />
      <View style={styles.container}>
        <Text
          nativeID="Description"
          aria-labelledby="Description"
          style={{
            fontSize: 14,
            color: "#737373",
            marginLeft: 5,
            marginBottom: 2,
            fontFamily: "LucioleRegular",
            alignItems: "left",
          }}
        >
          Description (facultatif)
        </Text>
        <TextInput
          value={formik.values.description}
          onChangeText={formik.handleChange("description")}
          onBlur={formik.handleBlur("description")}
          keyboardType="default"
          placeholder="Présentez-vous"
          style={styles.largeInput}
          multiline
        />
        {formik.errors.description && (
          <Text style={{ color: "red" }}>{formik.errors.description}</Text>
        )}
        <CustomButton
          text="Suivant"
          onPress={formik.handleSubmit}
          accessibilityLabel="Bouton Suivant"
          accessibilityHint="Cliquez ici pour accéder à l'étape suivante du formulaire d'inscription"
          backgroundColor="#FFFFFF"
          borderColor="#FF5C00"
          textColor="#FF5C00"
          width={250}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
    backgroundColor: "#FFF",
    width: "100%",
  },
  largeInput: {
    height: 100,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    width: "90%",
    height: 400,
  },
});

export default ThirdStepScreen;
