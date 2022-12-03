import { registerRootComponent } from "expo";
import { Text, TextInput } from "react-native";

import App from "./App";

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.maxFontSizeMultiplier = 1;
TextInput.defaultProps = Text.defaultProps || {};
TextInput.defaultProps.maxFontSizeMultiplier = 1;
registerRootComponent(App);
