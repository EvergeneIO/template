/* import { ScriptsConfiguration } from "https://deno.land/x/velociraptor@1.1.0/src/scripts_config.ts";

export default {
  scripts: {
    start: {
      cmd: "mod.ts",
      unstable: true,
      allow: ["net", "read", "env", "run"],
    },
    migrate: {
      cmd: "https://deno.land/x/nessie@2.0.0/cli.ts migrate",
      unstable: true,
      allow: ["net", "read", "env"],
    },
    rollback: {
      cmd: "https://deno.land/x/nessie@2.0.0/cli.ts rollback",
      unstable: true,
      allow: ["net", "read", "env"],
    },
    dev: {
      cmd: "mod.ts",
      allow: ["net", "read", "env", "run"],
      watch: true,
      unstable: true,
    },
    create: {
      cmd: "./commands/mod.ts",
      allow: ["net", "read", "env", "run", "write"],
      unstable: true,
    },
  },
} as ScriptsConfiguration;
 */

Deno.run({
  cmd: ["deno", "run", "--allow-net", "--allow-read", "--allow-env", "--allow-run", "mod.ts"],
});
