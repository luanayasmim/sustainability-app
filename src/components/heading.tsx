import { StyleSheet } from "react-native";
import { colors } from "../constants/colors";
import { CustomText } from "./custom-text";

export function Heading({
  children,
}: Readonly<{ children?: React.ReactNode }>) {
  return <CustomText style={styles.heading}>{children}</CustomText>;
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
    color: colors.primary,
  },
});
