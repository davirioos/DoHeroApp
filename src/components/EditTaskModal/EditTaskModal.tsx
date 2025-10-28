import { CLASS_OPTIONS, TaskClass } from "@/src/config/gameConfig";
import { Task, useTaskStore } from "@/src/stores/task/taskStore";
import { useThemeStore } from "@/src/stores/themeStore/themeStore";
import { darkTheme } from "@/src/styles/darkTheme";
import { FontAwesome5 } from "@expo/vector-icons";
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
import DatePicker from "react-native-date-picker";
import { RFValue } from "react-native-responsive-fontsize";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Toast from "react-native-toast-message";

interface EditTaskModalProps {
  isVisible: boolean;
  onClose: () => void;
  taskToEdit: Task | null;
}

export default function EditTaskModal({
  isVisible,
  onClose,
  taskToEdit,
}: EditTaskModalProps) {
  const { t } = useTranslation();
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  const { editTask } = useTaskStore();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [taskClass, setTaskClass] = useState<TaskClass>("C");
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setTaskClass(taskToEdit.class as TaskClass);
      setDate(taskToEdit.data ? new Date(taskToEdit.data) : new Date());
    }
  }, [taskToEdit]);

  const handleEditTask = () => {
    if (!taskToEdit) return;
    if (title.trim().length === 0) {
      Toast.show({
        type: "error",
        text1: t("common.attention"),
        text2: t("tasks.titleRequiredError"),
      });
      return;
    }

    editTask(taskToEdit.id, {
      title: title.trim(),
      description: description.trim(),
      data: date.toISOString(),
      class: taskClass,
      xp: taskToEdit.xp,
      gold: taskToEdit.gold,
    });
    onClose();
  };

  const formattedDate = date.toLocaleString([], {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

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
                <FontAwesome5
                  name="times"
                  size={moderateScale(24)}
                  color={isDark ? "#FFF" : "#333"}
                />
              </TouchableOpacity>
              <Text style={[styles.modalTitle, isDark && darkTheme.text]}>
                {t("tasks.editTask")}
              </Text>

              <TextInput
                style={[styles.input, isDark && darkTheme.input]}
                placeholder={t("tasks.taskTitlePlaceholder")}
                placeholderTextColor={isDark ? "#888" : "#888"}
                value={title}
                onChangeText={setTitle}
                maxLength={100}
                multiline={true}
              />
              <TextInput
                style={[styles.textArea, isDark && darkTheme.input]}
                placeholder={t("tasks.descriptionPlaceholder")}
                placeholderTextColor={isDark ? "#888" : "#888"}
                multiline
                value={description}
                onChangeText={setDescription}
                maxLength={250}
              />

              <TouchableOpacity
                style={[
                  styles.datePickerButton,
                  isDark && { backgroundColor: "#2C2C2C" },
                ]}
                onPress={() => setDatePickerVisible(true)}
              >
                <FontAwesome5
                  name="calendar-alt"
                  size={moderateScale(18)}
                  color={isDark ? "#FFF" : "#333"}
                />
                <Text
                  style={[
                    styles.datePickerButtonText,
                    isDark && darkTheme.text,
                  ]}
                >
                  {formattedDate}
                </Text>
              </TouchableOpacity>

              <View style={styles.classSelector}>
                {CLASS_OPTIONS.map((c) => (
                  <TouchableOpacity
                    key={c}
                    style={[
                      styles.classButton,
                      isDark && { borderColor: "#BB86FC" },
                      taskClass === c &&
                        (isDark
                          ? { backgroundColor: "#BB86FC" }
                          : styles.classButtonSelected),
                    ]}
                    onPress={() => setTaskClass(c)}
                  >
                    <Text
                      style={[
                        styles.classButtonText,
                        isDark && { color: "#BB86FC" },
                        taskClass === c && styles.classButtonTextSelected,
                      ]}
                    >
                      {c}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                style={[
                  styles.saveButton,
                  isDark && { backgroundColor: "#6200EE" },
                ]}
                onPress={handleEditTask}
              >
                <Text style={styles.saveButtonText}>{t("tasks.saveTask")}</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <DatePicker
        modal
        open={isDatePickerVisible}
        date={date}
        onConfirm={(selectedDate) => {
          setDatePickerVisible(false);
          setDate(selectedDate);
        }}
        onCancel={() => {
          setDatePickerVisible(false);
        }}
        title={t("editTask.selectDate")}
        confirmText={t("common.confirm")}
        cancelText={t("common.cancel")}
        theme={isDark ? "dark" : "light"}
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
    maxHeight: "90%", // Garante que o modal não ultrapasse a tela
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
    zIndex: 1,
  },
  modalTitle: {
    fontSize: RFValue(24),
    fontWeight: "bold",
    marginBottom: verticalScale(20),
    color: "#333",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: moderateScale(15),
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(15),
    fontSize: RFValue(16),
    color: "#333",
    maxHeight: verticalScale(100), // Limita altura do título
  },
  textArea: {
    width: "100%",
    padding: moderateScale(15),
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(15),
    fontSize: RFValue(16),
    color: "#333",
    height: verticalScale(100), // Altura fixa
    maxHeight: verticalScale(150), // Limita altura da descrição
    textAlignVertical: "top",
  },
  datePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(15),
    width: "100%",
    justifyContent: "center",
  },
  datePickerButtonText: {
    marginLeft: scale(10),
    fontSize: RFValue(16),
    color: "#333",
    fontWeight: "500",
  },
  classSelector: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: verticalScale(20),
    width: "100%",
    gap: verticalScale(10),
  },
  classButton: {
    borderWidth: 1,
    borderColor: "#2ECC71",
    borderRadius: moderateScale(8),
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(15),
    alignItems: "center",
    marginBottom: verticalScale(5),
  },
  classButtonSelected: {
    backgroundColor: "#2ECC71",
  },
  classButtonText: {
    color: "#333",
    fontWeight: "500",
  },
  classButtonTextSelected: {
    color: "#fff",
    fontWeight: "bold",
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
    fontSize: RFValue(18),
    fontWeight: "bold",
  },
});
