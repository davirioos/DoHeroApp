// src/styles/darkTheme.ts

export const darkTheme = {
  // --- Telas de Autenticação ---
  authContainer: {
    backgroundColor: "#121212",
  },
  authTitle: {
    color: "#FFFFFF",
  },
  authInput: {
    backgroundColor: "#1E1E1E",
    borderColor: "#333333",
    color: "#FFFFFF",
  },
  authLinkText: {
    color: "#BB86FC",
  },
  authCheckboxLabel: {
    color: "#FFFFFF",
  },

  // --- Telas Principais ---
  container: {
    backgroundColor: "#121212",
  },
  text: {
    color: "#FFFFFF",
  },
  subtext: {
    color: "#A9A9A9",
  },

  // --- Componentes ---
  card: {
    backgroundColor: "#1E1E1E",
    shadowColor: "#000",
  },
  modalView: {
    backgroundColor: "#1E1E1E",
  },
  input: {
    backgroundColor: "#2C2C2C",
    borderColor: "#444",
    color: "#FFFFFF",
    placeholderTextColor: "#888",
  },

  // --- Hábitos ---
  habits: {
    container: { backgroundColor: "#121212" },
    title: { color: "#FFFFFF" },
    statBox: { backgroundColor: "#1E1E1E" },
    statValue: { color: "#FFFFFF" },
    statLabel: { color: "#A9A9A9" },
    toggleContainer: { backgroundColor: "#2C2C2C" },
    toggleText: { color: "#A9A9A9" },
    toggleButtonActive: { backgroundColor: "#3700B3" },
    toggleTextActive: { color: "#FFFFFF" },
    cardContainer: { backgroundColor: "#1E1E1E" },
    habitName: { color: "#FFFFFF" },
    dayLabel: { color: "#A9A9A9" },
    dayBox: { borderColor: "#444" },
    dayBoxDisabled: { backgroundColor: "#2C2C2C", borderColor: "#444" },
    rewardText: { color: "#E1E1E1" },
  },

  // --- Tarefas ---
  tasks: {
    container: { backgroundColor: "#1e1f24" }, // Um roxo escuro para o cabeçalho
    containerTask: { backgroundColor: "#121212" },
    listButton: { borderColor: "#333" },
    listButtonText: { color: "#A9A9A9" },
    listButtonSelected: { backgroundColor: "#6200EE" },
    listButtonTextSelected: { color: "#FFFFFF" },
    card: { backgroundColor: "#1E1E1E" },
    completedCard: { backgroundColor: "#1A241A", opacity: 0.7 },
    title: { color: "#FFFFFF" },
    description: { color: "#A9A9A9" },
    dateText: { color: "#A9A9A9" },
    dateTextOverdue: { color: "#CF6679" },
  },

  // --- Perfil (Estatísticas) ---
  statistics: {
    container: { backgroundColor: "#121212" },
    profileName: { color: "#FFFFFF" },
    profileTitle: { color: "#A9A9A9" },
    section: { backgroundColor: "#1E1E1E" },
    sectionTitle: { color: "#FFFFFF" },
    statBox: { backgroundColor: "#1E1E1E" },
    statValue: { color: "#BB86FC" },
    statLabel: { color: "#A9A9A9" },
    achievementName: { color: "#FFFFFF" },
    logoutText: { color: "#CF6679" },
    button: { backgroundColor: "#6200EE" },
  },

  // --- Configurações ---
  settings: {
    container: { backgroundColor: "#121212" },
    title: { color: "#FFFFFF" },
    sectionTitle: { color: "#FFFFFF" },
    languageButton: { backgroundColor: "#1E1E1E", borderColor: "#333" },
    languageButtonText: { color: "#FFFFFF" },
    languageButtonSelected: {
      borderColor: "#BB86FC",
      backgroundColor: "#3700B3",
    },
    themeContainer: {
      backgroundColor: "#1E1E1E",
      borderColor: "#333",
    },
    themeText: {
      color: "#FFFFFF",
    },
  },
};
