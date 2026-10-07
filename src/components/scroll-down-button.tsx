import { ArrowDownIcon } from "phosphor-react-native";
import { StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../constants/colors";

type ScrollDownButtonProps = Readonly<{
  backgroundColor?: string;
}>;

export function ScrollDownButton({ backgroundColor }: ScrollDownButtonProps) {
  return (
    <TouchableOpacity style={[styles.scrollDownButton, { backgroundColor }]}>
      <ArrowDownIcon color={colors.white} size={24} weight="fill" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  scrollDownButton: {
    width: 50,
    height: 50,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    left: 20,
  },
});
