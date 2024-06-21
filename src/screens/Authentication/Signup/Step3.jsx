import React, { useState, useEffect } from "react";
import {
  StyleSheet,
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
import PlacesInput from "react-native-places-input";
import Header from "@/components/Header/Header";
import CustomButton from "@/components/Button";
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
  const [localLocation, setLocalLocation] = useState(userData.location || "");
  const [localCoordinates, setLocalCoordinates] = useState({
    latitude: userData.latitude || null,
    longitude: userData.longitude || null,
  });
  const [locationError, setLocationError] = useState("");

  const GoogleMapsApiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

  const handleSelect = (place) => {
    if (
      !place ||
      !place.result ||
      !place.result.geometry ||
      !place.result.geometry.location
    ) {
      setLocationError("Adresse non trouvée, veuillez réessayer.");
      return;
    }
    const { lat, lng } = place.result.geometry.location;
    setLocalLocation(place.result.formatted_address);
    setLocalCoordinates({ latitude: lat, longitude: lng });
    setLocationError("");
    dispatch(
      setRegisterUserData({
        location: place.result.formatted_address,
        latitude: lat,
        longitude: lng,
      })
    );
  };

  useEffect(() => {
    if (userData.location) {
      setLocalLocation(userData.location);
      setLocalCoordinates({
        latitude: userData.latitude,
        longitude: userData.longitude,
      });
    }
  }, [userData.location, userData.latitude, userData.longitude]);

  const formik = useFormik({
    initialValues: {
      firstname: userData.firstname || "",
      lastname: userData.lastname || "",
      phoneNumber: userData.phoneNumber || "",
      birthDate: userData.birthDate || "",
      biography: userData.biography || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (
        !localLocation ||
        !localCoordinates.latitude ||
        !localCoordinates.longitude
      ) {
        setLocationError(
          "Veuillez sélectionner une localisation valide avant de continuer."
        );
        return;
      }
      dispatch(setRegisterUserData(values));
      navigation.navigate("Step4");
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Profil"
        accessibilityLabel="Détails du profil"
        accessibilityHint="Entrez les détails de votre profil"
      />
      <View style={styles.form}>
        <Text
          nativeID="inputFirstname"
          aria-labelledby="labelFirstname"
          style={{
            fontSize: 14,
            fontFamily: "LucioleRegular",
            color: "#737373",
            marginLeft: 5,
            marginBottom: 2,
          }}
        >
          Votre prénom
        </Text>
        <TextInput
          style={styles.input}
          value={formik.values.firstname}
          onChangeText={formik.handleChange("firstname")}
          placeholder="Votre prénom"
          accessibilityLabel="Prénom"
          accessibilityHint="Entrer votre prénom ici"
          aria-label="input"
          aria-labelledby="labelFirstname"
        />
        <Text
          aria-label="Label for Username"
          nativeID="labelUsername"
          accessibilityLabel="Nom"
          accessibilityHint="Entrer votre nom ici"
          aria-labelledby="labelName"
          style={{
            fontSize: 14,
            fontFamily: "LucioleRegular",
            color: "#737373",
            marginLeft: 5,
            marginBottom: 2,
          }}
          style={{
            fontSize: 14,
            fontFamily: "LucioleRegular",
            color: "#737373",
            marginLeft: 5,
            marginBottom: 2,
          }}
        >
          Votre Nom
        </Text>
        <TextInput
          style={styles.input}
          value={formik.values.lastname}
          onChangeText={formik.handleChange("lastname")}
          placeholder="Votre nom"
          aria-label="Label for name"
          nativeID="labelName"
          accessibilityLabel="Nom"
          accessibilityHint="Entrer votre nom de famille de téléphone ici"
          aria-labelledby="labelName"
        />
        <Text
          aria-label="Label for Username"
          nativeID="labelUsername"
          style={{
            fontSize: 14,
            fontFamily: "LucioleRegular",
            color: "#737373",
            marginLeft: 5,
            marginBottom: 2,
          }}
        >
          Votre numéro de téléphone
        </Text>
        <TextInput
          style={styles.input}
          value={formik.values.phoneNumber}
          onChangeText={formik.handleChange("phoneNumber")}
          placeholder="Votre numéro de téléphone"
          keyboardType="phone-pad"
          accessibilityLabel="Phone Number"
          accessibilityHint="Entrer votre numéro de téléphone ici"
          aria-labelledby="labelPhoneNumber"
        />
        <PlacesInput
          googleApiKey={GoogleMapsApiKey}
          placeHolder="Entrez votre localisation"
          accessibilityLabel="Localisation"
          accessibilityHint="Entrer votre localisation ici"
          onSelect={handleSelect}
          queryCountries={["fr"]}
          value={localLocation}
          stylesContainer={{
            position: "relative",
            alignSelf: "stretch",
            margin: 0,
            top: -5,
            left: 0,
            right: 0,
            bottom: 0,
            shadowOpacity: 0,
            borderColor: "#dedede",
            borderColor: "#ccc",
            padding: 20,
            borderRadius: 20,
            marginBottom: 10,
          }}
        />
        <Text
          style={{
            fontSize: 14,
            fontFamily: "LucioleRegular",
            color: "#737373",
            marginLeft: 5,
            marginBottom: 2,
          }}
        >
          Votre année de naissance
        </Text>
        <TextInput
          style={styles.input}
          value={formik.values.birthDate}
          onChangeText={formik.handleChange("birthDate")}
          placeholder="Date de naissance"
          accessibilityLabel="Birth Date"
          accessibilityHint="Entrer votre birth date ici"
        />
        <Text
          style={{
            fontSize: 14,
            fontFamily: "LucioleRegular",
            color: "#737373",
            marginLeft: 5,
            marginBottom: 2,
          }}
        >
          Votre Biographie
        </Text>
        <TextInput
          style={styles.textArea}
          value={formik.values.biography}
          onChangeText={formik.handleChange("biography")}
          placeholder="Biographie"
          multiline={true}
          numberOfLines={4}
          accessibilityLabel="Biography"
          accessibilityHint="Entrer votre biography ici"
        />
        <View style={styles.buttonView}>
          <CustomButton
            text="Suivant"
            onPress={formik.handleSubmit}
            disabled={!formik.isValid}
            accessibilityLabel="Bouton Suivant"
            accessibilityHint="Cliquez ici pour accéder à l'étape suivante du formulaire d'inscription"
            backgroundColor="#FFFFFF"
            borderColor="#FF5C00"
            textColor="#FF5C00"
            width={250}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF",
    marginTop: 70,
  },
  form: {
    width: "100%",
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    borderRadius: 20,
    marginBottom: 10,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 20,
    borderRadius: 5,
    height: 100,
    textAlignVertical: "top",
    marginBottom: 10,
  },
  placesInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonView: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

export default Step3;
