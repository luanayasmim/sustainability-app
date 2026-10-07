import { StyleSheet, TouchableOpacity, View } from "react-native";
import { colors } from "../constants/colors";
import { CustomText } from "./custom-text";

type ChapterCardProps = Readonly<{
  chapterIcon: React.ReactNode;
  title: string;
  description: string;
  backgroundColor: string;
}>;

export function ChapterCard({
  chapterIcon,
  title,
  description,
  backgroundColor,
}: ChapterCardProps) {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={[styles.icon, { backgroundColor }]}>{chapterIcon}</View>
      <CustomText style={styles.title}>{title}</CustomText>
      <CustomText style={styles.description}>{description}</CustomText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  icon: {
    backgroundColor: colors.primary,
    width: 80,
    height: 80,
    borderRadius: 20,
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
