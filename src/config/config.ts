export interface Env {
  BATTLE_SERVER_URL: string;
  ENV: string;
}

class Config {
  constructor() {}

  public getEnv(): Env {
    return {
      BATTLE_SERVER_URL: process.env.PUBLIC_EXPO_BATTLE_SERVER_URL!,
      ENV: process.env.NODE_ENV!,
    };
  }
}

export default new Config();
