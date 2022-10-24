import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Dashboard from "../views/Dashboard";
import Chuch from "../views/Church";
import Families from "../views/Families";
import PastoralVisit from "../views/PastoralVisit";
import PastoralVisitQuestions from "../views/PastoralVisit/PastoralVisitQuestions";
import Positions from "../views/Positions";
import PeopleAndTheirPositions from "../views/Positions/PeopleAndTheirPositions";
import Sermons from "../views/Sermons";
import Signatures from "../views/Signatures";
import BaptismRecord from "../views/BaptismRecord";

const { Navigator, Screen } = createNativeStackNavigator();

export function Routes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="Dashboard" component={Dashboard} />
        <Screen name="Chuch" component={Chuch} />
        <Screen name="Families" component={Families} />
        <Screen name="PastoralVisit" component={PastoralVisit} />
        <Screen
          name="PastoralVisitQuestions"
          component={PastoralVisitQuestions}
        />
        <Screen name="Positions" component={Positions} />
        <Screen
          name="PeopleAndTheirPositions"
          component={PeopleAndTheirPositions}
        />
        <Screen name="Sermons" component={Sermons} />
        <Screen name="Signatures" component={Signatures} />
        <Screen name="BaptismRecord" component={BaptismRecord} />
      </Navigator>
    </NavigationContainer>
  );
}
