import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { setSportSessionData } from "@/Redux/Slices/sportSessionSlice";

const FourthStepScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const sportSessionData = useAppSelector(
    (state) => state.sportSession.sportSessionData
  );
  const [location, setLocation] = useState(sportSessionData.location || "");

  useEffect(() => {
    // Update local state if editing an existing session
    if (sportSessionData.location) {
      setLocation(sportSessionData.location);
    }
  }, [sportSessionData.location]);

  const handleNext = () => {
    if (location) {
      dispatch(setSportSessionData({ location }));
      navigation.navigate("FifthStepSportSessionPage");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 100 }}>
      <View>
        <Text>Location</Text>
        <TextInput
          value={location}
          onChangeText={setLocation}
          style={{
            borderColor: "gray",
            borderWidth: 1,
            padding: 10,
            borderRadius: 5,
            marginVertical: 10,
          }}
        />
        <TouchableOpacity
          onPress={handleNext}
          disabled={!location}
          style={{
            backgroundColor: location ? "blue" : "gray",
            padding: 10,
            borderRadius: 5,
            marginTop: 20,
          }}
        >
          <Text style={{ color: "white" }}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default FourthStepScreen;
