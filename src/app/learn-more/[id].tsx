import { CustomText } from "@/components/custom-text";
import { PrimaryButton } from "@/components/primary-button";
import { colors } from "@/constants/colors";
import { chapters } from "@/data/chapters";
import { router, useLocalSearchParams } from "expo-router";
import { XIcon } from "phosphor-react-native";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import * as WebBrowser from "expo-web-browser";

export default function LearnMorePage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const chapter = chapters.find((item) => item.id === id);
  const [openError, setOpenError] = useState<string | null>(null);

  const openReference = async () => {
    if (!chapter) {
      return;
    }

    setOpenError(null);

    try {
      await WebBrowser.openBrowserAsync(chapter.moreInfo.url);
    } catch (error) {
      console.error("Não foi possível abrir o material de referência.", error);
      setOpenError("Não foi possível abrir o material. Tente novamente.");
    }
  };

  if (!chapter) {
    return (
      <View style={styles.notFound}>
        <CustomText style={styles.notFoundText}>
          Não foi possível encontrar este conteúdo.
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
        accessibilityLabel="Fechar conteúdo"
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
        <CustomText style={styles.eyebrow}>CONTEÚDO EXTRA</CustomText>
        <CustomText style={styles.title}>Para saber mais</CustomText>
        <CustomText style={styles.theme}>{chapter.title}</CustomText>

        <View style={styles.factCard}>
          <CustomText style={styles.factLabel}>Você sabia?</CustomText>
          <CustomText style={styles.fact}>{chapter.moreInfo.fact}</CustomText>
        </View>

        <CustomText style={styles.referenceDescription}>
          Quer descobrir mais? Acesse este material de referência:
        </CustomText>
        {openError ? (
          <CustomText accessibilityRole="alert" style={styles.error}>
            {openError}
          </CustomText>
        ) : null}
        <View style={styles.referenceButton}>
          <PrimaryButton
            onPress={() => void openReference()}
            title="Acessar material"
            backgroundColor={colors.coral}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton
          onPress={() =>
            router.push({
              pathname: "/challenge/[id]",
              params: { id: chapter.id },
            })
          }
          title="Continuar"
        />
      </View>
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
    justifyContent: "center",
    paddingHorizontal: 28,
    paddingTop: 72,
    paddingBottom: 24,
  },
  eyebrow: {
    color: colors.textSecondary,
    fontFamily: "Poppins-SemiBold",
    fontSize: 12,
    letterSpacing: 1,
    marginBottom: 6,
  },
  title: {
    color: colors.primary,
    fontFamily: "Poppins-Bold",
    fontSize: 30,
    lineHeight: 40,
    textAlign: "center",
    marginBottom: 8,
  },
  theme: {
    color: colors.textSecondary,
    fontSize: 15,
    textAlign: "center",
    marginBottom: 26,
  },
  factCard: {
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
  factLabel: {
    color: colors.coral,
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 12,
  },
  fact: {
    color: colors.textPrimary,
    fontSize: 16,
    lineHeight: 26,
    textAlign: "center",
  },
  referenceDescription: {
    color: colors.textPrimary,
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
    marginTop: 24,
  },
  error: {
    color: "#B42318",
    fontSize: 13,
    textAlign: "center",
    marginTop: 12,
  },
  referenceButton: {
    marginTop: 16,
  },
  footer: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 24,
    backgroundColor: "#F0F0F0",
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
