# API Template

You need to Install PostgreSQL
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
```

Install Velociraptor

```sh
deno install -qAn vr https://deno.land/x/velociraptor@1.0.0/cli.ts
```

than you can Start the App with

```sh
vr dev
```
