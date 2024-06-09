import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Importation des stacks
import HomeStack from "@/screens/Stacks/HomeStack";
import FriendStack from "@/screens/Stacks/FriendStack";

export default function Connected() {
  const Tab = createBottomTabNavigator();

  // Fonction pour déterminer l'icone en fonction de la route
  const getTabBarIcon = (focused, route) => {
    switch (route.name) {
      case "Accueil":
        return focused ? "home" : "home-outline";
      case "Amis":
        return focused ? "person" : "person-outline";
      case "Profil":
        return focused ? "person-circle" : "person-circle-outline";
      case "Message":
        return focused ? "chatbubble" : "chatbubble-outline";
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={getTabBarIcon(focused, route)}
              size={size}
              color={color}
            />
          ),
          tabBarActiveTintColor: "#ff0000", // Utilisation d'une couleur hexadécimale directement
          tabBarInactiveTintColor: "#888",
          headerShown: false,
          tabBarLabelStyle: {
            paddingBottom: 10,
            fontSize: 10,
            marginTop: -5,
          },
          tabBarStyle: [
            {
              display: "flex",
              height: 70,
            },
            null,
          ],
        })}
      >
        <Tab.Screen name="Accueil" component={HomeStack} />
        <Tab.Screen name="Amis" component={FriendStack} />
        {/* <Tab.Screen name="Profil" component={ProfilStack} /> */}
        {/* <Tab.Screen name="Message" component={MessageStack} /> */}
      </Tab.Navigator>
    </View>
  );
}
