import { CheckCircleIcon } from "phosphor-react-native";
import { StyleSheet, View } from "react-native";
import { colors } from "../constants/colors";
import { CustomText } from "./custom-text";

type QuizAttemptCardProps = Readonly<{
  title: string;
  lastAttemptPercentage?: number;
  correctAnswers?: number | null;
  totalQuestions?: number;
  attemptCount?: number;
  titleColor?: string;
}>;

export function QuizAttemptCard({
  title,
  lastAttemptPercentage,
  correctAnswers,
  totalQuestions,
  attemptCount,
  titleColor = colors.primary,
}: QuizAttemptCardProps) {
  return (
    <View style={styles.card}>
      <CustomText numberOfLines={1} style={[styles.title, { color: titleColor }]}>
        {title}
      </CustomText>
      {lastAttemptPercentage !== undefined && (
        <View style={styles.attempt}>
          <CustomText style={styles.label}>
            {attemptCount && attemptCount > 1
              ? `${attemptCount} tentativas`
              : "Última tentativa"}
          </CustomText>
          <View style={styles.result}>
            <CustomText style={styles.percentage}>
              {lastAttemptPercentage}%
            </CustomText>
            <CheckCircleIcon
              size={24}
              color={colors.primary}
              weight="fill"
            />
          </View>
          {correctAnswers !== null &&
          correctAnswers !== undefined &&
          totalQuestions ? (
            <CustomText style={styles.correctAnswers}>
              {correctAnswers}/{totalQuestions} acertos
            </CustomText>
          ) : null}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    minHeight: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    borderRadius: 16,
    backgroundColor: "#F9FFF9",
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 5,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    flex: 1,
    marginRight: 16,
    fontSize: 12,
    fontFamily: "Poppins-Bold",
    fontWeight: "bold",
  },
  attempt: {
    minWidth: 81,
    alignItems: "center",
  },
  label: {
    color: "#2E2E2E",
    fontSize: 10,
  },
  result: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  percentage: {
    color: "#2E2E2E",
    fontSize: 24,
    fontFamily: "Poppins-SemiBold",
    fontWeight: "600",
  },
  correctAnswers: {
    color: colors.textSecondary,
    fontSize: 9,
  },
});
