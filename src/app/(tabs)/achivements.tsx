import { AchievementCard } from "@/components/achievement-card";
import { CustomText } from "@/components/custom-text";
import { colors } from "@/constants/colors";
import { router } from "expo-router";
import type { Icon } from "phosphor-react-native";
import { HammerIcon, WindmillIcon, XIcon } from "phosphor-react-native";
import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { getCompletedChallengeIds } from "@/storage/challenges";

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
  const [completedChallengeIds, setCompletedChallengeIds] = useState<
    readonly string[]
  >([]);
  const [loadError, setLoadError] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      getCompletedChallengeIds()
        .then((ids) => {
          if (isActive) {
            setCompletedChallengeIds(ids);
            setLoadError(null);
          }
        })
        .catch((error: unknown) => {
          console.error("Não foi possível carregar as conquistas.", error);
          if (isActive) {
            setLoadError("Não foi possível carregar suas conquistas.");
          }
        });

      return () => {
        isActive = false;
      };
    }, []),
  );

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
        {loadError ? (
          <CustomText accessibilityRole="alert" style={styles.error}>
            {loadError}
          </CustomText>
        ) : null}
        <View style={styles.sections}>
          {achievementSections.map((section) => (
            <View key={section.title} style={styles.section}>
              <CustomText style={styles.sectionTitle}>
                {section.title}
              </CustomText>
              <View style={styles.badges}>
                {section.achievements.map((achievement) => {
                  const isCompleted =
                    achievement.isCompleted ||
                    completedChallengeIds.includes(achievement.id);

                  if (!isCompleted) {
                    return (
                      <AchievementCard
                        key={achievement.id}
                        isCompleted={false}
                        size={80}
                      />
                    );
                  }

                  return (
                    <AchievementCard
                      key={achievement.id}
                      isCompleted
                      completedIcon={
                        achievement.isCompleted ? achievement.icon : HammerIcon
                      }
                      size={80}
                    />
                  );
                })}
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
  error: {
    color: "#B42318",
    textAlign: "center",
    marginTop: 12,
    marginHorizontal: 24,
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
