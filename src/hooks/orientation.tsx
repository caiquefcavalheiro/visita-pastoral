import * as ScreenOrientation from "expo-screen-orientation";

interface OrientationData {
  toggleOrientation: (type: "horizontal" | "vertical") => void;
}

export function useOrientation(): OrientationData {
  async function toggleOrientation(type: "horizontal" | "vertical") {
    if (type === "horizontal") {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
      );
    } else {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  }

  return { toggleOrientation };
}
