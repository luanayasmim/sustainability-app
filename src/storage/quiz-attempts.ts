import AsyncStorage from "@react-native-async-storage/async-storage";

const QUIZ_ATTEMPTS_KEY = "sustainability-app:quiz-attempts";

export type QuizAttempt = Readonly<{
  percentage: number;
  correctAnswers: number | null;
  totalQuestions: number;
  attemptCount: number;
}>;

export type QuizAttempts = Readonly<Record<string, QuizAttempt>>;

function isQuizAttempts(value: unknown): value is QuizAttempts {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    Object.entries(value).every(
      ([quizId, attempt]) =>
        quizId.trim().length > 0 &&
        typeof attempt === "object" &&
        attempt !== null &&
        typeof attempt.percentage === "number" &&
        Number.isInteger(attempt.percentage) &&
        attempt.percentage >= 0 &&
        attempt.percentage <= 100 &&
        (attempt.correctAnswers === null ||
          (Number.isInteger(attempt.correctAnswers) &&
            attempt.correctAnswers >= 0)) &&
        Number.isInteger(attempt.totalQuestions) &&
        attempt.totalQuestions >= 0 &&
        Number.isInteger(attempt.attemptCount) &&
        attempt.attemptCount >= 1,
    )
  );
}

function migrateLegacyQuizAttempts(value: unknown): QuizAttempts | null {
  if (
    typeof value !== "object" ||
    value === null ||
    Array.isArray(value)
  ) {
    return null;
  }

  const entries = Object.entries(value);
  if (
    !entries.every(
      ([quizId, percentage]) =>
        quizId.trim().length > 0 &&
        typeof percentage === "number" &&
        Number.isInteger(percentage) &&
        percentage >= 0 &&
        percentage <= 100,
    )
  ) {
    return null;
  }

  return Object.fromEntries(
    entries.map(([quizId, percentage]) => [
      quizId,
      {
        percentage,
        correctAnswers: null,
        totalQuestions: 0,
        attemptCount: 1,
      },
    ]),
  );
}

export async function getQuizAttempts(): Promise<QuizAttempts> {
  const storedAttempts = await AsyncStorage.getItem(QUIZ_ATTEMPTS_KEY);

  if (storedAttempts === null) {
    return {};
  }

  const parsedAttempts: unknown = JSON.parse(storedAttempts);

  if (isQuizAttempts(parsedAttempts)) {
    return parsedAttempts;
  }

  const migratedAttempts = migrateLegacyQuizAttempts(parsedAttempts);
  if (!migratedAttempts) {
    throw new Error("O histórico de tentativas dos quizzes está em formato inválido.");
  }

  await AsyncStorage.setItem(
    QUIZ_ATTEMPTS_KEY,
    JSON.stringify(migratedAttempts),
  );
  return migratedAttempts;
}

export async function saveQuizAttempt(
  quizId: string,
  correctAnswers: number,
  totalQuestions: number,
): Promise<void> {
  if (
    !quizId.trim() ||
    !Number.isInteger(correctAnswers) ||
    !Number.isInteger(totalQuestions) ||
    totalQuestions < 1 ||
    correctAnswers < 0 ||
    correctAnswers > totalQuestions
  ) {
    throw new Error("Os dados da tentativa do quiz são inválidos.");
  }

  const attempts = await getQuizAttempts();
  const previousAttempt = attempts[quizId];
  await AsyncStorage.setItem(
    QUIZ_ATTEMPTS_KEY,
    JSON.stringify({
      ...attempts,
      [quizId]: {
        percentage: Math.round((correctAnswers / totalQuestions) * 100),
        correctAnswers,
        totalQuestions,
        attemptCount: (previousAttempt?.attemptCount ?? 0) + 1,
      },
    }),
  );
}
