import { BottomNavigation } from "@/components/bottom-navigation";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarPosition: "bottom",
        headerShown: false,
        animation: "fade",
      }}
      tabBar={(props) => <BottomNavigation {...props} />}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="achivements" options={{ title: "Conquistas" }} />
      <Tabs.Screen name="quizzes" />
      <Tabs.Screen name="perfil" />
      <Tabs.Screen name="quiz" />
    </Tabs>
  );
}
