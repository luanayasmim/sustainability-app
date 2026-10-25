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
  const activities = [
    {
      title: "Capítulo I",
      description: "(nome da missão)",
      icon: <BookOpenIcon color={colors.white} size={40} weight="fill" />,
      backgroundColor,
      iconSize: 80,
    },
    {
      title: "Tópico I",
      description: "descrição",
      icon: <PencilIcon color={colors.white} size={40} />,
      backgroundColor,
      iconSize: 70,
    },
    {
      title: "Tópico II",
      description: "Descrição",
      icon: <NotebookIcon color={colors.white} size={40} />,
      backgroundColor,
      iconSize: 60,
    },
    {
      title: "Para saber mais",
      description: "Descrição",
      icon: <MagnifyingGlassIcon color={colors.white} size={40} />,
      backgroundColor: colors.coral,
      iconSize: 60,
    },
    {
      title: "Desafio Prático",
      description: "Descrição",
      icon: <TrophyIcon color={colors.white} size={40} weight="fill" />,
      backgroundColor: colors.goldAccent,
      iconSize: 60,
    },
  ];

  return (
    <View style={styles.container}>
      <SectionHeading backgroundColor={backgroundColor}>{title}</SectionHeading>
      <View style={styles.activitiesContainer}>
        {activities.map((activity, index) => (
          <View
            key={activity.title}
            style={[
              styles.activityRow,
              index % 2 === 0 ? styles.leftActivity : styles.rightActivity,
            ]}
          >
            <View style={styles.activityColumn}>
              <ChapterCard
                chapterIcon={activity.icon}
                title={activity.title}
                description={activity.description}
                backgroundColor={activity.backgroundColor}
                iconSize={activity.iconSize}
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  activitiesContainer: {
    width: 264,
    flexDirection: "column",
    paddingTop: 52,
  },
  activityRow: {
    width: "100%",
    flexDirection: "row",
  },
  leftActivity: {
    justifyContent: "flex-start",
  },
  rightActivity: {
    justifyContent: "flex-end",
  },
  activityColumn: {
    width: "50%",
    alignItems: "center",
  },
});
