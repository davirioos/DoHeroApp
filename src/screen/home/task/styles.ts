// styles.ts
import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2ECC71",
    paddingTop: verticalScale(10),
  },
  background: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    // Usamos moderateScale para paddings para um espaçamento equilibrado
    padding: moderateScale(30),
  },
  containerHeader: {
    alignItems: "center",
    // Usamos scale para espaçamentos horizontais
    paddingHorizontal: scale(10),
  },
  tituloText: {
    color: "#fff",
    fontSize: RFValue(20), // RFValue ainda é uma ótima opção para fontes!
    fontWeight: "bold",
    textAlign: "center",
  },
  containerMainStatisc: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    // Usamos scale para o espaçamento entre os itens
    gap: scale(10),
    width: "90%",
  },
  containerTask: {
    backgroundColor: "#fff",
    width: "100%",
    height: verticalScale(520),
    padding: moderateScale(10),
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});
