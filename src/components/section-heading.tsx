import { StyleSheet, View } from "react-native";
import { colors } from "../constants/colors";
import { CustomText } from "./custom-text";

type SectionHeadingProps = Readonly<{
  children?: Readonly<React.ReactNode>;
  backgroundColor: Readonly<string>;
}>;

export function SectionHeading({
  children,
  backgroundColor,
}: SectionHeadingProps) {
  return (
    <View style={[styles.headingContainer, { backgroundColor }]}>
      <CustomText style={styles.title}>{children}</CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  headingContainer: {
    marginTop: 20,
    height: 80,
    width: 343,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: colors.textOnColor,
    fontSize: 20,
    fontFamily: "Poppins-Bold",
  },
});
