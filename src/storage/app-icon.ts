import { requireOptionalNativeModule } from "expo-modules-core";
import { Platform } from "react-native";
import { getActiveQuizIndex } from "@/data/quizzes";
import { getCompletedQuizAchievementIds } from "@/storage/quiz-achievements";

type AlternateAppIconsModule = Readonly<{
  supportsAlternateIcons: boolean;
  getAppIconName: () => string | null;
  setAlternateAppIcon: (name: string | null) => Promise<string | null>;
}>;

const appIconModule =
  requireOptionalNativeModule<AlternateAppIconsModule>("ExpoAlternateAppIcons");

export async function syncAppIconWithQuizProgress(): Promise<void> {
  if (
    Platform.OS !== "ios" ||
    !appIconModule?.supportsAlternateIcons
  ) {
    return;
  }

  const completedAchievementIds = await getCompletedQuizAchievementIds();
  const activeQuizIndex = getActiveQuizIndex(completedAchievementIds);
  const nextIconName =
    activeQuizIndex === 0 ? null : `Icon${activeQuizIndex + 1}`;

  if (appIconModule.getAppIconName() !== nextIconName) {
    await appIconModule.setAlternateAppIcon(nextIconName);
  }
}
