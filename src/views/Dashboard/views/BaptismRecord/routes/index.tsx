import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { memo } from "react";

import BaptismRecord from "..";
import Signatures from "../views/Signatures";

const { Navigator, Screen } = createNativeStackNavigator();

function BaptismRecordRoutes() {
  return (
    <Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="BaptismRecord"
    >
      <Screen name="BaptismRecord" component={BaptismRecord} />
      <Screen name="Signatures" component={Signatures} />
    </Navigator>
  );
}

export default memo(BaptismRecordRoutes);
