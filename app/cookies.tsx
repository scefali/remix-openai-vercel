import { createCookie } from "@vercel/remix";

const sessionIdCookie = "sessionid";

export const sessionId = createCookie(sessionIdCookie, {
  maxAge: 604_800, // one week
});

function eraseCookie(name: string) {
  document.cookie = name + "=; Max-Age=-99999999;";
}

export function clearSession() {
  eraseCookie(sessionIdCookie);
}
