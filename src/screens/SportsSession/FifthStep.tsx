import React, { useState, useEffect } from "react";
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
import { DateTime } from "luxon";

const FifthStepScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { authState } = useAuth();
  const { sportSessionData, isEditing } = useAppSelector(
    (state) => state.sportSession
  );

  const initialDate = sportSessionData.startDate
    ? new Date(sportSessionData.startDate)
    : DateTime.now().plus({ hours: 1 }).toJSDate();
  const [date, setDate] = useState(initialDate);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [error, setError] = useState("");

  const formatDateTime = (date) =>
    DateTime.fromJSDate(date).toFormat("yyyy-MM-dd HH:mm:ss");

  useEffect(() => {
    if (sportSessionData.startDate) {
      setDate(new Date(sportSessionData.startDate));
    }
  }, [sportSessionData.startDate]);

  const handleDateChange = (event: any, selectedDate: any) => {
    setDate(selectedDate || date);
    setShowDatePicker(false);
  };

  const handleTimeChange = (event: any, selectedTime: any) => {
    setDate(selectedTime || date);
    setShowTimePicker(false);
  };

  const handleSubmit = async () => {
    const apiUrl = `${process.env.EXPO_PUBLIC_API_URL}/api/sport-session/${
      isEditing ? "update" : "create"
    }`;
    const formattedDateTime = formatDateTime(date);
    const dataToSend = {
      ...sportSessionData,
      startDate: formattedDateTime,
      sessionId: sportSessionData.id, // Include session ID only if editing
    };

    try {
      const method = isEditing ? "put" : "post";
      const response = await axios({
        method,
        url: apiUrl,
        data: dataToSend,
        headers: { Authorization: `Bearer ${authState?.token}` },
      });

      dispatch(resetSportSessionData());
      navigation.navigate("LastSportSessionPage");
    } catch (error: any) {
      console.error("Error submitting sport session:", error);
      console.log(apiUrl);

      setError(error.response?.data.message || "An error occurred");
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
