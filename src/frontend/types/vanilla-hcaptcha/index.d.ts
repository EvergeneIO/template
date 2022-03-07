interface hcaptcha {
  execute(): void;
  reset(): void;
  remove(): void;
}

declare var hcaptcha: hcaptcha;
declare module "vanilla-hcaptcha" {
  export = hcaptcha;
}
