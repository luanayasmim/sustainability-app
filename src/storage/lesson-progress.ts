import AsyncStorage from "@react-native-async-storage/async-storage";

const CURRENT_LESSON_THEME_KEY = "sustainability-app:current-lesson-theme";

export async function getCurrentLessonThemeId(): Promise<string | null> {
  const themeId = await AsyncStorage.getItem(CURRENT_LESSON_THEME_KEY);

  if (themeId === null) {
    return null;
  }

  if (!themeId.trim()) {
    throw new Error("O tema salvo para continuar as lições está inválido.");
  }

  return themeId;
}

export async function saveCurrentLessonThemeId(themeId: string): Promise<void> {
  if (!themeId.trim()) {
    throw new Error("O identificador do tema não pode ficar vazio.");
  }

  await AsyncStorage.setItem(CURRENT_LESSON_THEME_KEY, themeId);
}
