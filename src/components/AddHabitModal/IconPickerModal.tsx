import { useThemeStore } from "@/src/stores/themeStore/themeStore";
import { darkTheme } from "@/src/styles/darkTheme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ICON_LIST } from "../habits/iconList";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onSelect: (iconName: string) => void;
}

const IconPickerModal: React.FC<Props> = ({ isVisible, onClose, onSelect }) => {
  const { t } = useTranslation();
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  const handleSelect = (iconName: string) => {
    onSelect(iconName);
    onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.centeredView}
        activeOpacity={1}
        onPressOut={onClose}
      >
        <View style={[styles.modalView, isDark && darkTheme.modalView]}>
          <Text style={[styles.modalTitle, isDark && darkTheme.text]}>
            {t("iconPicker.title")}
          </Text>
          <ScrollView contentContainerStyle={styles.iconGrid}>
            {ICON_LIST.map((iconName) => (
              <TouchableOpacity
                key={iconName}
                style={[
                  styles.iconButton,
                  isDark && { backgroundColor: "#2C2C2C" },
                ]}
                onPress={() => handleSelect(iconName)}
              >
                <Ionicons
                  name={iconName as any}
                  size={30}
                  color={isDark ? "#FFF" : "#333"}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalView: {
    width: "90%",
    maxHeight: "70%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  iconGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  iconButton: {
    padding: 10,
    margin: 5,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default IconPickerModal;
