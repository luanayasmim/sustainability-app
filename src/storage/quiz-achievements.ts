import AsyncStorage from "@react-native-async-storage/async-storage";

const COMPLETED_QUIZ_ACHIEVEMENTS_KEY =
  "sustainability-app:completed-quiz-achievements";

export async function getCompletedQuizAchievementIds(): Promise<
  readonly string[]
> {
  const storedIds = await AsyncStorage.getItem(
    COMPLETED_QUIZ_ACHIEVEMENTS_KEY,
  );

  if (storedIds === null) {
    return [];
  }

  const parsedIds: unknown = JSON.parse(storedIds);

  if (
    !Array.isArray(parsedIds) ||
    !parsedIds.every((id): id is string => typeof id === "string")
  ) {
    throw new Error("A lista de conquistas dos quizzes está em formato inválido.");
  }

  return parsedIds;
}

export async function completeQuizAchievement(id: string): Promise<void> {
  if (!id.trim()) {
    throw new Error("O identificador da conquista não pode ficar vazio.");
  }

  const completedIds = new Set(await getCompletedQuizAchievementIds());
  completedIds.add(id);

  await AsyncStorage.setItem(
    COMPLETED_QUIZ_ACHIEVEMENTS_KEY,
    JSON.stringify([...completedIds]),
  );
}
