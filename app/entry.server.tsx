import { handleRequest } from "@vercel/remix";
import { RemixServer } from "@remix-run/react";
import type { EntryContext } from "@vercel/remix";
import * as Sentry from "@sentry/remix";

import prisma from '~/db';

console.log('start')

Sentry.init({
  dsn: "https://9a0a59d590ba4813a885f4b046dde1af:19c54598fd1043d3a27dc8f5cc5e3c36@o4505059212656640.ingest.sentry.io/4505059215081472",
  tracesSampleRate: 1,
  integrations: [new Sentry.Integrations.Prisma({ client: prisma })],
});

export default function (
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const remixServer = <RemixServer context={remixContext} url={request.url} />;
  return handleRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixServer
  );
}
