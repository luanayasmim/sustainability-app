import {
  HouseIcon,
  SealQuestionIcon,
  TrophyIcon,
  UserIcon,
} from "phosphor-react-native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { colors } from "../constants/colors";
import { CustomText } from "./custom-text";

type BottomNavigationProps = Readonly<{
  onPressHome: () => void;
  onPressAchievements: () => void;
  onPressQuizzes: () => void;
  onPressProfile: () => void;
}>;

export function BottomNavigation() {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "row",
        marginTop: 20,
        marginBottom: 15,
        width: "100%",
        borderTopWidth: 1,
        borderTopColor: colors.border,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.surface,
      }}
    >
      <TouchableOpacity style={{ alignItems: "center" }}>
        <View style={styles.menuButtonPrincipal}>
          <HouseIcon color={colors.white} size={24} weight="fill" />
        </View>
        <CustomText style={styles.label}>Início</CustomText>
      </TouchableOpacity>

      <TouchableOpacity style={{ alignItems: "center" }}>
        <View style={[styles.menuButton, { borderColor: colors.goldAccent }]}>
          <TrophyIcon color={colors.textPrimary} size={24} weight="fill" />
        </View>
        <CustomText style={styles.label}>Conquistas</CustomText>
      </TouchableOpacity>

      <TouchableOpacity style={{ alignItems: "center" }}>
        <View style={[styles.menuButton, { borderColor: colors.coral }]}>
          <SealQuestionIcon color={colors.textPrimary} size={24} weight="fill" />
        </View>
        <CustomText style={styles.label}>Quizzes</CustomText>
      </TouchableOpacity>

      <TouchableOpacity style={{ alignItems: "center" }}>
        <View style={[styles.menuButton, { borderColor: colors.blue }]}>
          <UserIcon color={colors.textPrimary} size={24} weight="fill" />
        </View>
        <CustomText style={styles.label}>Luana</CustomText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  menuButtonPrincipal: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
    marginTop: 5,
  },

  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 100,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
