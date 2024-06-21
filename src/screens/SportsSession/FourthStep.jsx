import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { setSportSessionData } from "@/Redux/Slices/sportSessionSlice";
import PlacesInput from "react-native-places-input";
import Header from "@/components/Header/Header";
import CustomButton from "@/components/Button";
import MapView, { Marker } from "react-native-maps";

const FourthStepScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { location, latitude, longitude } = useAppSelector(
    (state) => state.sportSession.sportSessionData
  );
  const [localLocation, setLocalLocation] = useState(location || "");
  const [localCoordinates, setLocalCoordinates] = useState({
    latitude: latitude || 48.8566, // Default to Paris coordinates
    longitude: longitude || 2.3522,
  });
  const [error, setError] = useState("");
  const GoogleMapsApiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

  const handleSelect = (place) => {
    if (
      !place ||
      !place.result ||
      !place.result.geometry ||
      !place.result.geometry.location
    ) {
      setError("Adresse non trouvée, veuillez réessayer.");
      console.error("Adresse non trouvée:", place);
      return;
    }

    const { lat, lng } = place.result.geometry.location;
    setLocalLocation(place.result.formatted_address);
    setLocalCoordinates({ latitude: lat, longitude: lng });
    setError("");
  };

  useEffect(() => {
    if (location) {
      setLocalLocation(location);
    }
    if (latitude && longitude) {
      setLocalCoordinates({ latitude, longitude });
    }
  }, [location, latitude, longitude]);

  const handleNext = () => {
    if (
      localLocation &&
      localCoordinates.latitude &&
      localCoordinates.longitude
    ) {
      dispatch(
        setSportSessionData({
          location: localLocation,
          latitude: localCoordinates.latitude,
          longitude: localCoordinates.longitude,
        })
      );
      navigation.navigate("FifthStepSportSessionPage");
    } else {
      setError(
        "Veuillez sélectionner une localisation valide avant de continuer."
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Où ?"
        accessibilityLabel="Choix de localisation"
        accessibilityHint="Inscrivez le lieu de la séance sportive"
      />
      <View style={styles.form}>
        <Text
          nativeID="Location"
          aria-labelledby="Location"
          style={styles.label}
        >
          Localisation
        </Text>
        <PlacesInput
          googleApiKey={GoogleMapsApiKey}
          placeHolder={"Entrez la localisation de la séance"}
          queryCountries={["fr"]}
          language={"fr-FR"}
          onSelect={handleSelect}
          fetchDetails={true}
          value={localLocation}
          stylesContainer={styles.placesInputContainer}
          stylesList={styles.placesInputList}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <MapView
          style={styles.map}
          region={{
            latitude: localCoordinates.latitude,
            longitude: localCoordinates.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker coordinate={localCoordinates} />
        </MapView>
        <CustomButton
          text="Suivant"
          onPress={handleNext}
          disabled={
            !localLocation ||
            !localCoordinates.latitude ||
            !localCoordinates.longitude
          }
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

const height = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    height: height,
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    width: "90%",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    color: "#737373",
    marginLeft: 8,
    marginBottom: 2,
    fontFamily: "LucioleRegular",
    alignSelf: "flex-start",
  },
  placesInputContainer: {
    width: "100%",
    top: 30,
    marginLeft: -7,
    marginBottom: 10,
    borderColor: "#dedede",
    borderWidth: 1,
    borderRadius: 5,
  },
  placesInputList: {
    top: 50,
    borderColor: "#dedede",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    left: -1,
    right: -1,
  },
  map: {
    width: "100%",
    height: 300,
    marginVertical: 20,
    marginTop: 100,
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
});

export default FourthStepScreen;
