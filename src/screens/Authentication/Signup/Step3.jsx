import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { setRegisterUserData } from "@/Redux/Slices/registerSlice";
import { useNavigation } from "@react-navigation/native";

const Step3 = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.register.registerUserData);

  const [firstname, setFirstname] = useState(userData.firstname || "");
  const [lastname, setLastname] = useState(userData.lastname || "");
  const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber || "");
  const [location, setLocation] = useState(userData.location || "");
  const [birthDate, setBirthDate] = useState(userData.birthDate || "");
  const [biography, setBiography] = useState(userData.biography || "");

  const handleNext = () => {
    console.log("Step3: handleNext");
    dispatch(
      setRegisterUserData({
        firstname,
        lastname,
        phoneNumber,
        location,
        birthDate,
        biography,
      })
    );
    navigation.navigate("Step4");
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 100 }}>
      <View>
        <Text>First Name</Text>
        <TextInput value={firstname} onChangeText={setFirstname} />
        <Text>Last Name</Text>
        <TextInput value={lastname} onChangeText={setLastname} />
        <Text>Phone Number</Text>
        <TextInput value={phoneNumber} onChangeText={setPhoneNumber} />
        <Text>Location</Text>
        <TextInput value={location} onChangeText={setLocation} />
        <Text>Birth Date</Text>
        <TextInput value={birthDate} onChangeText={setBirthDate} />
        <Text>Biographie</Text>
        <TextInput value={biography} onChangeText={setBiography} />
        <TouchableOpacity onPress={handleNext}>
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Step3;
