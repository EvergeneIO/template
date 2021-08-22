export function buildBody(json: Record<string, string>) {
  const formBody: string[] = [];
  for (const prop in json) {
    const encodedKey = encodeURIComponent(prop);
    const encodedValue = encodeURIComponent(json[prop]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  return formBody.join("&");
}
