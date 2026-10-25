import { router } from "expo-router";
import { XIcon } from "phosphor-react-native";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { CustomText } from "../../components/custom-text";
import { QuizAttemptCard } from "../../components/quiz-attempt-card";
import { colors } from "../../constants/colors";

export default function QuizzesPage() {
  return (
    <View style={styles.screen}>
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Voltar"
        onPress={() => router.back()}
        style={styles.closeButton}
      >
        <XIcon size={24} color={colors.textPrimary} weight="regular" />
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <CustomText style={styles.pageTitle}>Quizzes</CustomText>
        <CustomText style={styles.sectionTitle}>
          Lista de exercícios concluídos
        </CustomText>
        <View style={styles.quizCard}>
          <QuizAttemptCard
            title="Primeiro quiz de conhecimentos gerais"
            lastAttemptPercentage={80}
          />
        </View>
        <View style={styles.divider} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  closeButton: {
    position: "absolute",
    top: 25,
    left: 25,
    zIndex: 1,
  },
  content: {
    paddingTop: 65,
    paddingBottom: 24,
  },
  pageTitle: {
    alignSelf: "center",
    color: colors.primary,
    fontSize: 32,
    fontFamily: "Poppins-Bold",
    fontWeight: "bold",
    lineHeight: 48,
  },
  sectionTitle: {
    alignSelf: "center",
    color: "#2E2E2E",
    fontSize: 18,
    fontFamily: "Poppins-Medium",
    lineHeight: 27,
    marginTop: 16,
  },
  quizCard: {
    marginTop: 16,
    marginHorizontal: 19,
  },
  divider: {
    height: 2,
    backgroundColor: "#D9D9D9",
    marginTop: 15,
    marginHorizontal: 24,
  },
});
