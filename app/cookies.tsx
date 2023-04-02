import { createCookie } from "@vercel/remix";

export const sessionId = createCookie("sessionid", {
  maxAge: 604_800, // one week
});
