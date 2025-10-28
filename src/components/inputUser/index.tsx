import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldFocusError: false,
  });

  React.useEffect(() => {
    getSubmitHandler(handleSubmit(onSubmit));
  }, [handleSubmit, onSubmit, getSubmitHandler]);

  return (
    <View>
      <Text style={styles.title}>{t("login.email")}</Text>
      <Controller
        control={control}
        name="email"
        rules={{
          required: t("register.emailRequired"),
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: t("register.emailInvalid"),
          },
        }}
        defaultValue=""
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={t("login.email")}
            testID="emailInput"
          />
        )}
      />
      {errors.email && (
        <Text style={styles.errorText}>{errors.email.message}</Text>
      )}
      <Text style={styles.title}>{t("login.password")}</Text>
      <Controller
        control={control}
        name="password"
        rules={{
          required: t("register.passwordRequired"),
          minLength: {
            value: 6,
            message: t("register.passwordMinLength"),
          },
        }}
        defaultValue=""
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={t("register.passwordPlaceholder")}
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
    color: "#333",
    fontSize: RFValue(14),
  },
});
