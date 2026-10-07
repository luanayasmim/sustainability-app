import { StyleSheet, View } from "react-native";
import { Title } from "../components/title";

export default function Index() {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Title>Hello World</Title>
    </View>
  );
}

const styles = StyleSheet.create({});
