import AsyncStorage from '@react-native-async-storage/async-storage';

export async function persistData<T>(key: string, value: T): Promise<void> {
  const jsonValue = JSON.stringify(value);
  await AsyncStorage.setItem(key, jsonValue);
}

export async function getPersistedData<T>(key: string): Promise<T | null> {
  const jsonValue = await AsyncStorage.getItem(key);

  return jsonValue === null ? null : JSON.parse(jsonValue);
}
