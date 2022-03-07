/**
 * EmailEngine
 * @author @NewtTheWolf
 */

async function _fetch(url: string, method: string, auth: string, data: any) {
  return await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${auth}`,
    },
    body: JSON.stringify(data),
  }).then((res) => res.json);
}

export class EE {
  _url: string;
  _auth?: string;

  constructor(url: string, auth?: string) {
    this._url = url;
    this._auth = auth;
  }
  get = {
    account: {
      info() {},
      accounts() {},
      text() {},
    },
    logs() {},
    mailbox: {
      list() {},
    },
    message: {
      attachment() {},
      info() {},
      raw() {},
      list() {},
      text() {},
    },
    settings: {
      list() {},
    },
    stats: {
      list() {},
    },
  };
  post = {
    account: {
      async create(data: {
        account: string;
        name: string;
        copy: boolean;
        notifyFrom: string;
        imap: {
          auth: {
            user: string;
            pass: string;
          };
          host: string;
          port: number;
          secure: boolean;
          tls: {
            rejectUnauthorized: boolean;
            minVersion: string;
          };
          resyncDelay: number;
        };
        smtp: {
          auth: {
            user: string;
            pass: string;
          };
          host: string;
          port: number;
          secure: boolean;
          tls: {
            rejectUnauthorized: boolean;
            minVersion: string;
          };
        };
      }) {
        await _fetch(this._url, "POST", this._auth, data);
      },
      verifyAccount() {},
      searchMessage() {},
      sendMessage() {},
    },
    mailbox: {
      create() {},
    },
    message: {
      upload() {},
      search() {},
      submit() {},
    },
    settings: {
      update() {},
    },
  };
  put = {
    account: {
      reconnect() {},
      update() {},
    },
    message: {
      update() {},
      move() {},
    },
  };
  delete = {
    account: {
      delete() {},
    },
    mailbox: {
      delete() {},
    },
    message: {
      delete() {},
    },
  };
}

const e = new EE("", "");

const data = {
  account: "${user?.id}-${id}",
  name: "body.name",
  copy: true,
  notifyFrom: "2021-12-01T00:00:00.000Z",
  imap: {
    auth: {
      user: "body.email",
      pass: "body.password",
    },
    host: "mail.evergene.io",
    port: 143,
    secure: true,
    tls: {
      rejectUnauthorized: true,
      minVersion: "TLSv1.2",
    },
    resyncDelay: 900,
  },
  smtp: {
    auth: {
      user: "body.email",
      pass: "body.password",
    },
    host: "mail.evergene.io",
    port: 465,
    secure: true,
    tls: {
      rejectUnauthorized: true,
      minVersion: "TLSv1.2",
    },
  },
};

e.post.account.create(data);
