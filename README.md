# Template

<a href="https://github.com/EvergeneIO/template/blob/main/LICENSE"><img alt="GitHub license" src="https://img.shields.io/github/license/evergeneIO/template"></a> <a href="https://discord.gg/H2KjMTervM"><img alt="Discord" src="https://img.shields.io/discord/710781300100956170?color=blue&label=Support"> </a> <a href="https://deno.land/"><img alt="Discord" src="https://img.shields.io/badge/Deno%20Version-1.13.1-lightgrey"></a>

## Usage

For the template you need a working PostgreSQL go to the [PostgreSQL](https://www.postgresql.org/) website.

Copy `.env.example` to `.env`

```env
PORT=
HOST=""
ENV="dev"
LOG_LEVEL=

DATABASE_HOST=""
DATABASE_PORT=
DATABASE_USER=""
DATABASE_PASSWORD=""
DATABASE=""

# How long in SECCONDS you want the access token to be valid
ACCESS_TOKEN_LIVE_TIME=
# How long in SECCONDS you want the refresh token to be valid
REFRESH_TOKEN_LIVE_TIME=

LOGOUT_REDIRECT_URI=""
```

after that you can start the app with:

```sh
npm run dev
```
