import { Tabs } from "expo-router";
import { BottomNavigation } from "../../components/bottom-navigation";

export default function TabsLayout() {
  const tabProps = { headerShown: false };
  return (
    <Tabs
      screenOptions={{ tabBarPosition: "bottom" }}
      tabBar={(props) => <BottomNavigation {...props} />}
    >
      <Tabs.Screen name="index" options={tabProps} />
      <Tabs.Screen
        name="achivements"
        options={{ title: "Minhas Conquistas" }}
      />
      <Tabs.Screen name="quizzes" options={tabProps} />
      <Tabs.Screen name="perfil" options={tabProps} />
    </Tabs>
  );
}
