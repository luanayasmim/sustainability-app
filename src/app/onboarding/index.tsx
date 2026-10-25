import { CustomText } from "@/components/custom-text";
import { PrimaryButton } from "@/components/primary-button";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function OnboardingStartPage() {
  return (
    <View style={styles.screen}>
      <View style={styles.character}>
        <CustomText style={styles.characterText}>(personagem)</CustomText>
      </View>
      <View style={styles.startButton}>
        <PrimaryButton
          onPress={() => router.push("/onboarding/name")}
          title="Iniciar"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  character: {
    position: "absolute",
    top: "33.45%",
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
  startButton: {
    position: "absolute",
    top: "76.53%",
    left: "50%",
    marginLeft: -150,
  },
});
