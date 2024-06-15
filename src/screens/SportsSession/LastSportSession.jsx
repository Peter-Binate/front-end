import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Button,
  Image,
  Alert,
} from "react-native";
import sportIcons from "./sportsIcons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@/context/AuthContext";
import { useDispatch } from "react-redux";
import {
  resetSportSessionData,
  setSportSessionData,
  setIsEditing,
} from "@/Redux/Slices/sportSessionSlice";
import axios from "axios";

const LastSportSessionScreen = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  const [location, setLocation] = useState(session ? session.location : "");
  const [date, setDate] = useState(
    session ? new Date(session.startDate).toLocaleDateString() : ""
  );
  const [time, setTime] = useState(
    session ? new Date(session.startDate).toLocaleTimeString() : ""
  );

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
  }, []);

  const handleEditSession = () => {
    dispatch(setSportSessionData(session)); // Charger les données de la session dans Redux
    dispatch(setIsEditing(true)); // Définir le mode édition à vrai
    navigation.navigate("FirstStepSportSessionPage"); // Naviguer vers la première étape du formulaire
  };

  const handleDeleteSession = async () => {
    const apiUrl = `${process.env.EXPO_PUBLIC_API_URL}/api/sport-session/delete/`;
    try {
      await axios.delete(apiUrl, {
        data: {
          sessionId: session.id,
        },
        headers: {
          Authorization: `Bearer ${authState?.token}`,
        },
      });
      Alert.alert(
        "Session supprimée",
        "La session de sport a été supprimée avec succès.",
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
  const sportIcon = sportIcons.find(
    (icon) => icon.id === session.sport.id
  )?.icon;

  // Trouver l'administrateur de la session
  const admin = session.members.find(
    (member) => member.isAdmin && member.isAccepted
  );

  return (
    <View style={styles.container}>
      <View>
        {admin && (
          <>
            {admin.user.profilImage && (
              <Image
                source={{ uri: admin.user.profilImage }}
                style={{ width: 50, height: 50 }}
              />
            )}
          </>
        )}
        <Text>{admin.user.firstname}</Text>
        <Text>{admin.user.lastname}</Text>
      </View>
      {sportIcon && <Text style={{ fontSize: 30 }}>{sportIcon}</Text>}

      <Text style={styles.title}>{session.sport.sportName}</Text>
      <Text>Date: {new Date(session.startDate).toLocaleDateString()}</Text>
      <View>
        <Text>Heure: {new Date(session.startDate).toLocaleTimeString()}</Text>
        <Text>Localisation: {session.location}</Text>
      </View>
      <View>
        <Text>
          Nombre de participants: {session.members.length} /{" "}
          {session.maxParticipants}
        </Text>
      </View>
      <View>
        <Text>
          {session.description || "Pas de description pour l'instant."}
        </Text>
      </View>
      <View>
        <Button title="Modifier" onPress={handleEditSession} />
        <Button title="Supprimer" onPress={handleDeleteSession} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 200,
  },
});

export default LastSportSessionScreen;
