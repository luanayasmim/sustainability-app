import { StyleSheet, TouchableOpacity, View } from "react-native";
import { colors } from "../constants/colors";
import { CustomText } from "./custom-text";

type ChapterCardProps = Readonly<{
  chapterIcon: React.ReactNode;
  title: string;
  description: string;
  backgroundColor: string;
  iconSize?: number;
  onPress?: () => void;
}>;

export function ChapterCard({
  chapterIcon,
  title,
  description,
  backgroundColor,
  iconSize = 80,
  onPress,
}: ChapterCardProps) {
  return (
    <TouchableOpacity
      accessibilityRole={onPress ? "button" : undefined}
      disabled={!onPress}
      onPress={onPress}
      style={styles.card}
    >
      <View
        style={[
          styles.icon,
          { backgroundColor, width: iconSize, height: iconSize },
        ]}
      >
        {chapterIcon}
      </View>
      <CustomText style={styles.title}>{title}</CustomText>
      <CustomText style={styles.description}>{description}</CustomText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
  },
  description: {
    fontSize: 12,
  },
});
