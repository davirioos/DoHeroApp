// src/components/buttonMain/index.tsx
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { scale, verticalScale } from "react-native-size-matters";

type prop = {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
};

export default function ButtonMain({
  title,
  onPress,
  isLoading = false,
  disabled = false,
}: prop) {
  return (
    <TouchableOpacity
      style={[styles.button, (disabled || isLoading) && styles.buttonDisabled]}
      onPress={onPress}
      testID="loginButton"
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2ECC71",
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(80),
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    minHeight: verticalScale(45),
  },
  buttonDisabled: {
    backgroundColor: "#9E9E9E",
  },
  text: {
    color: "#fff",
    fontSize: RFValue(16),
    fontWeight: "600",
  },
});
