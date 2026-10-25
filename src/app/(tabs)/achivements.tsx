import { AchievementCard } from "@/components/achievement-card";
import { CustomText } from "@/components/custom-text";
import { colors } from "@/constants/colors";
import { chapters } from "@/data/chapters";
import { quizzes } from "@/data/quizzes";
import { getCompletedQuizAchievementIds } from "@/storage/quiz-achievements";
import { router, useFocusEffect } from "expo-router";
import type { Icon } from "phosphor-react-native";
import { XIcon } from "phosphor-react-native";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

type Achievement = Readonly<{
  id: string;
  name: string;
  icon: Icon;
  isCompleted: boolean;
}>;

type AchievementSection = Readonly<{
  title: string;
  achievements: readonly Achievement[];
}>;

export default function AchievementsPage() {
  const [completedQuizAchievementIds, setCompletedQuizAchievementIds] =
    useState<readonly string[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      getCompletedQuizAchievementIds()
        .then((quizAchievementIds) => {
          if (isActive) {
            setCompletedQuizAchievementIds(quizAchievementIds);
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

  const achievementSections: readonly AchievementSection[] = quizzes.map(
    (quiz) => {
      const chapter = chapters.find((item) => item.id === quiz.chapterId);
      if (!chapter) {
        throw new Error(`Não foi possível encontrar o tema "${quiz.chapterId}".`);
      }

      return {
        title: quiz.title,
        achievements: [
          ...quiz.questions.map((question) => ({
            ...question.achievement,
            isCompleted: completedQuizAchievementIds.includes(
              question.achievement.id,
            ),
          })),
        ],
      };
    },
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
                    achievement.isCompleted;

                  if (!isCompleted) {
                    return (
                      <View key={achievement.id} style={styles.badgeItem}>
                        <AchievementCard isCompleted={false} size={80} />
                        <CustomText style={styles.badgeName}>
                          {achievement.name}
                        </CustomText>
                      </View>
                    );
                  }

                  return (
                    <View key={achievement.id} style={styles.badgeItem}>
                      <AchievementCard
                        isCompleted
                        completedIcon={achievement.icon}
                        size={80}
                      />
                      <CustomText style={styles.badgeName}>
                        {achievement.name}
                      </CustomText>
                    </View>
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
    top: 12,
    left: 18,
    zIndex: 1,
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
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
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
  },
  badgeItem: {
    width: 84,
    alignItems: "center",
    gap: 6,
  },
  badgeName: {
    color: colors.textPrimary,
    fontSize: 10,
    lineHeight: 14,
    textAlign: "center",
  },
});
