import { printAsync } from "expo-print";

export const print = async (html: string) => {
  await printAsync({
    html,
    margins: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 20,
    },
  });
};
