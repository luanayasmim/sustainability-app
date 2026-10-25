import { CustomText } from "@/components/custom-text";
import { QuizAttemptCard } from "@/components/quiz-attempt-card";
import { colors } from "@/constants/colors";
import { quizzes } from "@/data/quizzes";
import { getQuizAttempts, type QuizAttempts } from "@/storage/quiz-attempts";
import { router, useFocusEffect } from "expo-router";
import type { Href } from "expo-router";
import { XIcon } from "phosphor-react-native";
import { useCallback, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export default function QuizzesPage() {
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempts>({});
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      setIsLoading(true);

      getQuizAttempts()
        .then((attempts) => {
          if (isActive) {
            setQuizAttempts(attempts);
            setLoadError(null);
            setIsLoading(false);
          }
        })
        .catch((error: unknown) => {
          console.error("Não foi possível carregar o histórico dos quizzes.", error);
          if (isActive) {
            setLoadError("Não foi possível carregar o histórico dos quizzes.");
            setIsLoading(false);
          }
        });

      return () => {
        isActive = false;
      };
    }, []),
  );

  const pendingQuizzes = quizzes.filter(
    (quiz) => quizAttempts[quiz.chapterId] === undefined,
  );
  const completedQuizzes = quizzes.filter(
    (quiz) => quizAttempts[quiz.chapterId] !== undefined,
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
        <CustomText style={styles.pageTitle}>Quizzes</CustomText>
        <CustomText style={styles.sectionTitle}>
          Quizzes pendentes
        </CustomText>
        {loadError ? (
          <CustomText accessibilityRole="alert" style={styles.error}>
            {loadError}
          </CustomText>
        ) : null}
        {isLoading ? (
          <CustomText style={styles.emptyMessage}>
            Carregando quizzes...
          </CustomText>
        ) : null}
        {!isLoading && !loadError && pendingQuizzes.length > 0 ? (
          pendingQuizzes.map((quiz) => {
            const index = quizzes.indexOf(quiz);

            return (
              <TouchableOpacity
                key={quiz.title}
                accessibilityRole="button"
                accessibilityLabel={`Iniciar ${quiz.title}`}
                activeOpacity={0.8}
                onPress={() =>
                  router.push(`${quiz.route}?quizIndex=${index}` as Href)
                }
                style={styles.quizCard}
              >
                <QuizAttemptCard title={quiz.title} titleColor={colors.blue} />
              </TouchableOpacity>
            );
          })
        ) : !isLoading && !loadError ? (
          <CustomText style={styles.emptyMessage}>
            Todos os quizzes foram concluídos.
          </CustomText>
        ) : null}
        {!isLoading && !loadError && completedQuizzes.length > 0 ? (
          <>
            <View style={styles.divider} />
            <CustomText style={styles.sectionTitle}>
              Quizzes concluídos
            </CustomText>
            {completedQuizzes.map((quiz) => {
              const index = quizzes.indexOf(quiz);

              return (
                <TouchableOpacity
                  key={quiz.title}
                  accessibilityRole="button"
                  accessibilityLabel={`Refazer ${quiz.title}, última tentativa ${quizAttempts[quiz.chapterId]} por cento`}
                  activeOpacity={0.8}
                  onPress={() =>
                    router.push(`${quiz.route}?quizIndex=${index}` as Href)
                  }
                  style={styles.quizCard}
                >
                  <QuizAttemptCard
                    lastAttemptPercentage={quizAttempts[quiz.chapterId]}
                    title={quiz.title}
                    titleColor={colors.primary}
                  />
                </TouchableOpacity>
              );
            })}
          </>
        ) : null}
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
  sectionTitle: {
    alignSelf: "flex-start",
    color: "#2E2E2E",
    fontSize: 18,
    fontFamily: "Poppins-Medium",
    lineHeight: 27,
    marginTop: 18,
    marginHorizontal: 24,
  },
  quizCard: {
    marginTop: 16,
    marginHorizontal: 19,
  },
  divider: {
    height: 2,
    backgroundColor: "#D9D9D9",
    marginTop: 20,
    marginHorizontal: 24,
  },
  emptyMessage: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: "center",
    marginTop: 18,
    marginHorizontal: 24,
  },
  error: {
    color: colors.coral,
    fontSize: 13,
    textAlign: "center",
    marginTop: 12,
    marginHorizontal: 24,
  },
});
