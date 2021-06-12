FROM denoland/deno:alpine-1.10.3

USER deno

WORKDIR /app

COPY . .

RUN deno cache --unstable mod.ts

CMD [ "deno", "run", "--allow-env", "--allow-read", "--allow-write", "--allow-net", "--unstable", "./mod.ts" ]