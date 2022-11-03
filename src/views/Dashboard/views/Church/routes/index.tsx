import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { memo } from "react";
import Church from "..";

const { Navigator, Screen } = createNativeStackNavigator();

function ChurchRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Church">
      <Screen name="Church" component={Church} />
    </Navigator>
  );
}

export default memo(ChurchRoutes);
