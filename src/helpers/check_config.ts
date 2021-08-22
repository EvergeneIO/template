export function checkConfig(config: string) {
  const conf = Deno.env.get(config);
  if (conf === undefined) throw new Error("something wrong with config");
  return conf;
}
