import { extendTheme, NativeBaseProvider } from "native-base";
import { Provider } from "./src/contexts";
import { Routes } from "./src/routes";
import { theme } from "./src/theme/theme";

export const customTheme = extendTheme({ theme });

type MyThemeType = typeof customTheme;

declare module "native-base" {
  interface ICustomTheme extends MyThemeType {}
}

export default function App() {
  return (
    <NativeBaseProvider theme={customTheme}>
      <Provider>
        <Routes />
      </Provider>
    </NativeBaseProvider>
  );
}
