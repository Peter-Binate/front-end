import React, { useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { resetSportSessionData } from "@/Redux/Slices/sportSessionSlice";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

const FifthStepScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { authState } = useAuth();
  const userData = useAppSelector(
    (state) => state.sportSession.sportSessionData
  );

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [error, setError] = useState("");

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowTimePicker(false);
    setDate(currentDate);
  };

  const validateData = (data) => {
    const { sportId, maxParticipants, difficultyLevel, location } = data;
    if (!sportId) {
      setError("Validation error: sportId is missing.");
      return false;
    }
    if (!maxParticipants || isNaN(maxParticipants)) {
      setError("Validation error: maxParticipants is missing or incorrect.");
      return false;
    }
    if (!difficultyLevel) {
      setError("Validation error: difficultyLevel is missing.");
      return false;
    }
    if (!location) {
      setError("Validation error: location is missing.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    const apiUrlSport =
      "http://http://192.168.1.122:3333/api/sport-session/create";

    const dataToSend = {
      ...userData,
      startDate: date.toISOString(), // Ensure the date is correctly formatted
    };

    if (!validateData(dataToSend)) {
      return;
    }

    console.log("User data:", userData);
    console.log("Data to send:", dataToSend);

    // if (!validateData(dataToSend)) {
    //   console.error(
    //     "Validation error: some fields are missing or incorrect: ",
    //     error
    //   );
    //   return;
    // }

    console.log("Data to send (validated):", dataToSend);
    console.log("API URL:", apiUrlSport);
    console.log("authState.token:", authState.token);

    try {
      const response = await axios.post(apiUrlSport, dataToSend, {
        headers: { Authorization: `Bearer ${authState.token}` },
      });
      if (response.status === 201) {
        dispatch(resetSportSessionData());
        navigation.navigate("HomeScreen");
      }
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la création de la session:",
        error
      );
      setError("Une erreur s'est produite lors de la création de la session.");
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 100 }}>
      <View>
        <Text>Choose Date</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text
            style={{
              backgroundColor: "blue",
              color: "white",
              padding: 10,
              borderRadius: 5,
            }}
          >
            {date.toDateString()}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
        <Text>Choose Time</Text>
        <TouchableOpacity onPress={() => setShowTimePicker(true)}>
          <Text
            style={{
              backgroundColor: "blue",
              color: "white",
              padding: 10,
              borderRadius: 5,
            }}
          >
            {date.toLocaleTimeString()}
          </Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={date}
            mode="time"
            display="default"
            onChange={handleTimeChange}
          />
        )}
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
