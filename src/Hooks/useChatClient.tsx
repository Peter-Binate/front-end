import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

// Création d'une instance de StreamChat avec un identifiant unique
const chatClient = StreamChat.getInstance("jtfcmym6qund");

// Définition du hook personnalisé useChatClient
export const useChatClient = () => {
  const [clientIsReady, setClientIsReady] = useState(false);
  const { authState } = useAuth();

  useEffect(() => {
    const setupClient = async () => {
      if (authState?.user && authState.streamToken) {
        try {
          console.log("Connection réussi!");

          // Connexion de l'utilisateur au client Chat en utilisant les informations d'authentification
          await chatClient.connectUser(
            {
              id: authState.user.id.toString(),
              name: authState.user.lastname,
              image: authState.user.profilImage,
            },
            authState.streamToken
          );
          setClientIsReady(true);
        } catch (error) {
          if (error instanceof Error) {
            console.error(
              `An error occurred while connecting the user: ${error.message}`
            );
            console.log(
              "Connecting user to Stream Chat with the following details:",
              {
                id: authState.user.id.toString(),
                name: authState.user.lastname,
                image: authState.user.profilImage,
              }
            );
          }
        }
      } else {
        console.error("authState is undefined or missing required properties");
      }
    };

    if (authState?.user && !chatClient.userID) {
      setupClient();
    }
  }, [authState]);

  return { clientIsReady };
};
