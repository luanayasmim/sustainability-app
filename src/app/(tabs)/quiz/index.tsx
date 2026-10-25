import { CustomText } from "@/components/custom-text";
import { PrimaryButton } from "@/components/primary-button";
import { colors } from "@/constants/colors";
import { quizzes } from "@/data/quizzes";
import { router, useLocalSearchParams } from "expo-router";
import {
  CheckCircleIcon,
  LightbulbFilamentIcon,
  XIcon,
} from "phosphor-react-native";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export default function QuizPage() {
  const { quizIndex: rawQuizIndex } = useLocalSearchParams<{
    quizIndex?: string;
  }>();
  const parsedQuizIndex =
    typeof rawQuizIndex === "string" ? Number(rawQuizIndex) : Number.NaN;
  const quiz =
    Number.isInteger(parsedQuizIndex) && parsedQuizIndex >= 0
      ? quizzes[parsedQuizIndex]
      : undefined;

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const [showTip, setShowTip] = useState(false);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);

  useEffect(() => {
    setQuestionIndex(0);
    setSelectedOptions([]);
    setAnswers([]);
    setFinalScore(null);
    setShowTip(false);
    setValidationMessage(null);
  }, [parsedQuizIndex]);

  if (!quiz) {
    return (
      <View style={styles.screen}>
        <View style={styles.messageContent}>
          <CustomText style={styles.messageTitle}>Quiz não encontrado</CustomText>
          <CustomText style={styles.messageDescription}>
            Volte à lista e escolha um quiz disponível para começar.
          </CustomText>
          <PrimaryButton
            onPress={() => router.replace("/(tabs)/quizzes")}
            title="Voltar para quizzes"
          />
        </View>
      </View>
    );
  }

  const question = quiz.questions[questionIndex];
  const totalQuestions = quiz.questions.length;
  const isComplete = finalScore !== null;
  const AchievementIcon = quiz.achievement.icon;

  const advanceQuestion = (isCorrect: boolean) => {
    const nextAnswers = [...answers, isCorrect];
    setAnswers(nextAnswers);
    setSelectedOptions([]);
    setShowTip(false);
    setValidationMessage(null);

    if (questionIndex === totalQuestions - 1) {
      const correctAnswers = nextAnswers.filter(Boolean).length;
      setFinalScore(Math.round((correctAnswers / totalQuestions) * 100));
      return;
    }

    setQuestionIndex((currentIndex) => currentIndex + 1);
  };

  const continueQuiz = () => {
    if (selectedOptions.length === 0) {
      setValidationMessage("Selecione ao menos uma alternativa ou pule a questão.");
      return;
    }

    setValidationMessage(null);
    const correctIndexes = question.options.flatMap((option, index) =>
      option.isCorrect ? [index] : [],
    );
    const isCorrect =
      selectedOptions.length === correctIndexes.length &&
      correctIndexes.every((index) => selectedOptions.includes(index));

    advanceQuestion(isCorrect);
  };

  const skipQuestion = () => advanceQuestion(false);

  const toggleOption = (optionIndex: number) => {
    setValidationMessage(null);
    setSelectedOptions((currentOptions) =>
      currentOptions.includes(optionIndex)
        ? currentOptions.filter((index) => index !== optionIndex)
        : [...currentOptions, optionIndex],
    );
  };

  const restartQuiz = () => {
    setQuestionIndex(0);
    setSelectedOptions([]);
    setAnswers([]);
    setFinalScore(null);
    setShowTip(false);
  };

  if (isComplete) {
    const hasEarnedAchievement = finalScore === 100;

    return (
      <View style={styles.screen}>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Voltar para quizzes"
          onPress={() => router.replace("/(tabs)/quizzes")}
          style={styles.closeButton}
        >
          <XIcon size={24} color={colors.textPrimary} weight="regular" />
        </TouchableOpacity>
        <View style={styles.resultContent}>
          <View
            style={[
              styles.resultIcon,
              hasEarnedAchievement
                ? styles.resultIconEarned
                : styles.resultIconIncomplete,
            ]}
          >
            {hasEarnedAchievement ? (
              <AchievementIcon
                size={62}
                color={colors.textPrimary}
                weight="fill"
              />
            ) : (
              <CheckCircleIcon
                size={62}
                color={colors.primary}
                weight="regular"
              />
            )}
          </View>
          <CustomText style={styles.resultTitle}>
            {hasEarnedAchievement ? "Parabéns!" : "Quiz concluído"}
          </CustomText>
          <CustomText style={styles.resultDescription}>
            Você acertou {answers.filter(Boolean).length} de {totalQuestions}{" "}
            perguntas.
          </CustomText>
          <CustomText style={styles.resultScore}>{finalScore}%</CustomText>
          <CustomText style={styles.achievementName}>
            {hasEarnedAchievement
              ? `Conquista desbloqueada: ${quiz.achievement.name}`
              : "Acerte todas as perguntas para desbloquear a conquista."}
          </CustomText>
          <View style={styles.resultButton}>
            <PrimaryButton onPress={restartQuiz} title="Refazer quiz" />
          </View>
          <TouchableOpacity
            accessibilityRole="button"
            onPress={() => router.replace("/(tabs)/quizzes")}
            style={styles.returnButton}
          >
            <CustomText style={styles.returnButtonText}>
              Voltar para quizzes
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.progressHeader}>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Sair do quiz"
            onPress={() => router.back()}
            style={styles.closeButton}
          >
            <XIcon size={24} color={colors.textPrimary} weight="regular" />
          </TouchableOpacity>
          <View
            accessibilityRole="progressbar"
            accessibilityValue={{
              min: 0,
              max: totalQuestions,
              now: questionIndex + 1,
            }}
            style={styles.progressTrack}
          >
            <View
              style={[
                styles.progressFill,
                { width: `${((questionIndex + 1) / totalQuestions) * 100}%` },
              ]}
            />
          </View>
        </View>

        <TouchableOpacity
          accessibilityRole="button"
          accessibilityState={{ expanded: showTip }}
          onPress={() => setShowTip((visible) => !visible)}
          style={styles.tipButton}
        >
          <LightbulbFilamentIcon
            size={24}
            color={colors.goldAccent}
            weight="fill"
          />
          <CustomText style={styles.tipLabel}>Dica</CustomText>
        </TouchableOpacity>
        {showTip && (
          <View style={styles.tipCard}>
            <CustomText style={styles.tipText}>{quiz.objective}</CustomText>
          </View>
        )}

        <CustomText style={styles.questionText}>{question.question}</CustomText>

        <View style={styles.optionsGrid}>
          {question.options.map((option, index) => {
            const isSelected = selectedOptions.includes(index);

            return (
              <TouchableOpacity
                key={`${questionIndex}-${option.option}`}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: isSelected }}
                onPress={() => toggleOption(index)}
                style={[
                  styles.option,
                  isSelected && styles.optionSelected,
                ]}
              >
                <CustomText
                  style={[
                    styles.optionText,
                    isSelected && styles.optionTextSelected,
                  ]}
                >
                  {option.option}
                </CustomText>
              </TouchableOpacity>
            );
          })}
        </View>

        {validationMessage ? (
          <CustomText style={styles.validationMessage}>
            {validationMessage}
          </CustomText>
        ) : null}

        <View style={styles.actions}>
          <PrimaryButton
            onPress={continueQuiz}
            title={questionIndex === totalQuestions - 1 ? "Finalizar" : "Continuar"}
          />
          <TouchableOpacity
            accessibilityRole="button"
            onPress={skipQuestion}
            style={styles.skipButton}
          >
            <CustomText style={styles.skipText}>Pular questão</CustomText>
          </TouchableOpacity>
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
  content: {
    paddingTop: 25,
    paddingBottom: 190,
  },
  progressHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
  },
  closeButton: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  progressTrack: {
    height: 8,
    flex: 1,
    marginLeft: 14,
    overflow: "hidden",
    borderRadius: 10,
    backgroundColor: "#CDCDCD",
  },
  progressFill: {
    height: "100%",
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
  tipButton: {
    alignSelf: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginRight: 33,
    gap: 8,
  },
  tipLabel: {
    color: colors.textPrimary,
    fontSize: 12,
    fontFamily: "Poppins-Bold",
    fontWeight: "bold",
  },
  tipCard: {
    alignSelf: "flex-end",
    maxWidth: 260,
    marginTop: 8,
    marginRight: 25,
    padding: 12,
    borderRadius: 12,
    backgroundColor: colors.white,
    elevation: 3,
  },
  tipText: {
    color: colors.textPrimary,
    fontSize: 12,
    lineHeight: 18,
  },
  questionText: {
    marginTop: 40,
    marginHorizontal: 40,
    color: "#000000",
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    fontWeight: "600",
    lineHeight: 24,
  },
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 25,
    marginTop: 20,
    marginHorizontal: 33,
  },
  option: {
    width: "46%",
    minHeight: 150,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(51, 51, 51, 0.5)",
    borderRadius: 15,
    backgroundColor: "transparent",
  },
  optionSelected: {
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: "#E6F4E7",
  },
  optionText: {
    color: "#000000",
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    fontWeight: "600",
    lineHeight: 24,
    textAlign: "center",
  },
  optionTextSelected: {
    color: colors.primary,
  },
  actions: {
    alignItems: "center",
    marginTop: 54,
  },
  skipButton: {
    marginTop: 25,
    padding: 4,
  },
  skipText: {
    color: "#000000",
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    fontWeight: "600",
    lineHeight: 24,
  },
  validationMessage: {
    marginTop: 12,
    marginHorizontal: 25,
    color: colors.coral,
    fontSize: 12,
    textAlign: "center",
  },
  messageContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
    gap: 18,
  },
  messageTitle: {
    color: colors.textPrimary,
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    fontWeight: "bold",
    textAlign: "center",
  },
  messageDescription: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
  },
  resultContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
  },
  resultIcon: {
    width: 120,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 60,
  },
  resultIconEarned: {
    backgroundColor: colors.goldAccent,
  },
  resultIconIncomplete: {
    backgroundColor: "#E6F4E7",
  },
  resultTitle: {
    marginTop: 24,
    color: colors.primary,
    fontSize: 28,
    fontFamily: "Poppins-Bold",
    fontWeight: "bold",
    textAlign: "center",
  },
  resultDescription: {
    marginTop: 8,
    color: colors.textPrimary,
    fontSize: 16,
    textAlign: "center",
  },
  resultScore: {
    marginTop: 8,
    color: colors.primary,
    fontSize: 36,
    fontFamily: "Poppins-Bold",
    fontWeight: "bold",
  },
  achievementName: {
    marginTop: 8,
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
  },
  resultButton: {
    marginTop: 30,
  },
  returnButton: {
    marginTop: 15,
    padding: 8,
  },
  returnButtonText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});
