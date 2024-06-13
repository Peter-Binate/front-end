// src/screens/Channel/ChannelList.tsx
import { SafeAreaView } from "react-native";
import { ChannelList } from "stream-chat-expo";
import { useAuth } from "@/context/AuthContext";
import { useAppContext } from "@/context/ChatContext";
import { useNavigation } from "@react-navigation/native";
import styles from "../../styles";

const ChannelListScreen = () => {
  const { authState } = useAuth();
  const { setChannel } = useAppContext();
  const navigation = useNavigation();

  const filters = {
    members: {
      $in: [authState?.user?.id.toString()],
    },
  };

  const sort = {
    last_message_at: -1,
  };

  return (
    <ChannelList
      filters={filters}
      sort={sort}
      onSelect={(channel) => {
        setChannel(channel);
        navigation.navigate("Discussion");
      }}
    />
  );
};

export default ChannelListScreen;
