import { router } from "expo-router";
import {
  BookOpenIcon,
  MagnifyingGlassIcon,
  NotebookIcon,
  PencilIcon,
  TrophyIcon,
} from "phosphor-react-native";
import type { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { chapters } from "../data/chapters";
import { colors } from "../constants/colors";
import { ChapterCard } from "./chapter-card";
import { SectionHeading } from "./section-heading";

type LearningSectionProps = Readonly<{
  title: string;
  chapterId: string;
  backgroundColor: string;
}>;

type Activity = {
  title: string;
  description?: string;
  icon: ReactNode;
  backgroundColor: string;
  iconSize: number;
  onPress?: () => void;
};

export function LearningSection({
  title,
  chapterId,
  backgroundColor,
}: LearningSectionProps) {
  const chapter = chapters.find((item) => item.id === chapterId);

  if (!chapter) {
    throw new Error(`Não foi possível encontrar o tema "${chapterId}".`);
  }

  const activities: Activity[] = [
    {
      title: "Capítulo I",
      icon: <BookOpenIcon color={colors.white} size={40} weight="fill" />,
      backgroundColor,
      iconSize: 80,
      onPress: () =>
        router.push({ pathname: "/chapter/[id]", params: { id: chapterId } }),
    },
    {
      title: chapter.topics[0].title,
      icon: <PencilIcon color={colors.white} size={40} />,
      backgroundColor,
      iconSize: 70,
      onPress: () =>
        router.push({ pathname: "/topic/[id]", params: { id: chapterId } }),
    },
    {
      title: chapter.topics[1].title,
      icon: <NotebookIcon color={colors.white} size={40} />,
      backgroundColor,
      iconSize: 60,
      onPress: () =>
        router.push({
          pathname: "/topic/[id]",
          params: { id: chapterId, topicNumber: "2" },
        }),
    },
    {
      title: "Para saber mais",
      icon: <MagnifyingGlassIcon color={colors.white} size={40} />,
      backgroundColor: colors.coral,
      iconSize: 60,
      onPress: () =>
        router.push({
          pathname: "/learn-more/[id]",
          params: { id: chapterId },
        }),
    },
    {
      title: "Desafio Prático",
      icon: <TrophyIcon color={colors.white} size={40} weight="fill" />,
      backgroundColor: colors.goldAccent,
      iconSize: 60,
      onPress: () =>
        router.push({
          pathname: "/challenge/[id]",
          params: { id: chapterId },
        }),
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
                description={activity.description ?? ""}
                backgroundColor={activity.backgroundColor}
                iconSize={activity.iconSize}
                onPress={activity.onPress}
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
