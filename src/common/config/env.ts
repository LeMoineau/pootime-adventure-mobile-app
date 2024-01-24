export interface Config {
  BATTLE_SERVER_URL: string;
}

export function getConfig(): Config {
  return {
    BATTLE_SERVER_URL: (process.env as any).PUBLIC_EXPO_BATTLE_SERVER_URL,
  };
}
