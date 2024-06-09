import { setRegisterUserData } from "@/Redux/Slices/registerSlice";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import React from "react";
//import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { SafeAreaView, View, Text } from "react-native";

//const Tab = createMaterialTopTabNavigator()

const FriendScreen = () => {
  // On renvoie la data dans notre store
  const dispatch = useAppDispatch();
  dispatch(setRegisterUserData({ firstname: "Peter", lastname: "Zigouin" }));

  // On récupère la donnée de notre slice
  const data = useAppSelector((state) => state.registerSlice.registerUserData);

  // envoie les données à la base de données avec axios.post
  console.log(data);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="m-5">
        <Text className="text-2xl font-bold border-2 border-red-300">
          Friends Screen
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default FriendScreen;
