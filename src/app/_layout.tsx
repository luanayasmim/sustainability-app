import { useFonts } from "expo-font";
import { Slot, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { syncAppIconWithQuizProgress } from "@/storage/app-icon";
import {
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";

void SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
  const segments = useSegments();
  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Black": require("../../assets/fonts/Poppins-Black.ttf"),
    "Poppins-BlackItalic": require("../../assets/fonts/Poppins-BlackItalic.ttf"),
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-BoldItalic": require("../../assets/fonts/Poppins-BoldItalic.ttf"),
    "Poppins-ExtraBold": require("../../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraBoldItalic": require("../../assets/fonts/Poppins-ExtraBoldItalic.ttf"),
    "Poppins-ExtraLight": require("../../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-ExtraLightItalic": require("../../assets/fonts/Poppins-ExtraLightItalic.ttf"),
    "Poppins-Italic": require("../../assets/fonts/Poppins-Italic.ttf"),
    "Poppins-Light": require("../../assets/fonts/Poppins-Light.ttf"),
    "Poppins-LightItalic": require("../../assets/fonts/Poppins-LightItalic.ttf"),
    "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-MediumItalic": require("../../assets/fonts/Poppins-MediumItalic.ttf"),
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-SemiBoldItalic": require("../../assets/fonts/Poppins-SemiBoldItalic.ttf"),
    "Poppins-Thin": require("../../assets/fonts/Poppins-Thin.ttf"),
    "Poppins-ThinItalic": require("../../assets/fonts/Poppins-ThinItalic.ttf"),
  });

  useEffect(() => {
    void syncAppIconWithQuizProgress().catch((error: unknown) => {
      console.error("Não foi possível sincronizar o ícone do app.", error);
    });
  }, []);

  useEffect(() => {
    if (
      (fontsLoaded || fontError) &&
      segments.length > 0
    ) {
      void SplashScreen.hideAsync().catch((error: unknown) => {
        console.error("Não foi possível ocultar o splash nativo.", error);
      });
    }
  }, [fontError, fontsLoaded, segments]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 1 }}>
        <Slot />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
