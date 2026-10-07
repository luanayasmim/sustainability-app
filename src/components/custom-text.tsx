import type { ComponentProps } from "react";
import { Text } from "react-native";

type CustomTextProps = ComponentProps<typeof Text>;

export function CustomText({ style, ...props }: Readonly<CustomTextProps>) {
  return <Text {...props} style={[{ fontFamily: "Poppins-Regular" }, style]} />;
}
