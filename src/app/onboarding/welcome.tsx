import { CustomText } from "@/components/custom-text";
import { PrimaryButton } from "@/components/primary-button";
import { colors } from "@/constants/colors";
import { getUserName } from "@/storage/user";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

const missionDescription =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.\n(texto explicando as missões)";

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
    <View style={styles.screen}>
      <CustomText style={styles.title}>
        {name ? `Bem-vindo(a), ${name}!` : "Bem-vindo(a)!"}
      </CustomText>
      <View style={styles.character}>
        <CustomText style={styles.characterText}>(personagem)</CustomText>
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
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  title: {
    position: "absolute",
    top: "7.04%",
    alignSelf: "center",
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
    position: "absolute",
    top: "18.54%",
    left: "50%",
    width: 200,
    height: 200,
    marginLeft: -100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D9D9D9",
  },
  characterText: {
    color: "#000000",
    fontSize: 20,
    textAlign: "center",
  },
  description: {
    position: "absolute",
    top: "48.94%",
    alignSelf: "center",
    width: 293,
    color: colors.textPrimary,
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
  },
  error: {
    position: "absolute",
    top: "67%",
    alignSelf: "center",
    color: colors.coral,
    fontSize: 12,
    textAlign: "center",
  },
  startButton: {
    position: "absolute",
    top: "76.53%",
    left: "50%",
    marginLeft: -150,
  },
});
