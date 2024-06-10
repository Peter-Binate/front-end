// src/screens/ChannelListScreen.tsx
import React from "react";
import { useChatClient } from "../../Hooks/useChatClient";
import { StyleSheet, Text, View } from "react-native";
import { OverlayProvider } from "stream-chat-expo";

const ChannelScreen = () => {
  const { clientIsReady } = useChatClient();

  if (!clientIsReady) {
    return <Text>Loading chat ...</Text>;
  }
  return (
    <View>
      <Text>ChannelScreen</Text>
    </View>
  );
};

export default ChannelScreen;

const styles = StyleSheet.create({});
// import { ChannelList } from 'stream-chat-react-native';
// import { useNavigation } from '@react-navigation/native';
// import { useAppContext } from '../context/AppContext';
// import { useChat } from '../context/ChatContext';

// const filters = {
//   members: { '$in': [chatUserId] },
// };

// const sort = { last_message_at: -1 };

// const ChannelListScreen = () => {
//   const { setChannel } = useAppContext();
//   const navigation = useNavigation();
//   const { chatClient } = useChat();

//   if (!chatClient) {
//     return <Text>Loading chat client...</Text>;
//   }

//   return (
//     <ChannelList
//       filters={filters}
//       sort={sort}
//       onSelect={(channel) => {
//         setChannel(channel);
//         navigation.navigate('ChannelScreen');
//       }}
//     />
//   );
// };

// export default ChannelListScreen;
