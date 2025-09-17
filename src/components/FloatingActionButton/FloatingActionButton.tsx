import React from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface FloatingActionButtonProps {
  onPress: (event: GestureResponderEvent) => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onPress,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { bottom: (insets.bottom > 0 ? insets.bottom : 10) + 75 },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.plusSign}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute", // Chave para fixá-lo na tela
    right: 30, // Distância da parte direita
    width: 50,
    height: 50,
    borderRadius: 30, // Metade da largura/altura para ser um círculo
    backgroundColor: "#2ECC71", // Cor de exemplo (Material Design)
    justifyContent: "center",
    alignItems: "center",
    elevation: 8, // Sombra para Android
    // Sombra para iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  plusSign: {
    fontSize: 30,
    color: "#fff",
    lineHeight: 32, // Ajuste fino para centralização vertical
  },
});

export default FloatingActionButton;
