import React from "react";
import { Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppProvider } from "@/context/ChatContext";
import ChannelListScreen from "../Channel/ChannelList";
import ChannelScreen from "../Channel/Channel";
import { useChatClient } from "../../Hooks/useChatClient";
import { Chat, OverlayProvider } from "stream-chat-expo";
import { StreamChat } from "stream-chat";

const Stack = createNativeStackNavigator();

const ChannelStack = () => {
  const { clientIsReady } = useChatClient();

  const chatClient = StreamChat.getInstance("jtfcmym6qund");
  if (!clientIsReady) {
    return <Text>Loading chat ...</Text>;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <OverlayProvider>
          <Chat client={chatClient}>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen
                name="Conversations"
                component={ChannelListScreen}
              />
              <Stack.Screen name="DiscussionPage" component={ChannelScreen} />
            </Stack.Navigator>
          </Chat>
        </OverlayProvider>
      </AppProvider>
    </GestureHandlerRootView>
  );
};

export default ChannelStack;
