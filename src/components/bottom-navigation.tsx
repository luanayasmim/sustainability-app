import {
  HouseIcon,
  SealQuestionIcon,
  TrophyIcon,
  UserIcon,
} from "phosphor-react-native";
import type { BottomTabBarProps } from "expo-router/js-tabs";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { colors } from "../constants/colors";
import { getUserName, subscribeToUserName } from "../storage/user";
import { CustomText } from "./custom-text";

type TabItem = {
  label: string;
  color: string;
  renderIcon: (color: string) => ReactNode;
};

const tabItems: Record<string, TabItem> = {
  index: {
    label: "Início",
    color: colors.primary,
    renderIcon: (color: string) => (
      <HouseIcon color={color} size={24} weight="fill" />
    ),
  },
  achivements: {
    label: "Conquistas",
    color: colors.goldAccent,
    renderIcon: (color: string) => (
      <TrophyIcon color={color} size={24} weight="fill" />
    ),
  },
  quizzes: {
    label: "Quizzes",
    color: colors.coral,
    renderIcon: (color: string) => (
      <SealQuestionIcon color={color} size={24} weight="fill" />
    ),
  },
  perfil: {
    label: "Luana",
    color: colors.blue,
    renderIcon: (color: string) => (
      <UserIcon color={color} size={24} weight="fill" />
    ),
  },
};

export function BottomNavigation(props: BottomTabBarProps) {
  const [userName, setUserName] = useState<string | null>(null);
  const activeRoute = props.state.routes[props.state.index]?.name;

  useEffect(() => {
    let isActive = true;
    const unsubscribe = subscribeToUserName(setUserName);

    getUserName()
      .then((name) => {
        if (isActive) {
          setUserName(name);
        }
      })
      .catch((error: unknown) => {
        console.error("Não foi possível carregar o nome para a navegação.", error);
      });

    return () => {
      isActive = false;
      unsubscribe();
    };
  }, []);

  if (activeRoute === "quiz") {
    return null;
  }

  const items = props.state.routes
    .map((route, index) => {
      const tab = tabItems[route.name];
      const options = props.descriptors[route.key].options;
      const isFocused = props.state.index === index;

      return {
        route,
        label:
          route.name === "perfil"
            ? userName ?? tab?.label ?? options.title ?? route.name
            : tab?.label ?? options.title ?? route.name,
        color: tab?.color ?? colors.primary,
        icon: tab?.renderIcon(
          isFocused ? colors.white : colors.textPrimary,
        ),
        isFocused,
        accessibilityLabel: options.tabBarAccessibilityLabel,
      };
    })
    .filter(({ route }) => route.name !== "quiz");

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: Math.max(props.insets.bottom, 12) },
      ]}
    >
      {items.map((item) => {
        const route = item.route;

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityLabel={item.accessibilityLabel}
            accessibilityState={{ selected: item.isFocused }}
            onPress={() => {
              const event = props.navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!item.isFocused && !event.defaultPrevented) {
                props.navigation.navigate(route.name, route.params);
              }
            }}
            style={styles.tab}
          >
            <View
              style={
                item.isFocused
                  ? [styles.menuButtonPrincipal, { backgroundColor: item.color }]
                  : [styles.menuButton, { borderColor: item.color }]
              }
            >
              {item.icon}
            </View>
            <CustomText numberOfLines={1} style={styles.label}>
              {item.label}
            </CustomText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
    paddingTop: 8,
  },
  tab: {
    alignItems: "center",
  },
  menuButtonPrincipal: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    maxWidth: 82,
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
