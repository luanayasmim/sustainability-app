import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_NAME_KEY = "sustainability-app:user-name";
const userNameListeners = new Set<(name: string) => void>();

export function subscribeToUserName(
  listener: (name: string) => void,
): () => void {
  userNameListeners.add(listener);

  return () => {
    userNameListeners.delete(listener);
  };
}

export async function getUserName(): Promise<string | null> {
  const name = await AsyncStorage.getItem(USER_NAME_KEY);
  const normalizedName = name?.trim();

  return normalizedName ? normalizedName : null;
}

export async function saveUserName(name: string): Promise<void> {
  const normalizedName = name.trim();

  if (!normalizedName) {
    throw new Error("O nome do usuário não pode ficar vazio.");
  }

  await AsyncStorage.setItem(USER_NAME_KEY, normalizedName);
  userNameListeners.forEach((listener) => listener(normalizedName));
}
