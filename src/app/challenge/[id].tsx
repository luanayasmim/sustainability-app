import { CustomText } from "@/components/custom-text";
import { PrimaryButton } from "@/components/primary-button";
import { colors } from "@/constants/colors";
import { chapters } from "@/data/chapters";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeftIcon, TargetIcon, XIcon } from "phosphor-react-native";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

type ChallengeStage = "intro" | "steps";

export default function ChallengePage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const chapter = chapters.find((item) => item.id === id);
  const [stage, setStage] = useState<ChallengeStage>("intro");
  const [currentStep, setCurrentStep] = useState(0);

  const finishChallenge = () => {
    if (!chapter) {
      return;
    }

    const chapterIndex = chapters.findIndex((item) => item.id === chapter.id);
    const nextChapter = chapters[(chapterIndex + 1) % chapters.length];
    router.replace({
      pathname: "/(tabs)",
      params: { themeId: nextChapter.id },
    });
  };

  if (!chapter) {
    return (
      <View style={styles.notFound}>
        <CustomText style={styles.notFoundText}>
          Não foi possível encontrar este desafio.
        </CustomText>
        <PrimaryButton
          onPress={() => router.replace("/(tabs)")}
          title="Voltar ao início"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable
        accessibilityLabel="Fechar desafio"
        accessibilityRole="button"
        onPress={() => router.replace("/(tabs)")}
        style={styles.closeButton}
      >
        <XIcon color={colors.textPrimary} size={26} />
      </Pressable>

      {stage === "intro" ? (
        <View style={styles.intro}>
          <CustomText style={styles.title}>Desafio</CustomText>

          <View style={styles.objectiveCard}>
            <View style={styles.objectiveHeading}>
              <TargetIcon color={colors.coral} size={34} weight="bold" />
              <CustomText style={styles.objectiveTitle}>Objetivo</CustomText>
            </View>
            <CustomText style={styles.objectiveText}>
              {chapter.challenge.objective}
            </CustomText>
            <CustomText style={styles.introHint}>
              Você vai fazer essa atividade em 3 etapas, com a ajuda de um
              responsável.
            </CustomText>
          </View>

          <View style={styles.introFooter}>
            <PrimaryButton onPress={() => setStage("steps")} title="Começar" />
          </View>
        </View>
      ) : (
        <View style={styles.stepsScreen}>
          <ScrollView
            contentContainerStyle={styles.stepsContent}
            showsVerticalScrollIndicator={false}
          >
            <CustomText style={styles.stepsTitle}>
              Vamos fazer juntos!
            </CustomText>
            <CustomText style={styles.challengeObjective}>
              {chapter.challenge.objective}
            </CustomText>

            <View style={styles.materialsCard}>
              <CustomText style={styles.sectionTitle}>
                Separe os materiais
              </CustomText>
              {chapter.challenge.materials.map((material) => (
                <View key={material} style={styles.materialRow}>
                  <View style={styles.materialBullet} />
                  <CustomText style={styles.materialText}>
                    {material}
                  </CustomText>
                </View>
              ))}
            </View>

            <View style={styles.safetyCard}>
              <CustomText style={styles.safetyTitle}>
                Combinado de segurança
              </CustomText>
              <CustomText style={styles.safetyText}>
                {chapter.challenge.safetyNote}
              </CustomText>
            </View>

            <View style={styles.progressHeader}>
              <CustomText style={styles.progressText}>
                Etapa {currentStep + 1} de {chapter.challenge.steps.length}
              </CustomText>
              <CustomText style={styles.progressEncouragement}>
                {currentStep === 0
                  ? "Vamos começar!"
                  : currentStep === chapter.challenge.steps.length - 1
                    ? "Quase lá!"
                    : "Você está indo muito bem!"}
              </CustomText>
            </View>
            <View
              accessibilityLabel={`Etapa ${currentStep + 1} de ${chapter.challenge.steps.length}`}
              accessibilityRole="progressbar"
              accessibilityValue={{
                min: 1,
                max: chapter.challenge.steps.length,
                now: currentStep + 1,
              }}
              style={styles.progressTrack}
            >
              {chapter.challenge.steps.map((_, index) => (
                <View
                  key={`progress-${index}`}
                  style={[
                    styles.progressSegment,
                    index <= currentStep && styles.progressSegmentActive,
                  ]}
                />
              ))}
            </View>

            <View style={styles.stepCard}>
              <View style={styles.stepNumber}>
                <CustomText style={styles.stepNumberText}>
                  {currentStep + 1}
                </CustomText>
              </View>
              <CustomText style={styles.stepTitle}>
                {currentStep === 0
                  ? "Prepare"
                  : currentStep === chapter.challenge.steps.length - 1
                    ? "Confira e comemore"
                    : "Mãos à obra"}
              </CustomText>
              <CustomText style={styles.stepText}>
                {chapter.challenge.steps[currentStep]}
              </CustomText>
            </View>
          </ScrollView>
          <View style={styles.stepsFooter}>
            {currentStep > 0 ? (
              <Pressable
                accessibilityRole="button"
                onPress={() => setCurrentStep((step) => step - 1)}
                style={styles.backStepButton}
              >
                <ArrowLeftIcon color={colors.textPrimary} size={18} />
                <CustomText style={styles.backStepText}>
                  Etapa anterior
                </CustomText>
              </Pressable>
            ) : null}
            {currentStep < chapter.challenge.steps.length - 1 ? (
              <PrimaryButton
                onPress={() => setCurrentStep((step) => step + 1)}
                title="Próxima etapa"
              />
            ) : (
              <PrimaryButton
                onPress={finishChallenge}
                title="Finalizar desafio"
              />
            )}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  intro: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 36,
  },
  title: {
    color: colors.primary,
    fontFamily: "Poppins-Bold",
    fontSize: 30,
    lineHeight: 42,
    textAlign: "center",
  },
  objectiveCard: {
    width: "100%",
    maxWidth: 340,
    minHeight: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FFF9",
    borderRadius: 12,
    padding: 28,
    marginTop: 48,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 4,
  },
  objectiveHeading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 24,
  },
  objectiveTitle: {
    color: colors.textPrimary,
    fontFamily: "Poppins-Bold",
    fontSize: 22,
  },
  objectiveText: {
    color: colors.textPrimary,
    fontSize: 20,
    lineHeight: 30,
    textAlign: "center",
  },
  introHint: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    marginTop: 20,
  },
  introFooter: {
    alignItems: "center",
    margin: "auto",
    gap: 14,
  },
  stepsScreen: {
    flex: 1,
    paddingTop: 56,
  },
  stepsContent: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 16,
  },
  stepsTitle: {
    color: colors.primary,
    fontFamily: "Poppins-Bold",
    fontSize: 26,
    lineHeight: 36,
    textAlign: "center",
    marginBottom: 8,
  },
  challengeObjective: {
    color: colors.textPrimary,
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  materialsCard: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 18,
    marginBottom: 14,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontFamily: "Poppins-Bold",
    fontSize: 17,
    marginBottom: 10,
  },
  materialRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 7,
  },
  materialBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginTop: 7,
    marginRight: 10,
  },
  materialText: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 14,
    lineHeight: 21,
  },
  safetyCard: {
    backgroundColor: "#FFF1D6",
    borderRadius: 14,
    padding: 16,
    marginBottom: 22,
  },
  safetyTitle: {
    color: "#805B00",
    fontFamily: "Poppins-Bold",
    fontSize: 15,
    marginBottom: 6,
  },
  safetyText: {
    color: colors.textPrimary,
    fontSize: 13,
    lineHeight: 20,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  progressText: {
    color: colors.textPrimary,
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
  },
  progressEncouragement: {
    color: colors.primary,
    fontFamily: "Poppins-SemiBold",
    fontSize: 12,
  },
  progressTrack: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 14,
  },
  progressSegment: {
    flex: 1,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#D9DADB",
  },
  progressSegmentActive: {
    backgroundColor: colors.primary,
  },
  stepCard: {
    backgroundColor: "#F8FFF9",
    borderRadius: 16,
    padding: 20,
    marginBottom: 8,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  stepNumber: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    marginBottom: 14,
  },
  stepNumberText: {
    color: colors.white,
    fontFamily: "Poppins-Bold",
    fontSize: 20,
  },
  stepTitle: {
    color: colors.textPrimary,
    fontFamily: "Poppins-Bold",
    fontSize: 19,
    marginBottom: 10,
  },
  stepText: {
    color: colors.textPrimary,
    fontSize: 15,
    lineHeight: 24,
  },
  stepsFooter: {
    alignItems: "center",
    gap: 8,
    paddingTop: 10,
    paddingBottom: 24,
    backgroundColor: "#F0F0F0",
  },
  backStepButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  backStepText: {
    color: colors.textPrimary,
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    marginLeft: 6,
  },
  notFound: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 20,
  },
  notFoundText: {
    color: colors.textPrimary,
    fontSize: 16,
    textAlign: "center",
  },
});
