import { PrimaryButton } from "@/components/primary-button";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import CapiIntro from "../../../assets/images/capi-intro.svg";

export default function OnboardingStartPage() {
  return (
    <View style={styles.screen}>
      <View style={styles.character}>
        <CapiIntro width={250} height={312} />
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
    top: "25%",
    left: "50%",
    width: 250,
    height: 312,
    marginLeft: -125,
    alignItems: "center",
    justifyContent: "center",
  },
  startButton: {
    position: "absolute",
    top: "76.53%",
    left: "50%",
    marginLeft: -150,
  },
});
