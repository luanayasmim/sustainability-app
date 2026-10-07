import type { Icon } from "phosphor-react-native";
import { LockKeyIcon } from "phosphor-react-native";
import { StyleSheet, View } from "react-native";
import { colors } from "../constants/colors";

type AchievementCardProps =
  | Readonly<{
      isCompleted: false;
    }>
  | Readonly<{
      isCompleted: true;
      completedIcon: Icon;
      completedBackgroundColor: string;
      completedIconColor: string;
    }>;

export function AchievementCard(props: AchievementCardProps) {
  if (!props.isCompleted) {
    return (
      <View style={[styles.card, styles.cardUncompleted]}>
        <LockKeyIcon size={32} color={colors.textPrimary} weight="fill" />
      </View>
    );
  }

  const CompletedIcon = props.completedIcon;

  return (
    <View
      style={[styles.card, { backgroundColor: props.completedBackgroundColor }]}
    >
      <CompletedIcon size={32} color={props.completedIconColor} weight="bold" />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 100,
    padding: 10,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardUncompleted: {
    backgroundColor: colors.achievementUncompleted,
  },
});
