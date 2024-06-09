// import { useChatClient } from "../../useChatClient";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  Chat,
  OverlayProvider,
  ChannelList,
  Channel,
  MessageList,
  MessageInput,
} from "stream-chat-expo";
import { chatUserId } from "../../chatConfig"; // Assurez-vous d'importer ceci

const Stack = createNativeStackNavigator();

const filters = {
  members: {
    $in: [chatUserId],
  },
};

// Permet de récupérer le dernier message
const sort = {
  last_message_at: -1,
};

const ChannelListScreen = (props) => {
  const { setChannel } = useAppContext();
  const { navigation } = props;

  return (
    <ChannelList
      onSelect={(channel) => {
        setChannel(channel);
        navigation.navigate("ChannelScreen");
      }}
      filters={filters}
      sort={sort}
    />
  );
};

const ChannelScreen = (props) => {
  const { channel } = useAppContext();

  return (
    <Channel channel={channel}>
      <MessageList />
      <MessageInput />
    </Channel>
  );
};

export default function ChatStack() {
  // const { chatClient, clientIsReady } = useChatClient();

  if (!clientIsReady) {
    return <Text>Loading chat ...</Text>;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <OverlayProvider>
        <Chat client={chatClient}>
          <Stack.Navigator>
            <Stack.Screen name="ChannelList" component={ChannelListScreen} />
            <Stack.Screen name="ChannelScreen" component={ChannelScreen} />
          </Stack.Navigator>
        </Chat>
      </OverlayProvider>
    </GestureHandlerRootView>
  );
}
