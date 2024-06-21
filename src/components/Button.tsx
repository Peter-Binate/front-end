// CustomButton.tsx
import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";

interface CustomButtonProps extends TouchableOpacityProps {
  text: string;
  accessibilityHint: string;
  borderColor?: string;
  backgroundColor?: string;
  width?: number;
  textColor?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  accessibilityLabel,
  accessibilityHint,
  onPress,
  disabled,
  borderColor,
  backgroundColor,
  width,
  textColor,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { borderColor, backgroundColor, width },
        disabled && styles.disabledButton,
        style,
      ]}
      accessible={true}
      onPress={onPress}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
    >
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    height: 55,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "LucioleRegular",
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default CustomButton;
