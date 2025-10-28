// src/screen/register/styles.ts
import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    gap: moderateScale(10),
  },
  content: {
    alignItems: "center",
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(40),
  },
  linkText: {
    color: "#5EA6FF",
    fontSize: RFValue(14),
  },
});
