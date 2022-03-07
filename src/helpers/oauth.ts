/* import configs from "../../configs.ts";
import { helpers, httpErrors } from "../../deps.ts";
import { Context } from "../types/mod.ts";
import { buildBody } from "../utils/mod.ts";

const endpoints = {
  discord: "https://discord.com/api/oauth2/token",
  github: "https://github.com/login/oauth/access_token",
  twitter: "{}",
  google: "{}",
};

export async function oauth2(
  // deno-lint-ignore no-explicit-any
  provider: any,
  context: Context
) {
  const accessCode = helpers.getQuery(context).code;

  if (!accessCode) {
    const error = helpers.getQuery(context).error;
    if (!error) throw new httpErrors.BadRequest(`no acces code from ${provider}`);
    throw new httpErrors.BadRequest(error);
  }

  if (provider.toLowerCase() === "discord") {
    const data = new FormData();
    data.append("client_id", configs.oauth.discord.clientId);
    data.append("client_secret", configs.oauth.discord.clientSecret);
    data.append("grant_type", "authorization_code");
    data.append("redirect_uri", configs.oauth.discord.redirectUri);
    data.append("scope", configs.oauth.discord.scopes.join(" "));
    data.append("code", accessCode);

    return await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: data,
    }).then((res) => res.json());
  }

  if (provider.toLowerCase() === "github") {
    const data = new FormData();
    data.append("client_id", configs.oauth.github.clientId);
    data.append("client_secret", configs.oauth.github.clientSecret);
    data.append("grant_type", "authorization_code");
    data.append("redirect_uri", configs.oauth.github.redirectUri);
    data.append("scope", configs.oauth.github.scopes.join(" "));
    data.append("code", accessCode);

    return await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: data,
    }).then((res) => res.json());
  }
}
 */
