import { StyleSheet } from "react-native";
import { colors } from "../constants/colors";
import { CustomText } from "./custom-text";

export function Paragraph({
  children,
}: Readonly<{ children?: React.ReactNode }>) {
  return <CustomText style={styles.paragraph}>{children}</CustomText>;
}

const styles = StyleSheet.create({
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.textPrimary,
    fontFamily: "Poppins-Regular",
  },
});
