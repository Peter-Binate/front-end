// src/components/Logo.js
import React from "react";
import { View } from "react-native";
import SvgUri from "react-native-svg";

const Logo = () => {
  return (
    <View>
      <SvgUri
        width="100%"
        height="100%"
        uri={require("../../assets/images/logo.svg")}
      />
    </View>
  );
};

export default Logo;
