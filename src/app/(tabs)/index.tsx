import { LearningSection } from "@/components/learning-section";
import { ScrollDownButton } from "@/components/scroll-down-button";
import { colors } from "@/constants/colors";
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
  const [sectionOffsets, setSectionOffsets] = useState<number[]>([]);
  const [activeThemeIndex, setActiveThemeIndex] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    if (!themeId) {
      return;
    }

    const targetThemeIndex = themes.findIndex((theme) => theme.id === themeId);
    const targetThemeOffset = sectionOffsets[targetThemeIndex];

    if (targetThemeIndex < 0 || targetThemeOffset === undefined) {
      return;
    }

    scrollViewRef.current?.scrollTo({ y: targetThemeOffset, animated: false });
    setActiveThemeIndex(targetThemeIndex);
    router.setParams({ themeId: undefined });
  }, [sectionOffsets, themeId]);

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

    setActiveThemeIndex(visibleThemeIndex);
  };

  const goToNextTheme = () => {
    const nextThemeIndex = (activeThemeIndex + 1) % themes.length;
    const nextThemeOffset = sectionOffsets[nextThemeIndex];

    if (nextThemeOffset !== undefined) {
      scrollViewRef.current?.scrollTo({ y: nextThemeOffset, animated: true });
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
});
