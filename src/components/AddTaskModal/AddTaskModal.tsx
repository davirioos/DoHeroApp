import {
  CLASS_OPTIONS,
  TASK_REWARDS,
  TaskClass,
} from "@/src/config/gameConfig";
import { useTaskStore } from "@/src/stores/task/taskStore";
import { useThemeStore } from "@/src/stores/themeStore/themeStore";
import { darkTheme } from "@/src/styles/darkTheme";
import React, { useEffect, useState } from "react";
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
import DatePicker from "react-native-date-picker";
import { RFValue } from "react-native-responsive-fontsize";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Toast from "react-native-toast-message";

const AddTaskModal: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  const { isModalVisible, closeModal, addTask, addList, modalView } =
    useTaskStore();

  const [view, setView] = useState<"options" | "addTask" | "addList">(
    modalView
  );

  useEffect(() => {
    if (isModalVisible) {
      setView(modalView);
    }
  }, [isModalVisible, modalView]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskClass, setTaskClass] = useState<TaskClass>("C");
  const [date, setDate] = useState(new Date());
  const [tempDate, setTempDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const [listTitle, setListTitle] = useState("");

  const clearFormsAndClose = () => {
    setTitle("");
    setDescription("");
    setTaskClass("C");
    setDate(new Date());
    setListTitle("");
    setView("options");
    closeModal();
  };

  const handleAddList = () => {
    if (listTitle.trim().length === 0) {
      Toast.show({
        type: "error",
        text1: t("common.attention"),
        text2: t("tasks.listTitleRequiredError"),
      });
      return;
    }
    addList(listTitle.trim());
    clearFormsAndClose();
  };

  const handleAddTask = () => {
    if (title.trim().length === 0) {
      Toast.show({
        type: "error",
        text1: t("common.attention"),
        text2: t("tasks.titleRequiredError"),
      });
      return;
    }

    const rewards = TASK_REWARDS[taskClass];

    addTask({
      title: title.trim(),
      description: description.trim(),
      data: date.toISOString(),
      class: taskClass,
      xp: rewards.xp,
      gold: rewards.gold,
    });
    clearFormsAndClose();
  };

  const openDatePicker = () => {
    setTempDate(date);
    setDatePickerVisible(true);
  };

  const renderContent = () => {
    if (view === "options") {
      return (
        <>
          <Text style={[styles.modalText, isDark && darkTheme.text]}>
            {t("tasks.whatToCreate")}
          </Text>
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                isDark && { backgroundColor: "#6200EE" },
              ]}
              onPress={() => setView("addList")}
            >
              <Text style={styles.optionButtonText}>{t("tasks.newList")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionButton,
                isDark && { backgroundColor: "#6200EE" },
              ]}
              onPress={() => setView("addTask")}
            >
              <Text style={styles.optionButtonText}>
                {t("tasks.newTaskOption")}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: verticalScale(20) }}>
            <Button
              title={t("common.cancel")}
              onPress={clearFormsAndClose}
              color="#f44336"
            />
          </View>
        </>
      );
    }

    if (view === "addList") {
      return (
        <>
          <Text style={[styles.modalText, isDark && darkTheme.text]}>
            {t("tasks.newList")}
          </Text>
          <TextInput
            style={[styles.input, isDark && darkTheme.input]}
            placeholder={t("tasks.listTitlePlaceholder")}
            placeholderTextColor={isDark ? "#888" : "#999"}
            value={listTitle}
            onChangeText={setListTitle}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.stylesButtonNext}
              onPress={() => setView("options")}
            >
              <Text style={styles.stylesButtonAddText}>{t("common.back")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.stylesButtonAdd,
                isDark && { backgroundColor: "#6200EE" },
              ]}
              onPress={handleAddList}
            >
              <Text style={styles.stylesButtonAddText}>
                {t("tasks.addList")}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      );
    }

    if (view === "addTask") {
      return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Text style={[styles.modalText, isDark && darkTheme.text]}>
            {t("tasks.newTask")}
          </Text>
          <TextInput
            style={[styles.input, isDark && darkTheme.input]}
            placeholder={t("tasks.taskTitlePlaceholder")}
            placeholderTextColor={isDark ? "#888" : "#999"}
            value={title}
            onChangeText={setTitle}
            maxLength={100}
            multiline={true}
          />
          <TextInput
            style={[styles.inputDescription, isDark && darkTheme.input]}
            placeholder={t("tasks.descriptionPlaceholder")}
            placeholderTextColor={isDark ? "#888" : "#999"}
            value={description}
            onChangeText={setDescription}
            maxLength={250}
            multiline={true}
            textAlignVertical="top"
          />
          <Text style={[styles.label, isDark && darkTheme.text]}>
            {t("tasks.class")}
          </Text>
          <View style={styles.classButtonContainer}>
            {CLASS_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.classButton,
                  isDark && { borderColor: "#BB86FC" },
                  taskClass === option &&
                    (isDark
                      ? { backgroundColor: "#BB86FC" }
                      : styles.classButtonSelected),
                ]}
                onPress={() => setTaskClass(option)}
              >
                <Text
                  style={[
                    styles.classButtonText,
                    isDark && { color: "#BB86FC" },
                    taskClass === option && styles.classButtonTextSelected,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={[styles.label, isDark && darkTheme.text]}>
            {t("tasks.endDate")}
          </Text>
          <TouchableOpacity
            style={[styles.dateInput, isDark && darkTheme.input]}
            onPress={openDatePicker}
          >
            <Text style={[styles.dateText, isDark && darkTheme.text]}>
              {date.toLocaleString([], {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </Text>
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => setView("options")}
              style={styles.stylesButtonNext}
            >
              <Text style={styles.stylesButtonAddText}>{t("common.back")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.stylesButtonAdd,
                isDark && { backgroundColor: "#6200EE" },
              ]}
              onPress={handleAddTask}
            >
              <Text style={styles.stylesButtonAddText}>
                {t("tasks.addTask")}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    }
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={clearFormsAndClose}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, isDark && darkTheme.modalView]}>
            {renderContent()}
          </View>
        </View>
      </Modal>

      <DatePicker
        modal
        open={isDatePickerVisible}
        date={tempDate}
        onConfirm={(date) => {
          setDatePickerVisible(false);
          setDate(date);
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
    maxHeight: "90%", // Garante que o modal não ultrapasse a tela
    margin: moderateScale(20),
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
  label: {
    width: "100%",
    fontSize: RFValue(16),
    color: "#333",
    marginBottom: verticalScale(10),
    textAlign: "left",
  },
  dateText: {
    fontSize: RFValue(16),
    color: "#000",
  },
  input: {
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(15),
    paddingHorizontal: scale(15),
    fontSize: RFValue(16),
    paddingVertical: verticalScale(10),
    maxHeight: verticalScale(100), // Limita a altura máxima do input de título
  },
  inputDescription: {
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(15),
    paddingHorizontal: scale(15),
    fontSize: RFValue(16),
    paddingVertical: verticalScale(10),
    height: verticalScale(120), // Altura fixa para descrição
    maxHeight: verticalScale(150), // Limita a altura máxima
  },
  dateInput: {
    height: verticalScale(50),
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(15),
    paddingHorizontal: scale(15),
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: verticalScale(10),
  },
  classButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    width: "100%",
    marginBottom: verticalScale(15),
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
    color: "#2ECC71",
    fontWeight: "bold",
  },
  classButtonTextSelected: {
    color: "#fff",
  },
  datePickerCenteredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  datePickerModalView: {
    backgroundColor: "white",
    borderRadius: moderateScale(20),
    padding: moderateScale(20),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  datePickerButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: verticalScale(15),
  },
  optionsContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: verticalScale(15),
  },
  optionButton: {
    backgroundColor: "#2ECC71",
    paddingVertical: verticalScale(15),
    borderRadius: moderateScale(10),
    width: "80%",
    alignItems: "center",
  },
  optionButtonText: {
    color: "#fff",
    fontSize: RFValue(16),
    fontWeight: "bold",
  },
  stylesButtonNext: {
    backgroundColor: "#aaa",
    justifyContent: "center",
    borderRadius: moderateScale(5),
    padding: moderateScale(10),
  },
  stylesButtonAdd: {
    backgroundColor: "#2ECC71",
    justifyContent: "center",
    borderRadius: moderateScale(5),
    padding: moderateScale(10),
  },
  stylesButtonAddText: {
    color: "#fff",
    fontSize: RFValue(16),
  },
});

export default AddTaskModal;
