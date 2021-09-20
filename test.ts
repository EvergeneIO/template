import { createSecret, createFernet } from "https://deno.land/x/fernet@0.2.0/fernet.ts";

const secret = createSecret();

const fernet = createFernet("2QfmroNvLnWyHnFRcv5_oCGMU-HrPGl3Jzl74YLNtt4=");

const token = fernet.encode(
  JSON.stringify({
    test: true,
    expires: Date.now() + 5000,
  })
);

const dec = fernet.decode(token);

console.log("TOKEN: ", token);
console.log("DEC: ", JSON.parse(new TextDecoder().decode(dec)));
console.log(fernet);
