// src/screen/home/ranking/styles.ts
import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: scale(20),
    marginTop: verticalScale(20),
  },
  glassCard: {
    width: "47%",
    height: verticalScale(140),
    borderRadius: moderateScale(20),
    padding: moderateScale(15),
    alignItems: "center",
    justifyContent: "space-around",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  cardTitle: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: RFValue(14),
    fontWeight: "600",
  },
  cardIcon: {
    width: scale(60),
    height: verticalScale(60),
  },
  cardRankName: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: RFValue(14),
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  successRate: {
    color: "#fff",
    fontSize: RFValue(36),
    fontWeight: "bold",
  },
  xpContainer: {
    width: "90%",
    marginTop: verticalScale(40),
    alignItems: "center",
  },
  xpText: {
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: verticalScale(10),
    fontSize: RFValue(14),
    fontWeight: "500",
  },
  mainIcon: {
    width: scale(220),
    height: verticalScale(220),
    marginTop: verticalScale(10),
  },
  // <<< --- ESTILO RE-ADICIONADO --- >>>
  rankTitle: {
    color: "#fff",
    fontSize: RFValue(28),
    marginTop: verticalScale(15),
    textTransform: "capitalize",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    // <<< --- ALTERAÇÃO AQUI --- >>>
    fontFamily: "Cinzel_700Bold", // Aplica a nova fonte
  },
});
