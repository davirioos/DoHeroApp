import React from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

type Inputs = {
  email: string;
  password: string;
};

type InputUserProps = {
  onSubmit: (data: Inputs) => void;
  getSubmitHandler: (handleSubmit: () => void) => void;
};

export default function InputUser({
  onSubmit,
  getSubmitHandler,
}: InputUserProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitted },
  } = useForm<Inputs>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldFocusError: false,
  });

  React.useEffect(() => {
    getSubmitHandler(handleSubmit(onSubmit));
  }, []);

  return (
    <View>
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
            testID="emailInput"
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
            testID="passwordInput"
          />
        )}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password.message}</Text>
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
