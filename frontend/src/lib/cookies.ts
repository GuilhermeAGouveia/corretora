import { parseCookies, setCookie } from "nookies";

export function getCookie(name: string, ctx: any = undefined) {
  const cookies = parseCookies(ctx);
  return cookies[name];
}

export function setCookieWithOptions(
  name: string,
  value: string,
  options: any,
  ctx: any = undefined
) {
  setCookie(ctx, name, value, options);
}