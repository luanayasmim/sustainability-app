import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
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
