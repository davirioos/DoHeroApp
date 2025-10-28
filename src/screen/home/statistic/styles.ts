import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
  },
  scrollContainer: {
    alignItems: "center",
    paddingBottom: verticalScale(120),
  },
  settingsButton: {
    position: "absolute",
    top: verticalScale(15),
    right: scale(15),
    zIndex: 10,
    padding: moderateScale(5),
  },
  headerImage: {
    width: "100%",
    height: verticalScale(200),
  },
  profileContainer: {
    alignItems: "center",
    marginTop: verticalScale(10),
    marginBottom: verticalScale(10),
  },
  profileName: {
    fontSize: RFValue(24),
    fontWeight: "bold",
    color: "#333",
  },
  profileTitle: {
    fontSize: RFValue(16),
    color: "#666",
  },
  section: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: moderateScale(15),
    padding: moderateScale(15),
    marginBottom: verticalScale(20),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: RFValue(18),
    fontWeight: "600",
    color: "#444",
    marginBottom: verticalScale(15),
    textAlign: "center",
  },
  habitStreakContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    marginBottom: verticalScale(20),
  },
  statBox: {
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: verticalScale(15),
    borderRadius: moderateScale(10),
    width: "48%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: RFValue(32),
    fontWeight: "bold",
    color: "#2ECC71",
  },
  statLabel: {
    fontSize: RFValue(14),
    color: "#666",
    marginTop: verticalScale(5),
  },
  achievementsGrid: {
    flexDirection: "row",
    justifyContent: "center",
  },
  achievementItem: {
    alignItems: "center",
    margin: moderateScale(10),
    width: scale(70),
  },
  achievementIcon: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
    marginBottom: verticalScale(5),
  },
  achievementName: {
    fontSize: RFValue(12),
    color: "#333",
    textAlign: "center",
  },

  button: {
    backgroundColor: "#333",
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(80),
    borderRadius: 8,
    minHeight: verticalScale(45),
  },
  tedxtButtonConfig: {
    textAlign: "center",
    color: "#fff",
    fontSize: RFValue(18),
    fontWeight: "bold",
  },
});
