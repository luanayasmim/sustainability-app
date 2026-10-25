import { CustomText } from "@/components/custom-text";
import { AchievementCard } from "@/components/achievement-card";
import { PrimaryButton } from "@/components/primary-button";
import { colors } from "@/constants/colors";
import { quizzes } from "@/data/quizzes";
import { saveQuizAttempt } from "@/storage/quiz-attempts";
import { completeQuizAchievement } from "@/storage/quiz-achievements";
import { router, useLocalSearchParams } from "expo-router";
import {
  LightbulbFilamentIcon,
  TargetIcon,
  XCircleIcon,
  XIcon,
} from "phosphor-react-native";
import { useEffect, useRef, useState } from "react";
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
  const [hasStarted, setHasStarted] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const [showTip, setShowTip] = useState(false);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const [isSavingAchievement, setIsSavingAchievement] = useState(false);
  const [achievementError, setAchievementError] = useState<string | null>(null);
  const [attemptSaveError, setAttemptSaveError] = useState<string | null>(null);
  const [isSavingAttempt, setIsSavingAttempt] = useState(false);
  const isAdvancingRef = useRef(false);

  useEffect(() => {
    setQuestionIndex(0);
    setHasStarted(false);
    setSelectedOptions([]);
    setAnswers([]);
    setFinalScore(null);
    setShowTip(false);
    setValidationMessage(null);
    setIsSavingAchievement(false);
    setAchievementError(null);
    setAttemptSaveError(null);
    setIsSavingAttempt(false);
    isAdvancingRef.current = false;
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

  const advanceQuestion = async (isCorrect: boolean) => {
    if (isAdvancingRef.current) {
      return;
    }
    isAdvancingRef.current = true;

    if (isCorrect) {
      setIsSavingAchievement(true);
      setAchievementError(null);

      try {
        await completeQuizAchievement(question.achievement.id);
      } catch (error) {
        console.error("Não foi possível desbloquear a conquista da pergunta.", error);
        setAchievementError(
          "Não foi possível salvar a conquista. Tente responder novamente.",
        );
        setIsSavingAchievement(false);
        isAdvancingRef.current = false;
        return;
      }

      setIsSavingAchievement(false);
    }

    const nextAnswers = [...answers, isCorrect];
    setAnswers(nextAnswers);
    setSelectedOptions([]);
    setShowTip(false);
    setValidationMessage(null);

    if (questionIndex === totalQuestions - 1) {
      const correctAnswers = nextAnswers.filter(Boolean).length;
      const score = Math.round((correctAnswers / totalQuestions) * 100);
      setIsSavingAttempt(true);
      setAttemptSaveError(null);

      try {
        await saveQuizAttempt(quiz.chapterId, score);
      } catch (error) {
        console.error("Não foi possível salvar o resultado do quiz.", error);
        setAttemptSaveError(
          "Não foi possível salvar o resultado. Tente novamente.",
        );
      } finally {
        setIsSavingAttempt(false);
      }

      setFinalScore(score);
      isAdvancingRef.current = false;
      return;
    }

    setQuestionIndex((currentIndex) => currentIndex + 1);
    isAdvancingRef.current = false;
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

    void advanceQuestion(isCorrect);
  };

  const skipQuestion = () => void advanceQuestion(false);

  const toggleOption = (optionIndex: number) => {
    setValidationMessage(null);
    setAchievementError(null);
    setSelectedOptions((currentOptions) =>
      currentOptions.includes(optionIndex)
        ? currentOptions.filter((index) => index !== optionIndex)
        : [...currentOptions, optionIndex],
    );
  };

  const restartQuiz = () => {
    setQuestionIndex(0);
    setHasStarted(false);
    setSelectedOptions([]);
    setAnswers([]);
    setFinalScore(null);
    setShowTip(false);
    setAchievementError(null);
    setAttemptSaveError(null);
    isAdvancingRef.current = false;
  };

  const retrySaveAttempt = async () => {
    if (finalScore === null || isSavingAttempt) {
      return;
    }

    setIsSavingAttempt(true);
    setAttemptSaveError(null);

    try {
      await saveQuizAttempt(quiz.chapterId, finalScore);
    } catch (error) {
      console.error("Não foi possível salvar o resultado do quiz.", error);
      setAttemptSaveError(
        "Não foi possível salvar o resultado. Tente novamente.",
      );
    } finally {
      setIsSavingAttempt(false);
    }
  };

  if (isComplete) {
    const earnedAchievements = quiz.questions
      .filter((_, index) => answers[index])
      .map((item) => item.achievement);
    const earnedCount = earnedAchievements.length;
    const hasEarnedAchievement = earnedCount > 0;
    const badgeOffsets =
      earnedCount === 1 ? [56] : earnedCount === 2 ? [0, 100] : [0, 56, 112];

    return (
      <View style={styles.screen}>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Voltar para quizzes"
          onPress={() => router.replace("/(tabs)/quizzes")}
          style={styles.floatingCloseButton}
        >
          <XIcon size={24} color={colors.textPrimary} weight="regular" />
        </TouchableOpacity>
        <View style={styles.resultContent}>
          <CustomText style={styles.resultTitle}>
            {hasEarnedAchievement
              ? `Você desbloqueou\n${earnedCount === 1 ? "uma conquista!" : earnedCount === 2 ? "duas conquistas!" : "três conquistas!"}`
              : "Quiz concluído!"}
          </CustomText>
          {hasEarnedAchievement ? (
            <View style={styles.earnedBadges}>
              {earnedAchievements.map((achievement, index) => (
                <View
                  key={achievement.id}
                  style={[
                    styles.earnedBadge,
                    { left: badgeOffsets[index] },
                  ]}
                  accessibilityLabel={`Conquista desbloqueada: ${achievement.name}`}
                >
                  <AchievementCard
                    isCompleted
                    completedIcon={achievement.icon}
                    size={200}
                  />
                </View>
              ))}
            </View>
          ) : (
            <View style={[styles.resultIcon, styles.resultIconIncomplete]}>
              <XCircleIcon size={112} color={colors.white} weight="regular" />
            </View>
          )}
          <CustomText style={styles.resultDescription}>
            {earnedCount === totalQuestions
              ? "Você acertou todas as perguntas."
              : `Você acertou ${answers.filter(Boolean).length} de ${totalQuestions} perguntas.`}
          </CustomText>
          <CustomText
            style={[
              styles.resultScore,
              !hasEarnedAchievement && styles.resultScoreIncomplete,
            ]}
          >
            {finalScore}%
          </CustomText>
          {!hasEarnedAchievement ? (
            <CustomText style={styles.achievementName}>
              Acerte todas as perguntas para desbloquear as conquistas.
            </CustomText>
          ) : null}
          {attemptSaveError ? (
            <>
              <CustomText accessibilityRole="alert" style={styles.saveError}>
                {attemptSaveError}
              </CustomText>
              <TouchableOpacity
                accessibilityRole="button"
                disabled={isSavingAttempt}
                onPress={() => void retrySaveAttempt()}
                style={styles.retrySaveButton}
              >
                <CustomText style={styles.returnButtonText}>
                  {isSavingAttempt ? "Salvando..." : "Tentar salvar resultado"}
                </CustomText>
              </TouchableOpacity>
            </>
          ) : null}
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

  if (!hasStarted) {
    return (
      <View style={styles.screen}>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Voltar para quizzes"
          onPress={() => router.replace("/(tabs)/quizzes")}
          style={styles.floatingCloseButton}
        >
          <XIcon size={24} color={colors.textPrimary} weight="regular" />
        </TouchableOpacity>
        <ScrollView
          contentContainerStyle={styles.introContent}
          showsVerticalScrollIndicator={false}
        >
          <CustomText style={styles.introTitle}>
            Quiz: {quiz.title}
          </CustomText>
          <View style={styles.objectiveCard}>
            <View style={styles.objectiveHeading}>
              <TargetIcon color={colors.coral} size={34} weight="bold" />
              <CustomText style={styles.objectiveTitle}>Objetivo</CustomText>
            </View>
            <CustomText style={styles.objectiveText}>
              {quiz.objective}
            </CustomText>
          </View>
          <View style={styles.introButton}>
            <PrimaryButton
              onPress={() => setHasStarted(true)}
              title="Começar"
            />
          </View>
        </ScrollView>
      </View>
    );
  }

  const QuestionAchievementIcon = question.achievement.icon;

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
            disabled={isSavingAttempt}
            onPress={() => router.replace("/(tabs)/quizzes")}
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

        <View style={styles.questionHeading}>
          <View style={styles.questionIcon}>
            <QuestionAchievementIcon
              size={28}
              color={colors.primary}
              weight="fill"
            />
          </View>
          <CustomText style={styles.questionText}>
            {question.question}
          </CustomText>
        </View>

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

        {validationMessage || achievementError ? (
          <CustomText style={styles.validationMessage}>
            {validationMessage ?? achievementError}
          </CustomText>
        ) : null}

        <View style={styles.actions}>
          <PrimaryButton
            disabled={isSavingAchievement}
            onPress={continueQuiz}
            title={
              isSavingAchievement
                ? "Salvando conquista..."
                : questionIndex === totalQuestions - 1
                  ? "Finalizar"
                  : "Continuar"
            }
          />
          <TouchableOpacity
            accessibilityRole="button"
            disabled={isSavingAchievement}
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
  introContent: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: 90,
    paddingBottom: 40,
  },
  introTitle: {
    width: "90%",
    color: colors.primary,
    fontSize: 32,
    fontFamily: "Poppins-Bold",
    fontWeight: "bold",
    lineHeight: 42,
    textAlign: "center",
  },
  objectiveCard: {
    width: "72%",
    maxWidth: 340,
    minHeight: 300,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
    paddingVertical: 24,
    marginTop: 38,
    borderRadius: 12,
    backgroundColor: "#F9FFF9",
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 4,
  },
  objectiveHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 24,
  },
  objectiveTitle: {
    color: colors.textPrimary,
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    fontWeight: "bold",
  },
  objectiveText: {
    color: colors.textPrimary,
    fontSize: 20,
    lineHeight: 30,
    textAlign: "center",
  },
  introButton: {
    marginTop: 80,
  },
  progressHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
  },
  closeButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  floatingCloseButton: {
    position: "absolute",
    top: 12,
    left: 18,
    zIndex: 1,
    width: 44,
    height: 44,
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
    flex: 1,
    marginLeft: 14,
    color: "#000000",
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    fontWeight: "600",
    lineHeight: 24,
  },
  questionHeading: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    marginHorizontal: 30,
  },
  questionIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#E6F4E7",
    alignItems: "center",
    justifyContent: "center",
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
    paddingHorizontal: 32,
    paddingTop: 72,
  },
  resultIcon: {
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  resultIconIncomplete: {
    backgroundColor: colors.coral,
    marginTop: 14,
  },
  earnedBadges: {
    width: 312,
    height: 200,
    position: "relative",
    marginTop: 38,
  },
  earnedBadge: {
    position: "absolute",
    top: 0,
  },
  resultTitle: {
    color: colors.primary,
    fontSize: 32,
    fontFamily: "Poppins-Bold",
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 48,
  },
  resultDescription: {
    marginTop: 26,
    color: colors.textPrimary,
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
  },
  resultScore: {
    marginTop: 8,
    color: colors.primary,
    fontSize: 32,
    fontFamily: "Poppins-Bold",
    fontWeight: "bold",
  },
  resultScoreIncomplete: {
    color: colors.coral,
  },
  achievementName: {
    marginTop: 20,
    color: colors.textPrimary,
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
  },
  resultButton: {
    marginTop: 42,
  },
  returnButton: {
    marginTop: 4,
    padding: 8,
  },
  returnButtonText: {
    color: "#000000",
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    fontWeight: "600",
  },
  saveError: {
    color: colors.coral,
    fontSize: 13,
    textAlign: "center",
    marginTop: 12,
  },
  retrySaveButton: {
    paddingVertical: 8,
  },
});
