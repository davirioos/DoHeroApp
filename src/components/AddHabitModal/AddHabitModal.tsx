import { useHabitStore } from "@/src/stores/habit/habitStore";
import { useThemeStore } from "@/src/stores/themeStore/themeStore";
import { darkTheme } from "@/src/styles/darkTheme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Toast from "react-native-toast-message";
import IconPickerModal from "./IconPickerModal";

const StarRatingSelector = ({
  rating,
  onRate,
}: {
  rating: number;
  onRate: (rate: number) => void;
}) => (
  <View style={styles.starSelectorContainer}>
    {Array.from({ length: 5 }).map((_, index) => (
      <TouchableOpacity key={index} onPress={() => onRate(index + 1)}>
        <Ionicons
          name={index < rating ? "star" : "star-outline"}
          size={moderateScale(32)}
          color="#FFC700"
        />
      </TouchableOpacity>
    ))}
  </View>
);

const AddHabitModal: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  const [nome, setNome] = useState("");
  const [icon, setIcon] = useState("star");
  const [difficulty, setDifficulty] = useState(1);
  const [isIconPickerVisible, setIconPickerVisible] = useState(false);
  const { isModalVisible, toggleModal, addHabit } = useHabitStore();

  const clearFormAndClose = () => {
    setNome("");
    setIcon("star");
    setDifficulty(1);
    toggleModal();
  };

  const handleAddHabit = () => {
    if (nome.trim().length === 0) {
      Toast.show({
        type: "error",
        text1: t("common.attention"),
        text2: t("habits.habitNameRequiredError"),
      });
      return;
    }

    addHabit({
      nome: nome.trim(),
      icon: icon.trim(),
      difficulty,
    });
    clearFormAndClose();
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={clearFormAndClose}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, isDark && darkTheme.modalView]}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <Text style={[styles.modalText, isDark && darkTheme.text]}>
                {t("habits.newHabit")}
              </Text>

              <View style={styles.inputRow}>
                <TouchableOpacity
                  style={[
                    styles.iconPreviewButton,
                    isDark && { borderColor: "#444" },
                  ]}
                  onPress={() => setIconPickerVisible(true)}
                >
                  <Ionicons
                    name={icon as any}
                    size={moderateScale(30)}
                    color={isDark ? "#BB86FC" : "#2ECC71"}
                  />
                </TouchableOpacity>
                <TextInput
                  style={[
                    styles.input,
                    styles.inputNome,
                    isDark && darkTheme.input,
                  ]}
                  placeholder={t("habits.habitNamePlaceholder")}
                  placeholderTextColor={isDark ? "#888" : "#999"}
                  value={nome}
                  onChangeText={setNome}
                  maxLength={100}
                  multiline={true}
                />
              </View>

              <Text style={[styles.label, isDark && darkTheme.text]}>
                {t("habits.difficulty")}
              </Text>
              <StarRatingSelector rating={difficulty} onRate={setDifficulty} />

              <View style={styles.buttonContainer}>
                <Button
                  title={t("common.cancel")}
                  onPress={clearFormAndClose}
                  color="#f44336"
                />
                <Button
                  title={t("common.add")}
                  onPress={handleAddHabit}
                  color={isDark ? "#BB86FC" : "#2196F3"}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <IconPickerModal
        isVisible={isIconPickerVisible}
        onClose={() => setIconPickerVisible(false)}
        onSelect={setIcon}
      />
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "90%",
    maxHeight: "90%",
    backgroundColor: "white",
    borderRadius: moderateScale(20),
    padding: moderateScale(25),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: verticalScale(20),
    textAlign: "center",
    fontSize: RFValue(20),
    fontWeight: "bold",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-start", // Alinha ao topo para inputs multiline
    width: "100%",
    marginBottom: verticalScale(15),
  },
  iconPreviewButton: {
    height: verticalScale(50),
    width: scale(50),
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: moderateScale(10),
    marginRight: scale(10),
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: moderateScale(10),
    paddingHorizontal: scale(15),
    fontSize: RFValue(16),
    paddingVertical: verticalScale(10),
    maxHeight: verticalScale(100), // Limita altura
  },
  inputNome: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: verticalScale(10),
  },
  label: {
    fontSize: RFValue(16),
    fontWeight: "600",
    color: "#333",
    marginBottom: verticalScale(10),
    alignSelf: "flex-start",
  },
  starSelectorContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: verticalScale(20),
  },
});

export default AddHabitModal;
