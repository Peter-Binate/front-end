// Header.tsx
import React from "react";
import { Text, View, StyleSheet } from "react-native";

interface HeaderProps {
  title: string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <View style={styles.headerContainer}>
      <Text
        style={styles.headerText}
        accessibilityRole="header"
        accessible={true}
      >
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#ffffff", // Modify as needed
  },
  headerText: {
    fontSize: 24,
    fontWeight: "800",
    fontFamily: "LucioleBold",
    color: "#0f0edd",
  },
});

export default Header;
