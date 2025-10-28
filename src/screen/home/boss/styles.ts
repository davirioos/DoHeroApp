// src/screen/home/boss/styles.ts
import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    justifyContent: "center",
    alignItems: "center",
    padding: moderateScale(15),
    marginBottom: verticalScale(15),
    paddingBottom: verticalScale(80),
  },
  containerHeader: {
    alignItems: "center",
    marginBottom: verticalScale(10),
  },
  tituloText: {
    color: "#333",
    fontSize: RFValue(24),
    fontWeight: "bold",
  },
  containerProgress: {
    alignItems: "center",
    marginBottom: verticalScale(40),
    backgroundColor: "#fff",
    padding: moderateScale(20),
    borderRadius: moderateScale(15),
    width: "95%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  subText: {
    color: "#888",
    marginBottom: verticalScale(10),
    fontSize: RFValue(16),
  },
  image: {
    width: scale(200),
    height: verticalScale(200),
    marginBottom: verticalScale(30),
  },
  rewardsContainer: {
    width: "95%",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: moderateScale(20),
    borderRadius: moderateScale(15),
    marginBottom: verticalScale(25),
  },
  rewardsTitle: {
    fontSize: RFValue(18),
    fontWeight: "bold",
    color: "#333",
    marginBottom: verticalScale(15),
  },
  rewardsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  rewardItem: {
    alignItems: "center",
  },
  rewardText: {
    fontSize: RFValue(14),
    color: "gray",
    marginTop: verticalScale(5),
    fontWeight: "600",
  },
});
