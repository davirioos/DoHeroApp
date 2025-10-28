export default {
  expo: {
    name: "taskGamificado",
    slug: "taskGamificado",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./src/assets/icons/icon.png",
    scheme: "taskgamificado",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./src/assets/icons/icon.png",
        backgroundColor: "#101010",
      },
      edgeToEdgeEnabled: true,
      package: "com.anonymous.taskGamificado",
      // Esta é a linha que lê o segredo
      googleServicesFile: "./google-services.json",
      compileSdkVersion: 35,
      targetSdkVersion: 35,
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./src/assets/icons/icon.png",
    },
    plugins: [
      "@react-native-firebase/app",
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./src/assets/icons/icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#101010",
        },
      ],
      "expo-font",
      "expo-localization",
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      eas: {
        projectId: "ed95da7c-742e-44da-8148-a76de92aa1e4",
      },
    },
  },
};
