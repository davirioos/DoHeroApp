import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { moderateScale, verticalScale } from "react-native-size-matters";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
    padding: moderateScale(20),
  },
  title: {
    fontSize: RFValue(24),
    fontWeight: "bold",
    color: "#333",
    marginBottom: verticalScale(30),
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: RFValue(18),
    fontWeight: "600",
    color: "#444",
    marginBottom: verticalScale(10),
    alignSelf: "flex-start",
  },
  sectionContainer: {
    width: "100%",
    marginBottom: verticalScale(20),
  },
  languageButton: {
    backgroundColor: "#fff",
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(10),
    borderWidth: 2,
    borderColor: "#ddd",
  },
  languageButtonSelected: {
    borderColor: "#2ECC71",
    backgroundColor: "#e8f8ee",
  },
  languageButtonText: {
    fontSize: RFValue(16),
    textAlign: "center",
    color: "#333",
  },
  themeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
    width: "100%",
    borderWidth: 2,
    borderColor: "#ddd",
  },
  themeText: {
    fontSize: RFValue(16),
    color: "#333",
  },
  accountButton: {
    backgroundColor: "#fff",
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
    marginTop: verticalScale(10),
    borderWidth: 2,
    borderColor: "#ddd",
  },
  accountButtonText: {
    fontSize: RFValue(16),
    color: "#333",
    textAlign: "center",
    fontWeight: "600",
  },
  deleteButton: {
    borderColor: "#E74C3C",
    backgroundColor: "#FADBD8",
  },
  deleteButtonText: {
    color: "#C0392B",
  },
});
