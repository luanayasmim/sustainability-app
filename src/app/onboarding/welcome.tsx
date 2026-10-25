import { CustomText } from "@/components/custom-text";
import { PrimaryButton } from "@/components/primary-button";
import { colors } from "@/constants/colors";
import { getUserName } from "@/storage/user";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import CapiWelcome from "../../../assets/images/capi-welcome.svg";

const missionDescription =
  "Oi! Eu sou a Capi e vou acompanhar você nesta jornada pela sustentabilidade. Aqui, você pode aprender com conteúdos, explorar temas e participar de desafios. Vamos descobrir juntos como cuidar melhor do planeta?";

export default function OnboardingWelcomePage() {
  const { name: routeName } = useLocalSearchParams<{ name?: string }>();
  const [name, setName] = useState(routeName ?? "");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (routeName) {
      setName(routeName);
      return;
    }

    getUserName()
      .then((savedName) => {
        if (savedName) {
          setName(savedName);
        } else {
          router.replace("/onboarding/name");
        }
      })
      .catch(() => {
        setError("Não foi possível carregar seu perfil. Tente novamente.");
      });
  }, [routeName]);

  const retryLoadName = () => {
    setError(null);
    getUserName()
      .then((savedName) => {
        if (savedName) {
          setName(savedName);
        } else {
          router.replace("/onboarding/name");
        }
      })
      .catch(() => {
        setError("Não foi possível carregar seu perfil. Tente novamente.");
      });
  };

  const startApp = () => {
    if (!name.trim()) {
      router.replace("/onboarding/name");
      return;
    }

    router.replace("/(tabs)");
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <CustomText style={styles.title}>
        {name ? `Bem-vindo(a), ${name}!` : "Bem-vindo(a)!"}
      </CustomText>
      <View style={styles.character}>
        <CapiWelcome width={200} height={254} />
      </View>
      <CustomText style={styles.description}>{missionDescription}</CustomText>
      {error ? (
        <CustomText onPress={retryLoadName} style={styles.error}>
          {error} Toque para tentar novamente.
        </CustomText>
      ) : null}
      <View style={styles.startButton}>
        <PrimaryButton onPress={startApp} title="Iniciar" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  content: {
    flexGrow: 1,
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  title: {
    width: "100%",
    color: colors.primary,
    fontSize: 32,
    fontFamily: "Poppins-Bold",
    fontWeight: "bold",
    lineHeight: 48,
    textAlign: "center",
    paddingHorizontal: 12,
  },
  character: {
    width: 200,
    height: 254,
    alignItems: "center",
    justifyContent: "center",
  },
  description: {
    width: "100%",
    maxWidth: 320,
    color: colors.textPrimary,
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
  },
  error: {
    color: colors.coral,
    fontSize: 12,
    textAlign: "center",
  },
  startButton: {
    alignItems: "center",
  },
});
