import { ScriptsConfiguration } from "https://deno.land/x/velociraptor@1.2.0/src/scripts_config.ts";

export default {
  scripts: {
    start: {
      cmd: "mod.ts",
      unstable: true,
      allow: ["net", "read", "env", "run"],
    },
    migrate: {
      cmd: "https://deno.land/x/nessie@2.0.4/cli.ts migrate",
      unstable: true,
      allow: ["net", "read", "env"],
      noCheck: true,
    },
    migration: {
      cmd: "https://deno.land/x/nessie@2.0.4/cli.ts make:migration",
      unstable: true,
      allow: ["net", "read", "write", "env"],
    },
    seed: {
      cmd: "https://deno.land/x/nessie@2.0.4/cli.ts seed",
      unstable: true,
      allow: ["net", "read", "env"],
    },
    rollback: {
      cmd: "https://deno.land/x/nessie@2.0.4/cli.ts rollback",
      unstable: true,
      allow: ["net", "read", "env"],
    },
    dev: {
      cmd: "mod.ts",
      allow: ["net", "read", "env", "run"],
      watch: true,
      unstable: true,
      noCheck: true,
    },
    create: {
      cmd: "./commands/mod.ts",
      allow: ["net", "read", "env", "run", "write"],
      unstable: true,
    },
  },
} as ScriptsConfiguration;
