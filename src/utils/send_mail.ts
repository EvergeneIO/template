import configs from "../../configs.ts";
import { SmtpClient } from "../../deps.ts";

const client = new SmtpClient();

export async function sendMail(mail: string, subject: string, content: string, html: string) {
  await client.connectTLS({
    hostname: configs.mail.server,
    port: configs.mail.port,
    username: configs.mail.username,
    password: configs.mail.password,
  });

  await client.send({
    from: `Vetault No Reply <${configs.mail.username}>`,
    to: mail,
    subject,
    content,
    html,
  });

  await client.close();
}
