import AsyncStorage from "@react-native-async-storage/async-storage";

export const setStorage = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    return false;
  }
};

export const getStorage = async (key: string): Promise<string | boolean> => {
  try {
    const value = await AsyncStorage.getItem(key);

    if (value !== null) {
      return JSON.parse(value);
    }
    return false;
  } catch (e) {
    return false;
  }
};
