import React from "react";
import { Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChannelScreen from "../Channel/Channel";
import { useChatClient } from "../../Hooks/useChatClient";
import { OverlayProvider } from "stream-chat-expo";

const Stack = createNativeStackNavigator();

const ChannelStack = () => {
  const { clientIsReady } = useChatClient();

  if (!clientIsReady) {
    return <Text>Loading chat ...</Text>;
  }

  return (
    <OverlayProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Discussion" component={ChannelScreen} />
      </Stack.Navigator>
    </OverlayProvider>
  );
};

export default ChannelStack;
