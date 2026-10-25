import AsyncStorage from "@react-native-async-storage/async-storage";

const COMPLETED_CHALLENGES_KEY = "sustainability-app:completed-challenges";

export async function getCompletedChallengeIds(): Promise<readonly string[]> {
  const storedIds = await AsyncStorage.getItem(COMPLETED_CHALLENGES_KEY);

  if (storedIds === null) {
    return [];
  }

  const parsedIds: unknown = JSON.parse(storedIds);

  if (
    !Array.isArray(parsedIds) ||
    !parsedIds.every((id): id is string => typeof id === "string")
  ) {
    throw new Error("A lista de desafios concluídos está em formato inválido.");
  }

  return parsedIds;
}

export async function completeChallenge(id: string): Promise<void> {
  if (!id.trim()) {
    throw new Error("O identificador do desafio não pode ficar vazio.");
  }

  const completedIds = new Set(await getCompletedChallengeIds());
  completedIds.add(id);

  await AsyncStorage.setItem(
    COMPLETED_CHALLENGES_KEY,
    JSON.stringify([...completedIds]),
  );
}
