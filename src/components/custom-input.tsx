import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import { colors } from "../constants/colors";
import { CustomText } from "./custom-text";

type CustomInputProps = TextInputProps & {
  label: string;
  helperText?: string;
  error?: string;
  containerStyle?: object;
};

export function CustomInput({
  label,
  helperText,
  error,
  containerStyle,
  style,
  ...props
}: CustomInputProps) {
  const hasError = !!error;

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <CustomText style={styles.label}>{label}</CustomText> : null}

      <TextInput
        {...props}
        style={[styles.input, style, hasError && styles.inputError]}
        placeholderTextColor={colors.textMuted}
      />

      {helperText && !error ? (
        <CustomText style={styles.helperText}>{helperText}</CustomText>
      ) : null}

      {error ? <CustomText style={styles.errorText}>{error}</CustomText> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: colors.textPrimary,
  },
  input: {
    borderWidth: 2,
    borderColor: colors.textMuted,
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.textPrimary,
    backgroundColor: colors.surface,
  },
  inputError: {
    borderColor: colors.coral,
  },
  helperText: {
    marginTop: 6,
    fontSize: 12,
    color: colors.textSecondary,
  },
  errorText: {
    marginTop: 6,
    fontSize: 12,
    color: colors.coral,
  },
});
