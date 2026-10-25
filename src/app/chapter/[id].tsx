import { CustomText } from "@/components/custom-text";
import { PrimaryButton } from "@/components/primary-button";
import { colors } from "@/constants/colors";
import { chapters } from "@/data/chapters";
import { router, useLocalSearchParams } from "expo-router";
import { XIcon } from "phosphor-react-native";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

export default function ChapterPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const chapter = chapters.find((item) => item.id === id);

  if (!chapter) {
    return (
      <View style={styles.notFound}>
        <CustomText style={styles.notFoundText}>
          Não foi possível encontrar este capítulo.
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
        accessibilityLabel="Fechar capítulo"
        accessibilityRole="button"
        onPress={() => router.replace("/(tabs)")}
        style={styles.closeButton}
      >
        <XIcon color={colors.textPrimary} size={26} />
      </Pressable>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <CustomText style={styles.eyebrow}>CAPÍTULO I</CustomText>
        <CustomText style={styles.title}>{chapter.title}</CustomText>

        <View style={styles.card}>
          <CustomText style={styles.cardTitle}>Vamos aprender?</CustomText>
          <CustomText style={styles.description}>
            {chapter.description}
          </CustomText>
        </View>

        <View style={styles.footer}>
          <PrimaryButton
            onPress={() =>
              router.push({
                pathname: "/topic/[id]",
                params: { id: chapter.id },
              })
            }
            title="Continuar"
          />
        </View>
      </ScrollView>
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
  content: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 28,
    paddingTop: 74,
    paddingBottom: 28,
  },
  eyebrow: {
    color: colors.textSecondary,
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    letterSpacing: 1,
    marginBottom: 8,
  },
  title: {
    color: colors.primary,
    fontFamily: "Poppins-Bold",
    fontSize: 28,
    lineHeight: 36,
    textAlign: "center",
    marginBottom: 28,
  },
  card: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#F8FFF9",
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 28,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    color: colors.textPrimary,
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    color: colors.textPrimary,
    fontSize: 16,
    lineHeight: 26,
    textAlign: "center",
  },
  footer: {
    marginTop: "auto",
    marginBottom: "auto",
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
