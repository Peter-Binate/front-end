// src/screens/Channel/Channel.tsx
import { Text } from "react-native";
import { Channel, MessageList, MessageInput } from "stream-chat-expo";
import { useAppContext } from "@/context/ChatContext";

const ChannelScreen = () => {
  const { channel } = useAppContext();

  // if (!channel) {
  //   return <Text>Loading channel...</Text>;
  // }

  return (
    <Channel channel={channel}>
      <MessageList />
      <MessageInput />
    </Channel>
  );
};

export default ChannelScreen;
