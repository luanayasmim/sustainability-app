import { Tabs } from "expo-router";
import { BottomNavigation } from "../../components/bottom-navigation";

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
    </Tabs>
  );
}
