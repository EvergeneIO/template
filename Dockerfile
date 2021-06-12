FROM denoland/deno:alpine-1.11.0

USER deno

WORKDIR /app

COPY . .

RUN deno cache --unstable mod.ts

CMD [ "deno", "run", "--allow-env", "--allow-read", "--allow-write", "--allow-net", "--unstable", "./mod.ts" ]