import * as ScreenOrientation from "expo-screen-orientation";

interface OrientationData {
  toggleOrientation(type: "horizontal" | "vertical"): Promise<void>;
}

export function useOrientation(): OrientationData {
  async function toggleOrientation(type: "horizontal" | "vertical") {
    if (type === "horizontal") {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
      );
    } else {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    }
  }

  return { toggleOrientation };
}
