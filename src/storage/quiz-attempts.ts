import AsyncStorage from "@react-native-async-storage/async-storage";

const QUIZ_ATTEMPTS_KEY = "sustainability-app:quiz-attempts";

export type QuizAttempts = Readonly<Record<string, number>>;

function isQuizAttempts(value: unknown): value is QuizAttempts {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    Object.entries(value).every(
      ([quizId, score]) =>
        quizId.trim().length > 0 &&
        typeof score === "number" &&
        Number.isInteger(score) &&
        score >= 0 &&
        score <= 100,
    )
  );
}

export async function getQuizAttempts(): Promise<QuizAttempts> {
  const storedAttempts = await AsyncStorage.getItem(QUIZ_ATTEMPTS_KEY);

  if (storedAttempts === null) {
    return {};
  }

  const parsedAttempts: unknown = JSON.parse(storedAttempts);

  if (!isQuizAttempts(parsedAttempts)) {
    throw new Error("O histórico de tentativas dos quizzes está em formato inválido.");
  }

  return parsedAttempts;
}

export async function saveQuizAttempt(
  quizId: string,
  percentage: number,
): Promise<void> {
  if (
    !quizId.trim() ||
    !Number.isInteger(percentage) ||
    percentage < 0 ||
    percentage > 100
  ) {
    throw new Error("Os dados da tentativa do quiz são inválidos.");
  }

  const attempts = await getQuizAttempts();
  await AsyncStorage.setItem(
    QUIZ_ATTEMPTS_KEY,
    JSON.stringify({ ...attempts, [quizId]: percentage }),
  );
}
