import {
    BookOpenIcon,
    MagnifyingGlassIcon,
    NotebookIcon,
    PencilIcon,
    TrophyIcon,
} from "phosphor-react-native";
import { StyleSheet, View } from "react-native";
import { colors } from "../constants/colors";
import { ChapterCard } from "./chapter-card";
import { SectionHeading } from "./section-heading";

type LearningSectionProps = Readonly<{
  title: string;
  backgroundColor: string;
}>;

export function LearningSection({
  title,
  backgroundColor,
}: LearningSectionProps) {
  return (
    <View style={styles.container}>
      <SectionHeading backgroundColor={backgroundColor}>{title}</SectionHeading>
      <View style={styles.activitiesContainer}>
        <ChapterCard
          chapterIcon={
            <BookOpenIcon
              color={colors.white}
              size={40}
              weight="fill"
            />
          }
          title="Capítulo I"
          description="descrição"
          backgroundColor={backgroundColor}
        />
        <ChapterCard
          chapterIcon={<PencilIcon color={colors.white} size={40} />}
          title="Tópico I"
          description="descrição"
          backgroundColor={backgroundColor}
        />
        <ChapterCard
          chapterIcon={<NotebookIcon color={colors.white} size={40} />}
          title="Tópico II"
          description="descrição"
          backgroundColor={backgroundColor}
        />
        <ChapterCard
          chapterIcon={
            <MagnifyingGlassIcon color={colors.white} size={40} />
          }
          title="Para saber mais"
          description="descrição"
          backgroundColor={colors.coral}
        />
        <ChapterCard
          chapterIcon={
            <TrophyIcon
              color={colors.white}
              size={40}
              weight="fill"
            />
          }
          title="Desafio Prático"
          description="descrição"
          backgroundColor={colors.goldAccent}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  activitiesContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
