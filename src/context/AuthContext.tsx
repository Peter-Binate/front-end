// Importation des hooks React nécessaires à la création du contexte et à la gestion de l'état et des effets.
import { createContext, useContext, useEffect, useState } from "react";

// Importation de la bibliothèque axios pour effectuer des requêtes HTTP.
import axios from "axios";

// Importation de SecureStore d'Expo pour stocker les données de manière sécurisée.
import * as SecureStore from "expo-secure-store";

// Déclaration de l'interface pour les propriétés du contexte d'authentification.
interface AuthProps {
  authState?: {
    token: string | null;
    authenticated: boolean | null;
    streamToken?: string | null;
    user?: {
      id: string;
      lastname: string;
      profilImage?: string;
    } | null;
  };
  // Déclaration de la fonction pour l'enregistrement des utilisateurs.
  onRegister?: (email: string, password: string) => Promise<any>;
  // Déclaration de la fonction pour la connexion des utilisateurs.
  onLogin?: (email: string, password: string) => Promise<any>;
  // Déclaration de la fonction pour la déconnexion des utilisateurs.
  onLogout?: () => Promise<any>;
}

// Déclaration d'une constante pour la clé utilisée pour stocker le token JWT.
const userTokenKey = process.env.EXPO_PUBLIC_TOKEN_KEY;

const streamTokenKey = process.env.EXPO_PUBLIC_STREAM_TOKEN_KEY;

// Déclaration d'une constante pour l'URL de base de l'API.
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

// Création d'un contexte d'authentification avec une valeur par défaut vide.
const AuthContext = createContext<AuthProps>({});

// Exportation d'un hook personnalisé pour utiliser le contexte d'authentification dans les composants.
export const useAuth = () => {
  return useContext(AuthContext);
};

// Création du fournisseur de contexte d'authentification.
export const AuthProvider = ({ children }: any) => {
  // Déclaration de l'état authState avec token et authenticated, initialisés à null.
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
    streamToken?: string | null; // Ajout d'une propriété pour le token de stream
    user?: {
      id: string;
      lastname: string;
      profilImage?: string;
    } | null;
  }>({
    token: null,
    authenticated: null,
    streamToken: null,
    user: null,
  });

  // Utilisation du hook useEffect pour exécuter du code au montage du composant.
  useEffect(() => {
    // Déclaration d'une fonction asynchrone pour charger le token depuis SecureStore.
    const loadToken = async () => {
      // Récupération du token user et du token stream stockés et affichage dans la console.
      const token =
        userTokenKey && (await SecureStore.getItemAsync(userTokenKey));
      const streamToken =
        streamTokenKey && (await SecureStore.getItemAsync(streamTokenKey));

      console.log(`
        userToken stored:, ${token}
        streamToken stored:, ${streamToken}
        .env:, ${apiUrl}
        `);

      // Si les token existent, il sont ajoutés aux en-têtes par défaut d'axios.
      if (token && streamToken) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      // Mise à jour de l'état authState avec le token et l'état d'authentification.
      setAuthState({
        token: token ? token : null,
        authenticated: !!token,
        streamToken: streamToken,
        user: authState.user, // Conserve l'utilisateur s'il est déjà défini
      });
    };
    // Appel de la fonction loadToken.
    loadToken();
    // Le tableau de dépendances vide signifie que ce code s'exécute uniquement au montage du composant.
  }, []);

  // Déclaration de la fonction asynchrone pour l'enregistrement des utilisateurs.
  const register = async (email: string, password: string) => {
    try {
      console.log("Attempting to register with email:", email);
      // Envoi d'une requête POST à l'API pour enregistrer l'utilisateur avec email et password.
      const response = await axios.post(`${apiUrl}/register`, {
        email,
        password,
      });
      // Retour des données de la réponse de l'API.
      console.log("Registration response:", response);
    } catch (e: any) {
      console.error("Registration error:", e.response.data);
      // Récupération des données d'erreur de la réponse de l'API.
      const errorResponse = e.response?.data;
      // Si aucune erreur spécifique n'est renvoyée, on utilise un message d'erreur par défaut.
      const errors = errorResponse || [{ message: "Echec de l'inscription" }];
      // Affichage d'une alerte avec les messages d'erreur concaténés.
      alert(errors.map((err: any) => err.message).join("\n"));
      // Retour d'un objet contenant les erreurs.
      return {
        error: true,
        msg: errors,
      };
    }
  };

  // Déclaration de la fonction asynchrone pour la connexion des utilisateurs.
  const login = async (email: string, password: string) => {
    // Affichage d'une alerte si email ou password sont manquants.
    if (!email || !password) {
      alert("L'email et le mot de passe sont obligatoires.");
      // Retour d'un objet d'erreur.
      return {
        error: true,
        msg: "L'email et le mot de passe sont obligatoires.",
      };
    }
    try {
      // Envoi d'une requête POST à l'API pour connecter l'utilisateur avec email et password.
      const result = await axios.post(`${apiUrl}/login`, { email, password });
      // Extraction du token de la réponse de l'API et affichage dans la console.
      const token = result.data.token.token;
      const streamToken = result.data.streamToken;
      const user = {
        id: result.data.id,
        lastname: result.data.lastname,
        profilImage: result.data.profilImage,
      }; // Extraire les champs de l'utilisateur depuis la réponse
      console.log(
        " ~ file: Authcontext.tsx:71 ~ login ~ result:",
        token,
        streamToken,
        user
      );

      // Mise à jour de l'état authState avec le token et l'état d'authentification.
      setAuthState({
        token: token,
        authenticated: true,
        streamToken: streamToken,
        user: user,
      });

      // Ajout du token aux en-têtes par défaut d'axios.
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Stockage des token dans SecureStore.
      userTokenKey && (await SecureStore.setItemAsync(userTokenKey, token));
      streamTokenKey &&
        (await SecureStore.setItemAsync(streamTokenKey, streamToken));

      // Retour des données de la réponse de l'API.
      return result;
    } catch (e: any) {
      // Récupération des données d'erreur de la réponse de l'API.
      const errorResponse = e.response?.data;
      // Si aucune erreur spécifique n'est renvoyée, on utilise un message d'erreur par défaut.
      const errors = errorResponse.errors || [
        { message: "Echec de connexion" },
      ];
      // Retour d'un objet contenant les erreurs.
      return {
        error: true,
        msg: errors,
      };
    }
  };

  // Déclaration de la fonction asynchrone pour la déconnexion des utilisateurs.
  const logout = async () => {
    // Suppression du token de SecureStore.
    userTokenKey && (await SecureStore.deleteItemAsync(userTokenKey));
    streamTokenKey && (await SecureStore.deleteItemAsync(streamTokenKey));

    // Réinitialisation des en-têtes par défaut d'axios.
    axios.defaults.headers.common["Authorization"] = "";
    // Mise à jour de l'état authState pour refléter la déconnexion.
    setAuthState({
      token: null,
      authenticated: false,
      streamToken: null,
      user: null,
    });
  };

  // Création d'un objet contenant les fonctions d'enregistrement, de connexion, de déconnexion et l'état d'authentification.
  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };

  // Retour du fournisseur de contexte d'authentification avec les enfants imbriqués.
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
