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
    formState: { errors, touchedFields, isSubmitted },
  } = useForm<Inputs>({
    mode: "onBlur", // só mostra erro após sair do campo
    reValidateMode: "onBlur",
    shouldFocusError: false,
  });
  useEffect(() => {
    const timeout = setTimeout(() => {
      getSubmitHandler(handleSubmit(onSubmit));
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View>
      <Text style={styles.title}>Nome</Text>
      <Controller
        control={control}
        name="nome"
        rules={{
          required: "Nome é obrigatória",
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
      {errors.nome && (touchedFields.nome || isSubmitted) && (
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
      {errors.email && (touchedFields.email || isSubmitted) && (
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
      {errors.password && (touchedFields.password || isSubmitted) && (
        <Text style={styles.errorText}>{errors.password.message}</Text>
      )}
      <Controller
        control={control}
        name="termos"
        rules={{ required: "Você precisa aceitar os termos." }}
        render={({ field: { onChange, value } }) => (
          <TouchableOpacity
            onPress={() => onChange(!value)}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <View
              style={{
                width: moderateScale(20),
                height: moderateScale(20),
                borderColor: "#000",
                borderWidth: 1,
                marginRight: scale(8),
                backgroundColor: value ? "#4caf50" : "#fff",
              }}
            />
            <Text style={{ color: "#5EA6FF", fontSize: RFValue(12) }}>
              Eu li e concordo com os Termos de Uso
            </Text>
          </TouchableOpacity>
        )}
      />
      {errors.termos && (touchedFields.termos || isSubmitted) && (
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
  },
  title: {
    color: "#fff",
    fontSize: RFValue(14),
  },
});
