import { CheckCircleIcon, XIcon } from "phosphor-react-native";
import { StyleSheet, View } from "react-native";
import { colors } from "../constants/colors";
import { CustomText } from "./custom-text";

type QuizAttemptCardProps = Readonly<{
  title: string;
  lastAttemptPercentage?: number;
  titleColor?: string;
}>;

export function QuizAttemptCard({
  title,
  lastAttemptPercentage,
  titleColor = colors.primary,
}: QuizAttemptCardProps) {
  const isZeroScore = lastAttemptPercentage === 0;
  const resolvedTitleColor = isZeroScore ? colors.coral : titleColor;

  return (
    <View style={[styles.card, isZeroScore && styles.zeroScoreCard]}>
      <CustomText
        numberOfLines={1}
        style={[styles.title, { color: resolvedTitleColor }]}
      >
        {title}
      </CustomText>
      {lastAttemptPercentage !== undefined && (
        <View style={styles.attempt}>
          <CustomText style={styles.label}>Última tentativa</CustomText>
          <View style={styles.result}>
            <CustomText style={styles.percentage}>
              {lastAttemptPercentage}%
            </CustomText>
            {isZeroScore ? (
              <View style={styles.errorIcon}>
                <XIcon size={12} color={colors.white} weight="bold" />
              </View>
            ) : (
              <CheckCircleIcon
                size={24}
                color={colors.primary}
                weight="fill"
              />
            )}
          </View>
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
  zeroScoreCard: {
    backgroundColor: "#FFF8F6",
  },
  title: {
    flex: 1,
    marginRight: 16,
    fontSize: 12,
    fontFamily: "Poppins-Bold",
    fontWeight: "bold",
  },
  attempt: {
    width: 81,
    alignItems: "flex-end",
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
  errorIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.coral,
  },
});
