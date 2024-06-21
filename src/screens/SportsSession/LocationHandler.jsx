import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header/Header";
import CustomButton from "@/components/Button";

const sportsData = [
  {
    id: 1,
    name: "Football",
    defaultIcon: require("@/assets/images/football-bleu.png"),
    selectedIcon: require("@/assets/images/football-blanc.png"),
  },
  {
    id: 2,
    name: "Course",
    defaultIcon: require("@/assets/images/course-bleu.png"),
    selectedIcon: require("@/assets/images/course-blanc.png"),
  },
  {
    id: 3,
    name: "Vélo",
    defaultIcon: require("@/assets/images/velo-bleu.png"),
    selectedIcon: require("@/assets/images/velo-blanc.png"),
  },
  {
    id: 4,
    name: "Randonnée",
    defaultIcon: require("@/assets/images/rando-bleu.png"),
    selectedIcon: require("@/assets/images/rando-blanc.png"),
  },
  {
    id: 5,
    name: "Yoga",
    defaultIcon: require("@/assets/images/yoga-bleu.png"),
    selectedIcon: require("@/assets/images/yoga-blanc.png"),
  },
  {
    id: 6,
    name: "Musculation",
    defaultIcon: require("@/assets/images/musculation-bleu.png"),
    selectedIcon: require("@/assets/images/musculation-blanc.png"),
  },
  {
    id: 7,
    name: "Natation",
    defaultIcon: require("@/assets/images/natation-bleu.png"),
    selectedIcon: require("@/assets/images/natation-blanc.png"),
  },
  {
    id: 8,
    name: "Combat",
    defaultIcon: require("@/assets/images/combat-bleu.png"),
    selectedIcon: require("@/assets/images/combat-blanc.png"),
  },
  {
    id: 9,
    name: "Voile",
    defaultIcon: require("@/assets/images/voile-bleu.png"),
    selectedIcon: require("@/assets/images/voile-blanc.png"),
  },
  {
    id: 10,
    name: "Ping Pong",
    defaultIcon: require("@/assets/images/pingpong-bleu.png"),
    selectedIcon: require("@/assets/images/pingpong-blanc.png"),
  },
  {
    id: 11,
    name: "Salle de sport",
    defaultIcon: require("@/assets/images/salledesport-bleu.png"),
    selectedIcon: require("@/assets/images/salledesport-blanc.png"),
  },
  {
    id: 12,
    name: "Autre",
    defaultIcon: require("@/assets/images/autre-bleu.png"),
    selectedIcon: require("@/assets/images/autre-blanc.png"),
  },
];

const LocationHandlerScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [sessions, setSessions] = useState([]);
  const { authState } = useAuth();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(
        "latitude: ",
        location.coords.latitude,
        "et longitude: ",
        location.coords.longitude
      );
    })();
  }, []);

  const sendLocationToBackend = async () => {
    if (!location) {
      setErrorMessage(
        "Veuillez obtenir votre localisation avant de continuer."
      );
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/api/sport-session/search`,
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          sportIdGroup: [1, 2, 3],
          distanceFilter: 10,
        },
        {
          headers: {
            Authorization: `Bearer ${authState?.token}`,
          },
        }
      );

      if (response.data) {
        // Extraire les informations pertinentes
        const sessionData = response.data.map((session) => session.$attributes);
        setSessions(sessionData);
        console.log(sessionData[0]);
      } else {
        setErrorMessage("Erreur lors de la recherche des sessions de sport");
      }
    } catch (error) {
      setErrorMessage("Erreur lors de l'envoi des données");
      console.error(error);
    }
  };

  let displayText = "Waiting..";
  if (errorMsg) {
    displayText = errorMsg;
  } else if (location) {
    console.log(location);
  } else if (errorMessage) {
    displayText = errorMessage;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Sessions de sport proches de vous"
        accessibilityLabel="Sessions de sport"
        accessibilityHint="Liste des sessions de sport proches de vous"
      />
      <ScrollView contentContainerStyle={styles.grid}>
        {sessions.length > 0 ? (
          sessions.map((session, index) => {
            const sport = sportsData.find(
              (sport) => sport.id === session.sportId
            );
            return (
              <View key={index} style={styles.button}>
                {sport && (
                  <>
                    <Image source={sport.defaultIcon} style={styles.icon} />
                    <Text style={[styles.buttonText]}>{sport.name}</Text>
                  </>
                )}
                {/* <Text>{new Date(session.startDate).toLocaleString()}</Text>
                <Text>Location: {session.location}</Text> */}
                <Text>Participants: {session.maxParticipants}</Text>
              </View>
            );
          })
        ) : (
          <Text>Aucune session trouvée.</Text>
        )}
      </ScrollView>
      <CustomButton
        text="Recherche de sessions"
        onPress={sendLocationToBackend}
        accessibilityLabel="Recherche session de sport"
        accessibilityHint="Cliquez ici pour rechercher les sessions de sport proches de vous."
        backgroundColor="#FF5C00"
        borderColor="#FF5C00"
        textColor="#FFFFFF"
        width={250}
        style={{ marginBottom: 20 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 50,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  button: {
    width: 150,
    height: 150,
    padding: 10,
    margin: 7,
    borderWidth: 1,
    borderColor: "gray",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: 16,
    fontFamily: "LucioleRegular",
    fontWeight: "800",
    marginTop: 10,
  },
  icon: {
    width: 70,
    height: 70,
    marginBottom: 5,
    resizeMode: "contain",
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
});

export default LocationHandlerScreen;
