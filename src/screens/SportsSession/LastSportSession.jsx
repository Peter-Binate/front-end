import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
import sportIcons from "./sportsIcons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

const LastSportSessionScreen = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigation = useNavigation();
  const { authState } = useAuth();

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

  return (
    <View style={styles.container}>
      {sportIcon && <Text style={{ fontSize: 30 }}>{sportIcon}</Text>}
      <Text style={styles.title}>{session.sport.sportName}</Text>
      <Text>Nombre de participants: {session.members.length}</Text>
      <Text>
        Description:{" "}
        {session.description || "Pas de description pour l'instant."}
      </Text>
      <Text>Localisation: {session.location}</Text>
      <Text>Date: {new Date(session.startDate).toLocaleDateString()}</Text>
      <Text>Heure: {new Date(session.startDate).toLocaleTimeString()}</Text>
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
});

export default LastSportSessionScreen;
