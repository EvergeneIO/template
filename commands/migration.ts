import { existsSync, format } from "../deps.ts";
import { logger } from "../src/utils/mod.ts";
export async function copy(name: string | undefined) {
  const fileName = `${format(new Date(Date.now()), "yyyyMMddHHmmss")}_${name}.ts`;
  logger.debug("starts writing a new migration");
  if (existsSync(`./src/database/migrations/${fileName}`)) {
    logger.error(`migration ${fileName} already exists! please try again with a different name`);
    return;
  }
  const encoder = new TextEncoder();
  const data = encoder.encode(`
  import { AbstractMigration, ClientPostgreSQL } from "../../../deps.ts";
  import { runQuery } from "../database.ts"

  export default class extends AbstractMigration<ClientPostgreSQL> {
      /** Runs on migrate */
      async up(): Promise<void> {
          await runQuery(\`\`)
      }

      /** Runs on rollback */
      async down(): Promise<void> {
          await runQuery(\`\`);
      }
  }
  `);
  await Deno.writeFile(`./src/database/migrations/${fileName}`, data);
  logger.info(`the migration ${fileName} was created`);
}

export default copy;

// import { AbstractMigration, ClientPostgreSQL } from "../../../deps.ts";
// import { runQuery } from "../database.ts"

// export default class extends AbstractMigration<ClientPostgreSQL> {
//     /** Runs on migrate */
//     async up(): Promise<void> {
//         await runQuery(``)
//     }

//     /** Runs on rollback */
//     async down(): Promise<void> {
//         await runQuery(``);
//     }
// }
