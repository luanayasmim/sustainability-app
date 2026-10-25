import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";
import { CustomText } from "../components/custom-text";
import { colors } from "../constants/colors";
import { getUserName } from "../storage/user";

export default function Index() {
  const [error, setError] = useState<string | null>(null);

  const checkUserName = useCallback(async () => {
    setError(null);

    try {
      const name = await getUserName();
      router.replace(name ? "/(tabs)" : "/onboarding");
    } catch {
      setError("Não foi possível verificar seu perfil. Tente novamente.");
    }
  }, []);

  useEffect(() => {
    void checkUserName();
  }, [checkUserName]);

  if (error) {
    return (
      <View style={styles.container}>
        <CustomText style={styles.error}>{error}</CustomText>
        <Pressable onPress={() => void checkUserName()} style={styles.retry}>
          <CustomText style={styles.retryText}>Tentar novamente</CustomText>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0F0F0",
    padding: 24,
  },
  error: {
    color: colors.textPrimary,
    textAlign: "center",
  },
  retry: {
    marginTop: 16,
    padding: 12,
  },
  retryText: {
    color: colors.primary,
    fontFamily: "Poppins-Bold",
  },
});
