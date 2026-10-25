import type { ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../constants/colors";
import { CustomText } from "./custom-text";

type BottomSheetProps = Readonly<{
  children: ReactNode;
  onClose: () => void;
  title: string;
  visible: boolean;
}>;

export function BottomSheet({
  children,
  onClose,
  title,
  visible,
}: BottomSheetProps) {
  return (
    <Modal
      animationType="slide"
      onRequestClose={onClose}
      transparent
      visible={visible}
    >
      <View style={styles.overlay}>
        <Pressable
          accessibilityLabel="Fechar"
          accessibilityRole="button"
          onPress={onClose}
          style={StyleSheet.absoluteFill}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.keyboardAvoidingView}
        >
          <SafeAreaView edges={["bottom"]} style={styles.sheet}>
            <View style={styles.handle} />
            <CustomText style={styles.title}>{title}</CustomText>
            {children}
          </SafeAreaView>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#00000066",
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  sheet: {
    maxHeight: "85%",
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 12,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: colors.surface,
  },
  handle: {
    width: 40,
    height: 4,
    alignSelf: "center",
    marginBottom: 20,
    borderRadius: 2,
    backgroundColor: colors.border,
  },
  title: {
    marginBottom: 20,
    color: colors.textPrimary,
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
    textAlign: "center",
  },
});
