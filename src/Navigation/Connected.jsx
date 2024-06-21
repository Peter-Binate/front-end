import React from "react";
import { StyleSheet, Image, View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Importation des stacks
import HomeStack from "@/screens/Stacks/HomeStack";
import ChannelStack from "@/screens/Stacks/ChannelStack";
import FriendStack from "@/screens/Stacks/FriendStack";
import UserStack from "@/screens/Stacks/UserStack";

const Tab = createBottomTabNavigator();

const tabIcons = {
  Accueil: {
    default: require("./../assets/images/navbar/home.png"),
    focused: require("./../assets/images/navbar/home-focus.png"),
  },
  Amis: {
    default: require("./../assets/images/navbar/friends.png"),
    focused: require("./../assets/images/navbar/friends-focus.png"),
  },
  Discussion: {
    default: require("./../assets/images/navbar/chat.png"),
    focused: require("./../assets/images/navbar/chat-focus.png"),
  },
  User: {
    default: require("./../assets/images/navbar/profil.png"),
    focused: require("./../assets/images/navbar/profil-focus.png"),
  },
};

export default function Connected() {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            const icon = tabIcons[route.name][focused ? "focused" : "default"];
            return (
              <View style={[styles.iconLabelContainer]}>
                <Image source={icon} style={styles.icon} />
              </View>
            );
          },
          tabBarActiveTintColor: "#0f0edd",
          tabBarInactiveTintColor: "#888",
          headerShown: false,
          tabBarLabel: () => null,
          tabBarStyle: {
            display: "flex",
            height: 70,
            backgroundColor: "#0f0edd",
          },
        })}
      >
        <Tab.Screen
          name="Accueil"
          component={HomeStack}
          options={{
            accessibilityLabel: "Accueil, onglet",
          }}
        />
        <Tab.Screen
          name="Amis"
          component={FriendStack}
          options={{
            accessibilityLabel: "Amis, onglet",
          }}
        />
        <Tab.Screen
          name="Discussion"
          component={ChannelStack}
          options={{
            accessibilityLabel: "Discussion, onglet",
          }}
        />
        <Tab.Screen
          name="User"
          component={UserStack}
          options={{
            accessibilityLabel: "User, onglet",
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  iconLabelContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 50,
    width: 55,
    height: 55,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
});
