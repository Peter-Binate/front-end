import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { setSportSessionData } from "@/Redux/Slices/sportSessionSlice";
import PlacesInput from "react-native-places-input";

const FourthStepScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { location, latitude, longitude } = useAppSelector(
    (state) => state.sportSession.sportSessionData
  );
  const [localLocation, setLocalLocation] = useState(location || "");
  const [localCoordinates, setLocalCoordinates] = useState({
    latitude: latitude || null,
    longitude: longitude || null,
  });
  const [error, setError] = useState("");
  const GoogleMapsApiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

  // On vérifie qu'on reçoit des informations de localisation valides
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
    console.log(
      "adresse: ",
      place.result.formatted_address,
      "latitude: ",
      lat,
      "\n",
      "longitude: ",
      lng
    );
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
    <View style={{ flex: 1, marginTop: 100 }}>
      <View>
        <Text>Location</Text>
        <View style={{ width: "100%" }}>
          <PlacesInput
            googleApiKey={GoogleMapsApiKey}
            placeHolder={"Entrez Votre Localisation"}
            queryCountries={["fr"]}
            language={"fr-FR"}
            onSelect={handleSelect}
            fetchDetails={true}
            value={localLocation}
            stylesContainer={{
              position: "relative",
              alignSelf: "stretch",
              margin: 0,
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              shadowOpacity: 0,
              borderColor: "#dedede",
              borderWidth: 1,
              marginBottom: 10,
            }}
            stylesList={{
              top: 50,
              borderColor: "#dedede",
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderBottomWidth: 1,
              left: -1,
              right: -1,
            }}
          />
          {error ? (
            <Text style={{ color: "red", marginTop: 5 }}>{error}</Text>
          ) : null}
        </View>

        <TouchableOpacity
          onPress={handleNext}
          disabled={
            !localLocation ||
            !localCoordinates.latitude ||
            !localCoordinates.longitude
          }
          style={{
            backgroundColor:
              localLocation &&
              localCoordinates.latitude &&
              localCoordinates.longitude
                ? "blue"
                : "gray",
            padding: 10,
            borderRadius: 5,
            marginTop: 20,
          }}
        >
          <Text style={{ color: "white" }}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FourthStepScreen;
