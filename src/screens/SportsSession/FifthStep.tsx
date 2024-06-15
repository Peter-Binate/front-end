import React, { useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import {
  resetSportSessionData,
  setSportSessionData,
} from "@/Redux/Slices/sportSessionSlice";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
// Permet de formater les dates
import { DateTime } from "luxon";
import * as Yup from "yup";

const FifthStepScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { authState } = useAuth();
  const userData = useAppSelector(
    (state) => state.sportSession.sportSessionData
  );

  const initialDate = DateTime.now().plus({ hours: 1 }).toJSDate();
  const [date, setDate] = useState(initialDate);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [error, setError] = useState("");

  const formatDateTime = (date: Date) => {
    return DateTime.fromJSDate(date).toFormat("yyyy-MM-dd HH:mm:ss");
  };

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleTimeChange = (
    event: DateTimePickerEvent,
    selectedTime?: Date
  ) => {
    const currentTime = selectedTime || date;
    setShowTimePicker(false);
    setDate(currentTime);
  };

  // Validation de la date
  const validationSchema = Yup.object().shape({
    startDate: Yup.string().required("Date and time are required"),
  });
  const handleSubmit = async () => {
    const apiUrl = `${process.env.EXPO_PUBLIC_API_URL}/api/sport-session/create`;
    const formattedDateTime = formatDateTime(date);
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
      navigation.navigate("LastSportSessionPage");
    } catch (error: any) {
      console.log("Entering catch block"); // Log when entering the catch block
      console.log("Data to send:", dataToSend);

      console.error("Error creating sport session:", error);
      const messageError = error.response?.data.message || "An error occurred";
      setError(messageError);

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
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text
            style={{
              borderColor: "gray",
              borderWidth: 1,
              padding: 10,
              borderRadius: 5,
              marginVertical: 10,
            }}
          >
            {DateTime.fromJSDate(date).toFormat("yyyy-MM-dd")}
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
        <Text>Choose Time (HH:MM)</Text>
        <TouchableOpacity onPress={() => setShowTimePicker(true)}>
          <Text
            style={{
              borderColor: "gray",
              borderWidth: 1,
              padding: 10,
              borderRadius: 5,
              marginVertical: 10,
            }}
          >
            {DateTime.fromJSDate(date).toFormat("HH:mm")}
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
          disabled={!date}
          style={{
            backgroundColor: !date ? "gray" : "blue",
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
