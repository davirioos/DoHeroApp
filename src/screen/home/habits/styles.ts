import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
  },
  header: {
    padding: moderateScale(20),
    alignItems: "center",
  },
  title: {
    fontSize: RFValue(24),
    fontWeight: "bold",
    color: "#333",
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: moderateScale(20),
    marginHorizontal: scale(20),
    marginBottom: verticalScale(20),
  },
  toggleButton: {
    flex: 1,
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(20),
  },
  toggleButtonActive: {
    backgroundColor: "#101010",
  },
  toggleText: {
    textAlign: "center",
    fontWeight: "600",
    color: "#333",
  },
  toggleTextActive: {
    color: "#fff",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: scale(20),
    marginBottom: verticalScale(20),
  },
  statBox: {
    backgroundColor: "#fff",
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
    alignItems: "center",
    width: "48%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statValue: {
    fontSize: RFValue(20),
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: RFValue(14),
    color: "#888",
    marginTop: verticalScale(5),
    textAlign: "center",
  },
  habitList: {
    paddingHorizontal: scale(20),
    paddingBottom: verticalScale(150),
    flexGrow: 1,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: moderateScale(20),
  },
  emptyStateText: {
    fontSize: RFValue(18),
    fontWeight: "bold",
    color: "#555",
  },
  emptyStateSubText: {
    fontSize: RFValue(14),
    color: "#aaa",
    marginTop: verticalScale(8),
    textAlign: "center",
  },
});
