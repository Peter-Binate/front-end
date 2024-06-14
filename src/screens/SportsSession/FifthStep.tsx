import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import {
  resetSportSessionData,
  setSportSessionData,
} from "@/Redux/Slices/sportSessionSlice";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

const FifthStepScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { authState } = useAuth();
  const userData = useAppSelector(
    (state) => state.sportSession.sportSessionData
  );

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");

  const formatDateTime = (date: string, time: string) => {
    return `${date} ${time}`;
  };

  const handleSubmit = async () => {
    const apiUrl = `${process.env.EXPO_PUBLIC_API_URL}/api/sport-session/create`;
    const formattedDateTime = formatDateTime(date, time);
    const dataToSend = {
      ...userData,
      startDate: formattedDateTime,
    };

    console.log("Data to send:", dataToSend);

    try {
      const response = await axios.post(apiUrl, dataToSend, {
        headers: { Authorization: `Bearer ${authState?.token}` },
      });

      console.log("Response status:", response.status);

      dispatch(resetSportSessionData());
      navigation.navigate("Home");
    } catch (error: any) {
      console.log("Entering catch block"); // Log when entering the catch block
      console.log("Data to send:", dataToSend);

      console.error("Error creating sport session:", error);

      setError("Une erreur s'est produite lors de la création de la session.");

      // Log detailed error information
      if (error.response) {
        console.log(
          "Error response data:",
          JSON.stringify(error.response.data, null, 2)
        );
        console.log("Error response status:", error.response.status);
        console.log(
          "Error response headers:",
          JSON.stringify(error.response.headers, null, 2)
        );
      } else if (error.request) {
        console.log("Error request:", JSON.stringify(error.request, null, 2));
      } else {
        console.log("Error message:", error.message);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 100 }}>
      <View>
        <Text>Choose Date (YYYY-MM-DD)</Text>
        <TextInput
          value={date}
          onChangeText={setDate}
          placeholder="YYYY-MM-DD"
          style={{
            borderColor: "gray",
            borderWidth: 1,
            padding: 10,
            borderRadius: 5,
            marginVertical: 10,
          }}
        />
        <Text>Choose Time (HH:MM)</Text>
        <TextInput
          value={time}
          onChangeText={setTime}
          placeholder="HH:MM"
          style={{
            borderColor: "gray",
            borderWidth: 1,
            padding: 10,
            borderRadius: 5,
            marginVertical: 10,
          }}
        />
        {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            backgroundColor: "blue",
            padding: 10,
            borderRadius: 5,
            marginTop: 20,
          }}
        >
          <Text style={{ color: "white" }}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default FifthStepScreen;
