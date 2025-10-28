import { Habit, useHabitStore } from "@/src/stores/habit/habitStore";
import { useThemeStore } from "@/src/stores/themeStore/themeStore";
import { darkTheme } from "@/src/styles/darkTheme";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
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
import IconPickerModal from "../AddHabitModal/IconPickerModal";

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

interface EditHabitModalProps {
  isVisible: boolean;
  onClose: () => void;
  habitToEdit: Habit | null;
}

export default function EditHabitModal({
  isVisible,
  onClose,
  habitToEdit,
}: EditHabitModalProps) {
  const { t } = useTranslation();
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  const { editHabit } = useHabitStore();

  const [nome, setNome] = useState("");
  const [icon, setIcon] = useState("star");
  const [difficulty, setDifficulty] = useState(1);
  const [isIconPickerVisible, setIconPickerVisible] = useState(false);

  useEffect(() => {
    if (habitToEdit) {
      setNome(habitToEdit.nome);
      setIcon(habitToEdit.icon);
      setDifficulty(habitToEdit.difficulty || 1);
    }
  }, [habitToEdit]);

  const handleSaveChanges = () => {
    if (!habitToEdit) return;

    if (nome.trim().length === 0) {
      Toast.show({
        type: "error",
        text1: t("common.attention"),
        text2: t("habits.habitNameRequiredError"),
      });
      return;
    }

    editHabit(habitToEdit.id, {
      nome: nome.trim(),
      icon,
      difficulty,
    });
    onClose();
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={onClose}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, isDark && darkTheme.modalView]}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Ionicons
                  name="close"
                  size={moderateScale(24)}
                  color={isDark ? "#FFF" : "#333"}
                />
              </TouchableOpacity>
              <Text style={[styles.modalTitle, isDark && darkTheme.text]}>
                {t("habits.editHabit")}
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

              <TouchableOpacity
                style={[
                  styles.saveButton,
                  isDark && { backgroundColor: "#BB86FC" },
                ]}
                onPress={handleSaveChanges}
              >
                <Text style={styles.saveButtonText}>
                  {t("common.saveChanges")}
                </Text>
              </TouchableOpacity>
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
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: "90%",
    maxHeight: "90%",
    backgroundColor: "white",
    borderRadius: moderateScale(20),
    padding: moderateScale(25),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  modalTitle: {
    fontSize: RFValue(22),
    fontWeight: "bold",
    marginBottom: verticalScale(20),
    textAlign: "center",
  },
  inputRow: {
    flexDirection: "row",
    width: "100%",
    marginBottom: verticalScale(15),
    alignItems: "flex-start",
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
    maxHeight: verticalScale(100),
  },
  inputNome: {
    flex: 1,
  },
  saveButton: {
    backgroundColor: "#2ECC71",
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
    width: "100%",
    alignItems: "center",
    marginTop: verticalScale(10),
  },
  saveButtonText: {
    color: "white",
    fontSize: RFValue(16),
    fontWeight: "bold",
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
