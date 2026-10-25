import { LearningSection } from "@/components/learning-section";
import { colors } from "@/constants/colors";
import { ScrollView } from "react-native";

export default function HomePage() {
  return (
    <ScrollView>
      <LearningSection
        backgroundColor={colors.primary}
        chapterId="reciclagem"
        title="Entendendo Reciclagem"
      />
      <LearningSection
        backgroundColor={colors.blue}
        chapterId="agua"
        title="A importância da Água"
      />
      <LearningSection
        backgroundColor={colors.gold}
        chapterId="energia"
        title="O poder da Energia"
      />
      <LearningSection
        backgroundColor={colors.coral}
        chapterId="consumo-consciente"
        title="Consumo Consciente"
      />
    </ScrollView>
  );
}
