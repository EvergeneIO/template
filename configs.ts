export const configs = {
  general: {
    port: 8081,
    hostname: "localhost",
    env: "dev",
  },
  database: {
    host: "localhost",
    port: 5432,
    user: "dbtech",
    password: "dbtech",
    database: "dbtech",
    redis: {
      hostname: "localhost",
      port: 6379,
    },
  },
  fernet: {
    client: {
      secret: "Gbjgey3y7DMWxIS9Cn57oy3IirVCFgPrKN1O4WxbOnE=",
      live: 604800000,
    },
    application: {
      secret: "yhgtanmeNkl8biWrKqkCI8FrbN2ZpIKWX2yz_KCp3T8=",
    },
    bearer: {
      secret: "ctVPc5jAs9HKy_ADytep_G_nEUaC4x4jLb3veMmdqmU=",
      live: 604800000,
    },
  },
  captcha: {
    secret: "0xD639d5350830189036A084Cb23A1E4A8128C07b5",
    siteKey: "0d3ed5c8-da4a-4b1f-946e-d34acc5ad477",
  },
  oauth: {
    google: {
      clientId: "384965754452-0tntmi1hdg1b2l2rjnjf1nms7prhojoe.apps.googleusercontent.com",
      clientSecret: "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",
      scopes: ["https://www.googleapis.com/auth/youtube.force-ssl"] as string[],
      parts: {
        channel: ["snippet", "contentDetails", "statistics", "brandingSettings"] as string[],
        playlist: ["snippet", "contentDetails", "status", "id"] as string[],
      },
      redirectUri: "http://localhost:8080/auth/callback",
    },
  },
  discord: {
    bot: "ODkwMDA3MjA1MjAwNDA4NjA3.YUphzQ.OEfdQnyeTCp_xMcAYzIWM3uklTg",
    server: "861608165304958995",
  },
  mail: {
    server: "mail.evergene.io",
    port: 465,
    username: "noreply@vetault.com",
    password: "5JrbrzQ8*KiE!FCnx9VvM#4S^Kf@Z$4^4qAuxUz&NBRccAY9jkY2HqFudof8^kp",
  },
};
export default configs;
