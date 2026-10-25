import { ArrowDownIcon, ArrowUpIcon } from "phosphor-react-native";
import { StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../constants/colors";

type ScrollDownButtonProps = Readonly<{
  backgroundColor: string;
  accessibilityLabel: string;
  pointsUp?: boolean;
  onPress: () => void;
}>;

export function ScrollDownButton({
  backgroundColor,
  accessibilityLabel,
  pointsUp = false,
  onPress,
}: ScrollDownButtonProps) {
  const ArrowIcon = pointsUp ? ArrowUpIcon : ArrowDownIcon;

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={[styles.scrollDownButton, { backgroundColor }]}
    >
      <ArrowIcon color={colors.white} size={24} weight="fill" />
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
