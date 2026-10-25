import { Tabs } from "expo-router";
import { BottomNavigation } from "../../components/bottom-navigation";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{ tabBarPosition: "bottom" }}
      tabBar={(props) => <BottomNavigation {...props} />}
    >
      <Tabs.Screen name="index" options={{ title: "Início" }} />
      <Tabs.Screen
        name="achivements"
        options={{ title: "Minhas Conquistas" }}
      />
      <Tabs.Screen name="quizzes" options={{ title: "Quizzes" }} />
      <Tabs.Screen name="perfil" options={{ title: "Perfil" }} />
    </Tabs>
  );
}
