import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { scale, verticalScale } from "react-native-size-matters";

type prop = {
  title: string;
  onPress: () => void;
};

export default function ButtonMain({ title, onPress }: prop) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      testID="loginButton"
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2ECC71",
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(80),
    borderRadius: 8,
  },
  text: {
    color: "#fff",
    fontSize: RFValue(16),
    fontWeight: "600",
  },
});
