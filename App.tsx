import "reflect-metadata";
import { NativeBaseProvider, StatusBar } from "native-base";
import { theme } from "./src/theme/theme";
import * as Font from "expo-font";
import { useCallback, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";
import Routes from "./src/routes";
import { DatabaseConnectionProvider } from "./src/database/connection";

export default function App() {
  const [fontsLoaded] = Font.useFonts({
    "Poppins-regular": require("./src/assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("./src/assets/fonts/Poppins-Medium.ttf"),
    "Poppins-bold": require("./src/assets/fonts/Poppins-Bold.ttf"),
    "Poppins-extraBold": require("./src/assets/fonts/Poppins-ExtraBold.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={{ height: "100%", width: "100%" }}>
      <NativeBaseProvider theme={theme}>
        <DatabaseConnectionProvider>
          <StatusBar backgroundColor="black" />
          <Routes />
        </DatabaseConnectionProvider>
      </NativeBaseProvider>
    </View>
  );
}
