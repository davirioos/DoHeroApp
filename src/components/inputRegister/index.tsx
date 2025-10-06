import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

type Inputs = {
  nome: string;
  email: string;
  password: string;
  termos: boolean;
};

type InputUserProps = {
  onSubmit: (data: Inputs) => void;
  getSubmitHandler: (handleSubmit: () => void) => void;
};

export default function InputRegister({
  onSubmit,
  getSubmitHandler,
}: InputUserProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldFocusError: false,
  });

  useEffect(() => {
    getSubmitHandler(handleSubmit(onSubmit));
  }, [handleSubmit, onSubmit, getSubmitHandler]);

  return (
    <View>
      <Text style={styles.title}>Nome</Text>
      <Controller
        control={control}
        name="nome"
        rules={{
          required: "Nome é obrigatório",
          minLength: {
            value: 3,
            message: "Nome deve ter ao menos 3 caracteres",
          },
        }}
        defaultValue=""
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Nome Completo"
          />
        )}
      />
      {errors.nome && (
        <Text style={styles.errorText}>{errors.nome.message}</Text>
      )}

      <Text style={styles.title}>E-mail</Text>
      <Controller
        control={control}
        name="email"
        rules={{
          required: "Email é obrigatório",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Email inválido",
          },
        }}
        defaultValue=""
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="E-mail"
          />
        )}
      />
      {errors.email && (
        <Text style={styles.errorText}>{errors.email.message}</Text>
      )}

      <Text style={styles.title}>Senha</Text>
      <Controller
        control={control}
        name="password"
        rules={{
          required: "Senha é obrigatória",
          minLength: {
            value: 6,
            message: "Senha deve ter ao menos 6 caracteres",
          },
        }}
        defaultValue=""
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Digite a sua senha"
            secureTextEntry={true}
          />
        )}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password.message}</Text>
      )}

      <Controller
        control={control}
        name="termos"
        rules={{ required: "Você precisa aceitar os termos." }}
        defaultValue={false}
        render={({ field: { onChange, value } }) => (
          <View style={styles.checkboxContainer}>
            <TouchableOpacity onPress={() => onChange(!value)}>
              <View
                style={[styles.checkboxBase, value && styles.checkboxChecked]}
              >
                {value && (
                  <Ionicons
                    name="checkmark"
                    size={moderateScale(16)}
                    color="#fff"
                  />
                )}
              </View>
            </TouchableOpacity>
            <Text style={styles.checkboxLabel}>
              Eu li e concordo com os{" "}
              <Link href="/terms">
                <Text style={styles.linkText}>Termos de Uso</Text>
              </Link>{" "}
              e{" "}
              <Link href="/privacy">
                <Text style={styles.linkText}>Política de Privacidade</Text>
              </Link>
              .
            </Text>
          </View>
        )}
      />
      {errors.termos && (
        <Text style={styles.errorText}>{errors.termos.message}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: moderateScale(6),
    padding: moderateScale(12),
    width: scale(250),
    marginBottom: verticalScale(12),
    fontSize: RFValue(14),
  },
  errorText: {
    color: "red",
    marginBottom: verticalScale(8),
    fontSize: RFValue(12),
    marginTop: verticalScale(-5),
  },
  title: {
    color: "#fff",
    fontSize: RFValue(14),
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(10),
    marginBottom: verticalScale(5),
    width: scale(250),
  },
  checkboxBase: {
    width: moderateScale(22),
    height: moderateScale(22),
    justifyContent: "center",
    alignItems: "center",
    marginRight: scale(10),
    borderRadius: moderateScale(4),
    borderWidth: 2,
    borderColor: "#2ECC71",
    backgroundColor: "transparent",
  },
  checkboxChecked: {
    backgroundColor: "#2ECC71",
  },
  checkboxLabel: {
    color: "#fff",
    fontSize: RFValue(12),
    flexShrink: 1, // Permite que o texto quebre a linha
  },
  linkText: {
    color: "#5EA6FF",
    textDecorationLine: "underline",
  },
});
