import { CustomText } from "@/components/custom-text";
import { PrimaryButton } from "@/components/primary-button";
import { colors } from "@/constants/colors";
import { chapters, type TopicSection } from "@/data/chapters";
import { router, useLocalSearchParams } from "expo-router";
import { XIcon } from "phosphor-react-native";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

export default function TopicPage() {
  const { id, topicNumber } = useLocalSearchParams<{
    id: string;
    topicNumber?: string;
  }>();
  const chapter = chapters.find((item) => item.id === id);
  const currentTopicNumber = topicNumber ?? "1";
  const topic =
    currentTopicNumber === "1"
      ? chapter?.topics[0]
      : currentTopicNumber === "2"
        ? chapter?.topics[1]
        : undefined;

  if (!chapter || !topic) {
    return (
      <View style={styles.notFound}>
        <CustomText style={styles.notFoundText}>
          Não foi possível encontrar este tópico.
        </CustomText>
        <PrimaryButton
          onPress={() => router.replace("/(tabs)")}
          title="Voltar ao início"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable
        accessibilityLabel="Fechar tópico"
        accessibilityRole="button"
        onPress={() => router.replace("/(tabs)")}
        style={styles.closeButton}
      >
        <XIcon color={colors.textPrimary} size={26} />
      </Pressable>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <CustomText style={styles.title}>{topic.title}</CustomText>

        {"intro" in topic ? (
          <View>
            <View style={styles.introCard}>
              <CustomText style={styles.introLabel}>♻️ Uma aventura verde!</CustomText>
              <CustomText style={styles.description}>{topic.intro}</CustomText>
            </View>

            {topic.sections.map((section) => (
              <TopicContentSection
                key={`${topic.title}-${section.title}`}
                section={section}
              />
            ))}
          </View>
        ) : (
          topic.steps.map((step, index) => (
            <View key={`${topic.title}-${index}`} style={styles.step}>
              <CustomText style={styles.stepTitle}>Passo {index + 1}</CustomText>
              <CustomText style={styles.description}>{step}</CustomText>
              {index === 0 || index === 2 ? (
                <View
                  accessibilityLabel="Espaço para imagem representativa"
                  style={styles.imagePlaceholder}
                >
                  <CustomText style={styles.imagePlaceholderText}>
                    (Imagem Representativa)
                  </CustomText>
                </View>
              ) : null}
            </View>
          ))
        )}
      </ScrollView>
      <View style={styles.footer}>
        {currentTopicNumber === "1" ? (
          <PrimaryButton
            onPress={() =>
              router.push({
                pathname: "/topic/[id]",
                params: { id: chapter.id, topicNumber: "2" },
              })
            }
            title="Continuar"
          />
        ) : (
          <PrimaryButton
            onPress={() =>
              router.push({
                pathname: "/learn-more/[id]",
                params: { id: chapter.id },
              })
            }
            title="Continuar"
          />
        )}
      </View>
    </View>
  );
}

function TopicContentSection({ section }: Readonly<{ section: TopicSection }>) {
  if (section.type === "materials") {
    return (
      <View style={styles.contentSection}>
        <CustomText style={styles.sectionTitle}>{section.title}</CustomText>
        {section.items.map((item) => (
          <View
            key={item.name}
            style={[styles.materialCard, { backgroundColor: item.color }]}
          >
            <CustomText style={styles.materialName}>{item.name}</CustomText>
            <CustomText style={styles.materialText}>
              <CustomText style={styles.materialLabel}>Exemplos: </CustomText>
              {item.examples}
            </CustomText>
            <CustomText style={styles.materialText}>
              <CustomText style={styles.materialLabel}>Depois: </CustomText>
              {item.becomes}
            </CustomText>
          </View>
        ))}
      </View>
    );
  }

  if (section.type === "checklist") {
    return (
      <View style={styles.contentSection}>
        <CustomText style={styles.sectionTitle}>{section.title}</CustomText>
        {section.items.map((item) => (
          <View key={item.title} style={styles.checklistCard}>
            <CustomText style={styles.materialName}>{item.title}</CustomText>
            <CustomText style={styles.description}>{item.text}</CustomText>
          </View>
        ))}
      </View>
    );
  }

  const isTip = section.type === "tip";

  return (
    <View style={[styles.contentSection, isTip && styles.tipCard]}>
      <CustomText style={[styles.sectionTitle, isTip && styles.tipTitle]}>
        {section.title}
      </CustomText>
      <CustomText style={styles.description}>{section.text}</CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  closeButton: {
    position: "absolute",
    top: 12,
    left: 18,
    zIndex: 1,
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 26,
    paddingTop: 68,
    paddingBottom: 24,
  },
  title: {
    color: colors.primary,
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    lineHeight: 40,
    textAlign: "center",
    marginBottom: 16,
  },
  step: {
    marginBottom: 18,
  },
  introCard: {
    backgroundColor: "#E5F4DE",
    borderRadius: 16,
    padding: 18,
    marginBottom: 22,
  },
  introLabel: {
    color: colors.primary,
    fontFamily: "Poppins-Bold",
    fontSize: 17,
    marginBottom: 8,
  },
  contentSection: {
    marginBottom: 22,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontFamily: "Poppins-Bold",
    fontSize: 18,
    lineHeight: 26,
    marginBottom: 8,
  },
  materialCard: {
    borderRadius: 12,
    padding: 14,
    marginTop: 10,
  },
  materialName: {
    color: colors.textPrimary,
    fontFamily: "Poppins-Bold",
    fontSize: 15,
    marginBottom: 4,
  },
  materialText: {
    color: colors.textPrimary,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 2,
  },
  materialLabel: {
    fontFamily: "Poppins-SemiBold",
  },
  checklistCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 14,
    marginTop: 10,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  tipCard: {
    backgroundColor: "#FFF4D6",
    borderRadius: 14,
    padding: 16,
  },
  tipTitle: {
    color: "#805B00",
  },
  stepTitle: {
    color: colors.textPrimary,
    fontFamily: "Poppins-Bold",
    fontSize: 18,
    marginBottom: 8,
  },
  description: {
    color: colors.textPrimary,
    fontSize: 14,
    lineHeight: 22,
  },
  imagePlaceholder: {
    width: "100%",
    height: 134,
    backgroundColor: "#D9D9D9",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
  },
  imagePlaceholderText: {
    color: "#000000",
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
  },
  footer: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 24,
    backgroundColor: "#F0F0F0",
  },
  notFound: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 20,
  },
  notFoundText: {
    color: colors.textPrimary,
    fontSize: 16,
    textAlign: "center",
  },
});
