import { BottomSheet } from "@/components/bottom-sheet";
import { CustomInput } from "@/components/custom-input";
import { CustomText } from "@/components/custom-text";
import { PrimaryButton } from "@/components/primary-button";
import { colors } from "@/constants/colors";
import { getActiveQuizIndex, quizzes } from "@/data/quizzes";
import { getCompletedQuizAchievementIds } from "@/storage/quiz-achievements";
import { getUserName, saveUserName } from "@/storage/user";
import { router, useFocusEffect } from "expo-router";
import { PencilSimpleIcon, XIcon } from "phosphor-react-native";
import { useCallback, useEffect, useState } from "react";
import CapiMission1 from "../../../assets/images/capi-mission1.svg";
import CapiMission2 from "../../../assets/images/capi-mission2.svg";
import CapiMission3 from "../../../assets/images/capi-mission3.svg";
import CapiMission4 from "../../../assets/images/capi-mission4.svg";
import Shield1 from "../../../assets/images/shield1.svg";
import Shield2 from "../../../assets/images/shield2.svg";
import Shield3 from "../../../assets/images/shield3.svg";
import Shield4 from "../../../assets/images/shield4.svg";
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const missionCharacters = [
  CapiMission1,
  CapiMission2,
  CapiMission3,
  CapiMission4,
] as const;

const missionShields = [Shield1, Shield2, Shield3, Shield4] as const;

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [editedName, setEditedName] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isSavingName, setIsSavingName] = useState(false);
  const [completedQuizAchievementIds, setCompletedQuizAchievementIds] =
    useState<readonly string[]>([]);
  const [achievementLoadError, setAchievementLoadError] = useState<
    string | null
  >(null);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      getCompletedQuizAchievementIds()
        .then((achievementIds) => {
          if (isActive) {
            setCompletedQuizAchievementIds(achievementIds);
            setAchievementLoadError(null);
          }
        })
        .catch((error: unknown) => {
          console.error("Não foi possível carregar o progresso dos quizzes.", error);
          if (isActive) {
            setAchievementLoadError(
              "Não foi possível carregar seu progresso nos quizzes.",
            );
          }
        });

      return () => {
        isActive = false;
      };
    }, []),
  );

  useEffect(() => {
    let isActive = true;

    getUserName()
      .then((savedName) => {
        if (isActive) {
          setName(savedName ?? "");
          setEditedName(savedName ?? "");
        }
      })
      .catch(() => {
        if (isActive) {
          setNameError(true);
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

  const saveEditedName = async () => {
    if (isSavingName) {
      return;
    }

    const normalizedName = editedName.trim();

    if (!normalizedName) {
      setSaveError("O nome não pode ficar vazio.");
      return;
    }

    setIsSavingName(true);
    setSaveError(null);

    try {
      await saveUserName(normalizedName);
      setName(normalizedName);
      setEditedName(normalizedName);
      setIsEditingName(false);
      Keyboard.dismiss();
    } catch {
      setSaveError("Não foi possível salvar o nome. Tente novamente.");
    } finally {
      setIsSavingName(false);
    }
  };

  const cancelNameEdit = () => {
    if (isSavingName) {
      return;
    }

    setEditedName(name);
    setSaveError(null);
    setIsEditingName(false);
    Keyboard.dismiss();
  };

  const activeQuizIndex = getActiveQuizIndex(completedQuizAchievementIds);
  const isAllQuizzesComplete = quizzes.every((quiz) =>
    quiz.questions.every((question) =>
      completedQuizAchievementIds.includes(question.achievement.id),
    ),
  );
  const profileQuiz = quizzes[activeQuizIndex];
  const completedQuestionCount = profileQuiz.questions.filter((question) =>
    completedQuizAchievementIds.includes(question.achievement.id),
  ).length;
  const profileQuizIndex = quizzes.indexOf(profileQuiz);
  const ProfileCharacter = missionCharacters[profileQuizIndex];
  const ProfileShield = missionShields[profileQuizIndex];

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
        <View style={styles.nameRow}>
          <>
            <CustomText numberOfLines={1} style={styles.name}>
              {nameError ? "Erro ao carregar perfil" : name}
            </CustomText>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="Editar nome"
              onPress={() => {
                setEditedName(name);
                setSaveError(null);
                setIsEditingName(true);
              }}
              style={styles.editButton}
            >
              <PencilSimpleIcon
                size={32}
                color={colors.primary}
                weight="fill"
              />
            </TouchableOpacity>
          </>
        </View>
        {saveError && !isEditingName ? (
          <CustomText style={styles.saveError}>{saveError}</CustomText>
        ) : null}

        <View
          accessibilityLabel={`Personagem da missão: ${profileQuiz.title}`}
          accessibilityRole="image"
          style={styles.avatar}
        >
          <ProfileCharacter width={111} height={150} />
        </View>

        <CustomText style={styles.missionTitle}>Missão</CustomText>
        <CustomText style={styles.missionDescription}>
          {isAllQuizzesComplete
            ? "Parabéns! Você concluiu os quizzes de todos os temas e conquistou todas as badges."
            : profileQuiz.profileAchievement.mission}
        </CustomText>
        <CustomText style={styles.missionProgress}>
          {achievementLoadError ??
            `Progresso: ${completedQuestionCount} de ${profileQuiz.questions.length} questões conquistadas`}
        </CustomText>

        <View style={styles.divider} />

        <CustomText
          style={[
            styles.achievementTitle,
            { color: profileQuiz.profileAchievement.color },
          ]}
        >
          {profileQuiz.profileAchievement.title}
        </CustomText>
        <View
          accessibilityLabel={`Badge ${profileQuiz.profileAchievement.title}`}
          accessibilityRole="image"
          style={styles.shield}
        >
          <ProfileShield width={88} height={88} />
        </View>
      </ScrollView>

      <BottomSheet
        onClose={cancelNameEdit}
        title="Editar nome"
        visible={isEditingName}
      >
        <View style={styles.editForm}>
          <CustomInput
            accessibilityLabel="Digite seu nome"
            autoCapitalize="words"
            autoComplete="name"
            autoFocus
            editable={!isSavingName}
            error={saveError ?? undefined}
            label="Nome"
            onChangeText={(value) => {
              setEditedName(value);
              setSaveError(null);
            }}
            onSubmitEditing={() => void saveEditedName()}
            placeholder="Digite seu nome"
            returnKeyType="done"
            value={editedName}
          />
          <PrimaryButton
            disabled={isSavingName}
            onPress={() => void saveEditedName()}
            title={isSavingName ? "Salvando..." : "Salvar"}
          />
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Cancelar edição do nome"
            disabled={isSavingName}
            onPress={cancelNameEdit}
            style={styles.cancelButton}
          >
            <CustomText style={styles.cancelButtonText}>Cancelar</CustomText>
          </TouchableOpacity>
        </View>
      </BottomSheet>
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
    alignItems: "center",
    paddingTop: 59,
    paddingBottom: 24,
  },
  nameRow: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    height: 48,
  },
  name: {
    flexShrink: 1,
    color: colors.primary,
    fontSize: 32,
    fontFamily: "Poppins-Bold",
    fontWeight: "bold",
    lineHeight: 48,
  },
  editButton: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 32,
    minHeight: 40,
  },
  editForm: {
    alignItems: "center",
  },
  cancelButton: {
    marginTop: 16,
    padding: 8,
  },
  cancelButtonText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  saveError: {
    marginTop: 4,
    color: colors.coral,
    fontSize: 12,
  },
  avatar: {
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  missionTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    fontWeight: "600",
    lineHeight: 27,
    marginTop: 38,
  },
  missionDescription: {
    width: "74.55%",
    color: colors.textPrimary,
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
    marginTop: 14,
  },
  missionProgress: {
    width: "80%",
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
    marginTop: 8,
  },
  divider: {
    width: "89.06%",
    height: 2,
    backgroundColor: "#D9D9D9",
    marginTop: 49,
  },
  achievementTitle: {
    color: colors.primary,
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    fontWeight: "bold",
    lineHeight: 36,
    textAlign: "center",
    marginTop: 10,
  },
  shield: {
    width: 88,
    height: 88,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
});
