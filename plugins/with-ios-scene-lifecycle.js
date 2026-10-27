const { withAppDelegate, withInfoPlist } = require("@expo/config-plugins");

const appDelegateClass = "class AppDelegate: ExpoAppDelegate";
const appDelegateConformance = "class AppDelegate: ExpoAppDelegate, ExpoReactNativeFactoryProvider";
const reactNativeStartup = `#if os(iOS) || os(tvOS)
    window = UIWindow(frame: UIScreen.main.bounds)
    factory.startReactNative(
      withModuleName: "main",
      in: window,
      launchOptions: launchOptions)
#endif`;

function withSceneAppDelegate(config) {
  return withAppDelegate(config, (config) => {
    let contents = config.modResults.contents;

    if (contents.includes(appDelegateClass) && !contents.includes(appDelegateConformance)) {
      contents = contents.replace(appDelegateClass, appDelegateConformance);
    }

    if (contents.includes(reactNativeStartup)) {
      contents = contents.replace(`${reactNativeStartup}\n`, "");
    }

    if (!contents.includes(appDelegateConformance) || contents.includes(reactNativeStartup)) {
      throw new Error(
        "Could not configure AppDelegate for the Expo scene lifecycle. " +
          "The generated AppDelegate.swift does not match the expected Expo template."
      );
    }

    config.modResults.contents = contents;
    return config;
  });
}

function withSceneInfoPlist(config) {
  return withInfoPlist(config, (config) => {
    config.modResults.UIApplicationSceneManifest = {
      UIApplicationSupportsMultipleScenes: false,
      UISceneConfigurations: {
        UIWindowSceneSessionRoleApplication: [
          {
            UISceneConfigurationName: "Default Configuration",
            UISceneDelegateClassName: "EXExpoAppSceneDelegate",
          },
        ],
      },
    };
    return config;
  });
}

module.exports = function withIOSSceneLifecycle(config) {
  return withSceneInfoPlist(withSceneAppDelegate(config));
};
