import { StyleSheet } from "react-native";
import { colors } from "../constants/colors";
import { CustomText } from "./custom-text";

export function Title({ children }: Readonly<{ children?: React.ReactNode }>) {
  return <CustomText style={styles.heading}>{children}</CustomText>;
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
    color: colors.textPrimary,
  },
});
