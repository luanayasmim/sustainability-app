import { StyleSheet, TouchableOpacity, View } from "react-native";
import { colors } from "../constants/colors";
import { CustomText } from "./custom-text";

type ChapterCardProps = Readonly<{
  chapterIcon: React.ReactNode;
  title: string;
  description: string;
  backgroundColor: string;
  iconSize?: number;
}>;

export function ChapterCard({
  chapterIcon,
  title,
  description,
  backgroundColor,
  iconSize = 80,
}: ChapterCardProps) {
  return (
    <TouchableOpacity style={styles.card}>
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
  },
  description: {
    fontSize: 12,
  },
});
