export function checkConfig(config: string) {
  const conf = Deno.env.get(config);
  if (conf === undefined) throw new Error(`Can't find Config: ${config}`);
  return conf;
}
