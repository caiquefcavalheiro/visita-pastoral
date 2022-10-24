import { createContext, ReactNode, useContext, useState } from "react";
import * as ScreenOrientation from "expo-screen-orientation";

interface OrientationProviderProps {
  children: ReactNode;
}

interface OrientationContextData {
  toggleOrientation: (type: "horizontal" | "vertical") => void;
  orientationIsLandscape: boolean;
}

const Context = createContext({} as OrientationContextData);

const useOrientation = () => {
  const context = useContext(Context);

  return context;
};

const OrientationProvider = ({ children }: OrientationProviderProps) => {
  const [orientationIsLandscape, setOrientation] = useState(true);

  const changeScreenOrientation = async (orientation: boolean) => {
    if (orientation == true) {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
      );
    } else if (orientation == false) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  };

  const toggleOrientation = async (type: "horizontal" | "vertical") => {
    if (type === "horizontal") {
      setOrientation(true);
      await changeScreenOrientation(true);
    } else {
      setOrientation(false);
      await changeScreenOrientation(false);
    }
  };

  return (
    <Context.Provider value={{ toggleOrientation, orientationIsLandscape }}>
      {children}
    </Context.Provider>
  );
};

export { OrientationProvider, useOrientation };
