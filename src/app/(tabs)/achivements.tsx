import { AchievementCard } from "@/components/achievement-card";
import { CustomText } from "@/components/custom-text";
import { colors } from "@/constants/colors";
import { router } from "expo-router";
import type { Icon } from "phosphor-react-native";
import { WindmillIcon, XIcon } from "phosphor-react-native";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

type Achievement = Readonly<
  | { id: string; isCompleted: false }
  | { id: string; isCompleted: true; icon: Icon }
>;

type AchievementSection = Readonly<{
  title: string;
  achievements: readonly Achievement[];
}>;

const achievementSections: readonly AchievementSection[] = [
  {
    title: "Entendendo a Reciclagem",
    achievements: [
      { id: "recycling-basics", isCompleted: true, icon: WindmillIcon },
      { id: "recycling-sorting", isCompleted: false },
      { id: "recycling-challenge", isCompleted: false },
    ],
  },
  {
    title: "A importância da Água",
    achievements: [
      { id: "water-cycle", isCompleted: false },
      { id: "water-conservation", isCompleted: false },
      { id: "water-challenge", isCompleted: false },
    ],
  },
  {
    title: "O poder da Energia",
    achievements: [
      { id: "energy-sources", isCompleted: false },
      { id: "renewable-energy", isCompleted: false },
      { id: "energy-challenge", isCompleted: false },
    ],
  },
  {
    title: "Consumo Consciente",
    achievements: [
      { id: "conscious-consumption", isCompleted: false },
      { id: "reuse-and-repair", isCompleted: false },
      { id: "consumption-challenge", isCompleted: false },
    ],
  },
];

export default function AchievementsPage() {
  return (
    <View style={styles.screen}>
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Voltar"
        onPress={() => router.back()}
        style={styles.closeButton}
      >
        <XIcon size={24} color={colors.textPrimary} weight="regular" />
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <CustomText style={styles.pageTitle}>Minhas Conquistas</CustomText>
        <View style={styles.sections}>
          {achievementSections.map((section) => (
            <View key={section.title} style={styles.section}>
              <CustomText style={styles.sectionTitle}>
                {section.title}
              </CustomText>
              <View style={styles.badges}>
                {section.achievements.map((achievement) =>
                  achievement.isCompleted ? (
                    <AchievementCard
                      key={achievement.id}
                      isCompleted
                      completedIcon={achievement.icon}
                      size={80}
                    />
                  ) : (
                    <AchievementCard
                      key={achievement.id}
                      isCompleted={false}
                      size={80}
                    />
                  )
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  closeButton: {
    position: "absolute",
    top: 25,
    left: 25,
    zIndex: 1,
  },
  content: {
    paddingTop: 65,
    paddingBottom: 24,
  },
  pageTitle: {
    alignSelf: "center",
    color: colors.primary,
    fontSize: 32,
    fontFamily: "Poppins-Bold",
    fontWeight: "bold",
    lineHeight: 48,
  },
  sections: {
    marginTop: 25,
    paddingHorizontal: 25,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontFamily: "Poppins-Medium",
    lineHeight: 27,
    marginBottom: 17,
  },
  badges: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 26,
  },
});
