import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Image } from "react-native";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

const UserProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { authState } = useAuth();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const apiUrl = `${process.env.EXPO_PUBLIC_API_URL}/api/auth/profile`;
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${authState?.token}`,
          },
        });
        setUser(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        setError(
          "Erreur lors de la récupération des informations de l’utilisateur."
        );
        setLoading(false);
        console.error(err);
      }
    };

    fetchUserProfile();
  }, []);

  // Chargement en cours
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Gestion d'erreurs
  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  // Aucun utilisateur trouvé
  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Aucune information utilisateur trouvée.</Text>
      </View>
    );
  }

  // Affichage des informations de l'utilisateur
  return (
    <View style={styles.container}>
      {user.profilImage && (
        <Image source={{ uri: user.profilImage }} style={styles.profileImage} />
      )}
      <Text style={styles.name}>
        {user.firstname} {user.lastname}
      </Text>
      <Text>Email: {user.email}</Text>
      <Text>{user.phoneNumber}</Text>
      <Text>{user.location}</Text>
      <Text>{user.biography}</Text>
      {/* Autres informations de l'utilisateur */}
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
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
});

export default UserProfileScreen;
