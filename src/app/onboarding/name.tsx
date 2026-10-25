import { CustomInput } from "@/components/custom-input";
import { CustomText } from "@/components/custom-text";
import { PrimaryButton } from "@/components/primary-button";
import { saveUserName } from "@/storage/user";
import { router } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";

export default function OnboardingNamePage() {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const continueWithName = async () => {
    const normalizedName = name.trim();

    if (!normalizedName) {
      setError("Digite seu nome para continuar.");
      return;
    }

    try {
      await saveUserName(normalizedName);
      Keyboard.dismiss();
      router.push({
        pathname: "/onboarding/welcome",
        params: { name: normalizedName },
      });
    } catch {
      setError("Não foi possível salvar seu nome. Tente novamente.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.screen}
    >
      <View style={styles.screen}>
        <View style={styles.character}>
          <CustomText style={styles.characterText}>(personagem)</CustomText>
        </View>

        <View style={styles.form}>
          <CustomInput
            label="Como deseja ser chamado(a)?"
            accessibilityLabel="Digite o seu nome"
            autoCapitalize="words"
            autoComplete="name"
            onChangeText={(value) => {
              setName(value);
              setError(null);
            }}
            onSubmitEditing={() => void continueWithName()}
            placeholder="Digite o seu nome"
            returnKeyType="done"
            style={styles.input}
            value={name}
            error={error ?? undefined}
            containerStyle={styles.inputContainer}
          />
          <View style={styles.continueButton}>
            <PrimaryButton
              onPress={() => void continueWithName()}
              title="Continuar"
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  character: {
    position: "absolute",
    top: "5.87%",
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
  form: {
    position: "absolute",
    top: "38.62%",
    left: 0,
    right: 0,
    alignItems: "center",
  },
  inputContainer: {
    width: 300,
    marginBottom: 0,
  },
  input: {
    width: 300,
    height: 50,
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
  },
  continueButton: {
    marginTop: 29,
  },
});
