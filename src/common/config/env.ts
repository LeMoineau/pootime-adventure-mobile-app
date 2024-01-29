export interface Config {
  BATTLE_SERVER_URL: string;
  ENV: string;
}

export function getConfig(): Config {
  return {
    BATTLE_SERVER_URL: process.env.PUBLIC_EXPO_BATTLE_SERVER_URL,
    ENV: process.env.NODE_ENV,
  };
}
