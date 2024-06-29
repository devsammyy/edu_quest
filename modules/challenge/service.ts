import * as SecureStore from "expo-secure-store";

export const saveData = async (key: string, value: any) => {
  await SecureStore.setItemAsync(key, JSON.stringify(value));
};

export const getData = async (key: string) => {
  const value = await SecureStore.getItemAsync(key);
  return value ? JSON.parse(value) : null;
};

export const deleteData = async (key: string) => {
  await SecureStore.deleteItemAsync(key);
};
