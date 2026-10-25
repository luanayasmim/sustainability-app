import type { Icon } from "phosphor-react-native";
import { LockKeyIcon } from "phosphor-react-native";
import { StyleSheet, View } from "react-native";
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
import { colors } from "../constants/colors";

type AchievementCardProps = Readonly<{ size?: number }> &
  (
    | Readonly<{
        isCompleted: false;
        uncompletedBackgroundColor?: string;
        uncompletedIconColor?: string;
      }>
    | Readonly<{
        isCompleted: true;
        completedIcon: Icon;
        completedBackgroundColor?: string;
        completedBackgroundGradientColors?: readonly [string, string];
        completedIconColor?: string;
      }>
  );

export function AchievementCard(props: AchievementCardProps) {
  const badgeSize = props.size ?? 200;
  const iconSize = badgeSize * 0.625;
  const badgeDimensions = {
    width: badgeSize,
    height: badgeSize,
    borderRadius: badgeSize / 2,
  };

  if (!props.isCompleted) {
    return (
      <View
        style={[
          styles.badge,
          badgeDimensions,
          {
            backgroundColor:
              props.uncompletedBackgroundColor ??
              colors.achievementUncompleted,
          },
        ]}
      >
        <LockKeyIcon
          size={iconSize}
          color={props.uncompletedIconColor ?? colors.textPrimary}
          weight="fill"
        />
      </View>
    );
  }

  const CompletedIcon = props.completedIcon;
  const gradientColors = props.completedBackgroundGradientColors ?? [
    colors.goldAccent,
    "#927004",
  ];

  return (
    <View style={[styles.badge, badgeDimensions]}>
      {props.completedBackgroundColor ? (
        <View
          style={[
            StyleSheet.absoluteFill,
            styles.background,
            { backgroundColor: props.completedBackgroundColor },
          ]}
        />
      ) : (
        <Svg
          width={badgeSize}
          height={badgeSize}
          style={StyleSheet.absoluteFill}
          viewBox="0 0 200 200"
          pointerEvents="none"
        >
          <Defs>
            <LinearGradient
              id="achievementBadgeGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <Stop offset="12.328%" stopColor={gradientColors[0]} />
              <Stop offset="87.435%" stopColor={gradientColors[1]} />
            </LinearGradient>
          </Defs>
          <Circle
            cx={100}
            cy={100}
            r={100}
            fill="url(#achievementBadgeGradient)"
          />
        </Svg>
      )}
      <View pointerEvents="none" style={styles.iconLayer}>
        <CompletedIcon
          size={iconSize}
          color={props.completedIconColor ?? "#5D4700"}
          weight="bold"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  background: {
    borderRadius: 100,
    zIndex: 0,
  },
  iconLayer: {
    position: "relative",
    zIndex: 1,
  },
});
