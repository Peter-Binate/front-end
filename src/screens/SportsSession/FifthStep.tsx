import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
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
import Header from "@/components/Header/Header";
import CustomButton from "@/components/Button";

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
    <SafeAreaView style={styles.container}>
      <Header
        title="Quand ?"
        accessibilityLabel="Date de la session de sport"
        accessibilityHint="Choisissez quand aura lieu votre session de  "
      />
      <View style={styles.form}>
        <Text>Choisissez la date de la session (YYYY-MM-DD)</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text style={styles.input}>
            Le {DateTime.fromJSDate(date).toFormat("yyyy-MM-dd")}
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
        <Text>Choisissez l'heure de la session(HH:MM)</Text>
        <TouchableOpacity onPress={() => setShowTimePicker(true)}>
          <Text style={styles.input}>
            à {DateTime.fromJSDate(date).toFormat("HH:mm")}
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
        <View style={styles.buttonView}>
          <CustomButton
            text="Suivant"
            onPress={handleSubmit}
            disabled={!date}
            accessibilityLabel="Bouton Suivant"
            accessibilityHint="Cliquez ici pour accéder à l'étape suivante du formulaire d'inscription"
            backgroundColor="#FFFFFF"
            borderColor="#FF5C00"
            textColor="#FF5C00"
            width={250}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF",
    marginTop: 100,
  },
  form: {
    width: "100%",
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 15,
    fontSize: 28,
    fontFamily: "LucioleRegular",
    fontWeight: "900",
    textAlign: "center",
    borderRadius: 20,
    marginBottom: 10,
    height: 200,
    paddingTop: 70,
    textTransform: "capitalize",
  },
  buttonView: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

export default FifthStepScreen;
