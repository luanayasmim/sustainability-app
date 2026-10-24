import { StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../constants/colors";
import { CustomText } from "./custom-text";

type PrimaryButtonProps = Readonly<{
  onPress: () => void;
  title: string;
  backgroundColor?: string;
}>;

export function PrimaryButton({
  onPress,
  title,
  backgroundColor = colors.primary,
}: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }]}
      onPress={onPress}
    >
      <CustomText style={styles.buttonText}>{title}</CustomText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 13,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    height: 50,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});
