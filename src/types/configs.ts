export interface Configs {
  port: number;
  host: string;
  logLevel: number;
  databaseHost: string;
  databasePort: number;
  databaseUser: string;
  databasePassword: string;
  database: string;
  accessTokenLiveTime: number;
  refreshTokenLiveTime: number;
  logoutRedirectUri: string;
  env: string;
}
