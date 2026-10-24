import { StyleSheet, View } from "react-native";
import { BottomNavigation } from "../components/bottom-navigation";

export default function Index() {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <BottomNavigation />
    </View>
  );
}

const styles = StyleSheet.create({});
