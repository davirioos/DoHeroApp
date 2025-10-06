import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { moderateScale, verticalScale } from "react-native-size-matters";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101010",
  },
  contentContainer: {
    padding: moderateScale(20),
  },
  backButton: {
    marginBottom: verticalScale(20),
  },
  backButtonText: {
    color: "#5EA6FF",
    fontSize: RFValue(16),
  },
  title: {
    fontSize: RFValue(24),
    fontWeight: "bold",
    color: "#fff",
    marginBottom: verticalScale(20),
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: RFValue(18),
    fontWeight: "bold",
    color: "#fff",
    marginTop: verticalScale(15),
    marginBottom: verticalScale(10),
  },
  paragraph: {
    fontSize: RFValue(14),
    color: "#ccc",
    lineHeight: RFValue(20),
  },
  lastUpdated: {
    fontSize: RFValue(12),
    color: "#888",
    marginTop: verticalScale(30),
    textAlign: "center",
  },
});
