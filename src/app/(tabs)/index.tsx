import { LearningSection } from "@/src/components/learning-section";
import { colors } from "@/src/constants/colors";
import { ScrollView } from "react-native";

export default function HomePage() {
  return (
    <ScrollView>
      <LearningSection backgroundColor={colors.primary} title="Entendendo Reciclagem"/>
      <LearningSection backgroundColor={colors.blue} title="A importância da Água"/>
      <LearningSection backgroundColor={colors.gold} title="O poder da Energia"/>
      <LearningSection backgroundColor={colors.coral} title="Consumo Consciente"/>
    </ScrollView>
  );
}
