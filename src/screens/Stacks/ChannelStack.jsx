import React from "react";
import { Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <OverlayProvider>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Conversations" component={ChannelScreen} />
        </Stack.Navigator>
      </OverlayProvider>
    </GestureHandlerRootView>
  );
};

export default ChannelStack;
