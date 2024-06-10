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
          // Décoder le token JWT pour vérifier l'ID utilisateur
          const decodedToken = jwtDecode(authState.streamToken);
          console.log("Decoded Token:", decodedToken);

          if (decodedToken.user_id !== authState.user.id) {
            throw new Error("User ID in JWT does not match authState.user.id");
          }

          console.log(
            "Connecting user to Stream Chat with the following details:",
            {
              id: authState.user.id,
              name: authState.user.lastname,
              image: authState.user.profilImage,
            }
          );

          // Connexion de l'utilisateur au client Chat en utilisant les informations d'authentification
          await chatClient.connectUser(
            {
              id: authState.user.id,
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
