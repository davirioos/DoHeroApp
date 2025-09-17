// src/components/AddTaskModal/AddTaskModal.tsx
import {
  CLASS_OPTIONS,
  TASK_REWARDS,
  TaskClass,
} from "@/src/config/gameConfig";
import React, { useEffect, useState } from "react";
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
import { useTaskStore } from "../../stores/task/taskStore";

const AddTaskModal: React.FC = () => {
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
        text1: "Atenção",
        text2: "Por favor, insira um título para a lista.",
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
        text1: "Atenção",
        text2: "Por favor, insira um título para a tarefa.",
      });
      return;
    }

    // Lógica de recompensa centralizada
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
  const handleConfirmDate = () => {
    setDate(tempDate);
    setDatePickerVisible(false);
  };
  const handleCancelDate = () => setDatePickerVisible(false);

  const renderContent = () => {
    if (view === "options") {
      return (
        <>
          <Text style={styles.modalText}>O que deseja criar?</Text>
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => setView("addList")}
            >
              <Text style={styles.optionButtonText}>Nova Lista</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => setView("addTask")}
            >
              <Text style={styles.optionButtonText}>Nova Tarefa</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: verticalScale(20) }}>
            <Button
              title="Cancelar"
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
          <Text style={styles.modalText}>Nova Lista</Text>
          <TextInput
            style={styles.input}
            placeholder="Título da Lista *"
            placeholderTextColor="#999"
            value={listTitle}
            onChangeText={setListTitle}
          />
          <View style={styles.buttonContainer}>
            <Button
              title="Voltar"
              onPress={() => setView("options")}
              color="#aaa"
            />
            <Button title="Adicionar Lista" onPress={handleAddList} />
          </View>
        </>
      );
    }

    if (view === "addTask") {
      return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Text style={styles.modalText}>Nova Missão</Text>
          <TextInput
            style={styles.input}
            placeholder="Título da Missão *"
            placeholderTextColor="#999"
            value={title}
            onChangeText={setTitle}
            maxLength={100}
            multiline={true}
          />
          <TextInput
            style={styles.inputDescription}
            placeholder="Descrição (opcional)"
            placeholderTextColor="#999"
            value={description}
            onChangeText={setDescription}
            maxLength={250}
            multiline={true}
            textAlignVertical="top"
          />
          <Text style={styles.label}>Classe *</Text>
          <View style={styles.classButtonContainer}>
            {CLASS_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.classButton,
                  taskClass === option && styles.classButtonSelected,
                ]}
                onPress={() => setTaskClass(option)}
              >
                <Text
                  style={[
                    styles.classButtonText,
                    taskClass === option && styles.classButtonTextSelected,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.label}>Data e Hora de Término *</Text>
          <TouchableOpacity style={styles.dateInput} onPress={openDatePicker}>
            <Text style={styles.dateText}>
              {date.toLocaleString("pt-BR", {
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
            <Button
              title="Voltar"
              onPress={() => setView("options")}
              color="#aaa"
            />
            <Button title="Adicionar Missão" onPress={handleAddTask} />
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
          <View style={styles.modalView}>{renderContent()}</View>
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
    borderColor: "#6200ee",
    borderRadius: moderateScale(8),
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(15),
    alignItems: "center",
    marginBottom: verticalScale(5),
  },
  classButtonSelected: {
    backgroundColor: "#6200ee",
  },
  classButtonText: {
    color: "#6200ee",
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
});

export default AddTaskModal;
