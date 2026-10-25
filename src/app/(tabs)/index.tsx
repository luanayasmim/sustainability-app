import { LearningSection } from "@/components/learning-section";
import { ScrollDownButton } from "@/components/scroll-down-button";
import { CustomText } from "@/components/custom-text";
import { colors } from "@/constants/colors";
import {
  getCurrentLessonThemeId,
  saveCurrentLessonThemeId,
} from "@/storage/lesson-progress";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

const themes = [
  { id: "reciclagem", title: "Entendendo Reciclagem", color: colors.primary },
  { id: "agua", title: "A importância da Água", color: colors.blue },
  { id: "energia", title: "O poder da Energia", color: colors.gold },
  {
    id: "consumo-consciente",
    title: "Consumo Consciente",
    color: colors.coral,
  },
] as const;

export default function HomePage() {
  const { themeId } = useLocalSearchParams<{ themeId?: string }>();
  const scrollViewRef = useRef<ScrollView>(null);
  const activeThemeIndexRef = useRef(0);
  const savedThemeIdRef = useRef<string | null>(null);
  const [sectionOffsets, setSectionOffsets] = useState<number[]>([]);
  const [activeThemeIndex, setActiveThemeIndex] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [savedThemeId, setSavedThemeId] = useState<string | null>(null);
  const [isProgressLoaded, setIsProgressLoaded] = useState(false);
  const [progressError, setProgressError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    getCurrentLessonThemeId()
      .then((storedThemeId) => {
        if (isActive) {
          savedThemeIdRef.current = storedThemeId;
          setSavedThemeId(storedThemeId);
          setIsProgressLoaded(true);
          setProgressError(null);
        }
      })
      .catch((error: unknown) => {
        console.error("Não foi possível carregar o progresso das lições.", error);
        if (isActive) {
          setIsProgressLoaded(true);
          setProgressError("Não foi possível salvar seu progresso das lições.");
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

  const persistTheme = (index: number) => {
    const nextThemeId = themes[index]?.id;
    if (!nextThemeId || nextThemeId === savedThemeIdRef.current) {
      return;
    }

    savedThemeIdRef.current = nextThemeId;
    setSavedThemeId(nextThemeId);
    saveCurrentLessonThemeId(nextThemeId).then(
      () => setProgressError(null),
      (error: unknown) => {
        console.error("Não foi possível salvar o progresso das lições.", error);
        if (savedThemeIdRef.current === nextThemeId) {
          savedThemeIdRef.current = null;
          setSavedThemeId(null);
        }
        setProgressError("Não foi possível salvar seu progresso das lições.");
      },
    );
  };

  useEffect(() => {
    if (!isProgressLoaded) {
      return;
    }

    const targetThemeId = themeId ?? savedThemeId;
    if (!targetThemeId) {
      return;
    }

    const targetThemeIndex = themes.findIndex(
      (theme) => theme.id === targetThemeId,
    );
    if (targetThemeIndex < 0) {
      return;
    }

    const targetThemeOffset = sectionOffsets[targetThemeIndex];

    if (targetThemeOffset === undefined) {
      return;
    }

    scrollViewRef.current?.scrollTo({ y: targetThemeOffset, animated: false });
    activeThemeIndexRef.current = targetThemeIndex;
    setActiveThemeIndex(targetThemeIndex);
    persistTheme(targetThemeIndex);
    if (themeId) {
      router.setParams({ themeId: undefined });
    }
  }, [isProgressLoaded, savedThemeId, sectionOffsets, themeId]);

  const handleScroll = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const activationLine = nativeEvent.contentOffset.y + viewportHeight * 0.3;
    let visibleThemeIndex = 0;

    sectionOffsets.forEach((offset, index) => {
      if (offset <= activationLine) {
        visibleThemeIndex = index;
      }
    });

    if (activeThemeIndexRef.current !== visibleThemeIndex) {
      activeThemeIndexRef.current = visibleThemeIndex;
      setActiveThemeIndex(visibleThemeIndex);
      if (isProgressLoaded) {
        persistTheme(visibleThemeIndex);
      }
    }
  };

  const goToNextTheme = () => {
    const nextThemeIndex = (activeThemeIndex + 1) % themes.length;
    const nextThemeOffset = sectionOffsets[nextThemeIndex];

    if (nextThemeOffset !== undefined) {
      scrollViewRef.current?.scrollTo({ y: nextThemeOffset, animated: true });
      activeThemeIndexRef.current = nextThemeIndex;
      setActiveThemeIndex(nextThemeIndex);
      persistTheme(nextThemeIndex);
    }
  };

  return (
    <View
      style={styles.container}
      onLayout={(event) => setViewportHeight(event.nativeEvent.layout.height)}
    >
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {themes.map((theme, index) => (
          <View
            key={theme.id}
            onLayout={(event) => {
              const offset = event.nativeEvent.layout.y;
              setSectionOffsets((offsets) => {
                const nextOffsets = [...offsets];
                nextOffsets[index] = offset;
                return nextOffsets;
              });
            }}
          >
            <LearningSection
              backgroundColor={theme.color}
              chapterId={theme.id}
              title={theme.title}
            />
          </View>
        ))}
      </ScrollView>
      {progressError ? (
        <CustomText accessibilityRole="alert" style={styles.progressError}>
          {progressError}
        </CustomText>
      ) : null}
      <ScrollDownButton
        accessibilityLabel={`Ir para o próximo tema: ${themes[(activeThemeIndex + 1) % themes.length].title}`}
        backgroundColor={themes[activeThemeIndex].color}
        pointsUp={activeThemeIndex === themes.length - 1}
        onPress={goToNextTheme}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 88,
  },
  progressError: {
    position: "absolute",
    bottom: 88,
    alignSelf: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: colors.white,
    color: colors.coral,
    fontSize: 12,
    textAlign: "center",
  },
});
