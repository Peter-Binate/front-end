import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  ImageBackground,
  Alert,
  Button,
} from "react-native";
import sportsData from "./sportsIcons"; // Remplacez par le bon chemin d'importation de sportsData
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@/context/AuthContext";
import { useDispatch } from "react-redux";
import {
  resetSportSessionData,
  setSportSessionData,
  setIsEditing,
} from "@/Redux/Slices/sportSessionSlice";
import backgroundImage from "@/assets/images/background.png";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/Button";

const LastSportSessionScreen = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { authState } = useAuth();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchLastSession = async () => {
      const apiUrl = `${process.env.EXPO_PUBLIC_API_URL}/api/sport-session/last-sport-session`;
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${authState?.token}`,
          },
        });
        setSession(response.data);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors de la récupération de la dernière session.");
        setLoading(false);
        console.error(err);
      }
    };

    fetchLastSession();
  }, [authState]);

  const handleEditSession = () => {
    dispatch(setSportSessionData(session)); // Charger les données de la session dans Redux
    dispatch(setIsEditing(true)); // Définir le mode édition à vrai
    navigation.navigate("FirstStepSportSessionPage"); // Naviguer vers la première étape du formulaire
  };

  const handleDeleteSession = async () => {
    const apiUrl = `${process.env.EXPO_PUBLIC_API_URL}/api/sport-session/delete/`;
    try {
      await axios.delete(apiUrl, {
        data: { sessionId: session.id },
        headers: { Authorization: `Bearer ${authState?.token}` },
      });
      Alert.alert(
        "Session supprimée",
        "Cette session de sport a été supprimée avec succès.",
        [
          {
            text: "retourner à l'Accueil",
            onPress: () => navigation.navigate("Home"),
          },
        ]
      );
      dispatch(resetSportSessionData());
    } catch (err) {
      setError("Erreur lors de la suppression de la session.");
      console.error(err);
      Alert.alert("Erreur", "Impossible de supprimer la session.");
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!session) {
    return <Text>Aucune session trouvée.</Text>;
  }

  // Trouver l'icône en fonction du sportId
  const sportIcon = sportsData.find(
    (icon) => icon.id === session.sport.id
  )?.icon;

  // Trouver l'administrateur de la session
  const admin = session.members.find(
    (member) => member.isAdmin && member.isAccepted
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.contentContainer}>
          {admin && (
            <View style={styles.adminContainer}>
              {admin.user.profilImage && (
                <Image
                  source={{ uri: admin.user.profilImage }}
                  style={styles.adminImage}
                />
              )}
            </View>
          )}
          {sportIcon && <Image source={sportIcon} style={styles.sportIcon} />}
          <Text style={styles.dateTime}>
            Date: {new Date(session.startDate).toLocaleDateString()}
          </Text>
          <Text style={styles.dateTime}>
            Heure: {new Date(session.startDate).toLocaleTimeString()}
          </Text>
          <Text style={styles.location}>Localisation: {session.location}</Text>
          <View style={{ display: "flex", flexDirection: "column" }}>
            <Text style={styles.participants}>Nombre de participants:</Text>
            <Text style={styles.participants}>
              {session.members.length} / {session.maxParticipants}
            </Text>
          </View>
          <Text style={styles.description}>
            {session.description || "Pas de description pour l'instant."}
          </Text>
          <View style={styles.buttonContainer}>
            <CustomButton
              text="Modifier l'annonce"
              onPress={handleEditSession}
              accessibilityLabel="Bouton Suivant"
              accessibilityHint="Cliquez ici pour accéder à l'étape suivante du formulaire d'inscription"
              backgroundColor="#FFFFFF"
              borderColor="#FF5C00"
              textColor="#FF5C00"
              width={250}
            />
            <CustomButton
              text="Annuler l'annonce"
              onPress={handleDeleteSession}
              accessibilityLabel="Bouton Suivant"
              accessibilityHint="Cliquez ici pour accéder à l'étape suivante du formulaire d'inscription"
              backgroundColor="#FFFFFF"
              borderColor="#0f0edd"
              textColor="#0f0edd"
              width={250}
            />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    resizeMode: "cover",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 20, // Ajustez cette valeur pour contrôler le décalage
  },
  adminContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  adminImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  sportIcon: {
    width: 250,
    height: 250,
    marginTop: 50,
    marginBottom: 60,
    resizeMode: "contain",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "LucioleBold",
  },
  textBold: {
    fontSize: 16,
    fontFamily: "LucioleBold",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },
  dateTime: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
    fontFamily: "LucioleBold",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  location: {
    fontSize: 14,
    marginBottom: 10,
    fontFamily: "LucioleBold",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
    fontFamily: "LucioleRegular",
  },
  participants: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: "LucioleBold",
  },
});

export default LastSportSessionScreen;
