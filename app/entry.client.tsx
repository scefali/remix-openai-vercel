/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/docs/en/main/file-conventions/entry.client
 */

import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { useLocation, useMatches } from "@remix-run/react";
import * as Sentry from "@sentry/remix";
import { useEffect } from "react";

Sentry.init({
  dsn: "https://9a0a59d590ba4813a885f4b046dde1af:19c54598fd1043d3a27dc8f5cc5e3c36@o4505059212656640.ingest.sentry.io/4505059215081472",
  tracesSampleRate: 1,
  integrations: [
    new Sentry.BrowserTracing({
      routingInstrumentation: Sentry.remixRouterInstrumentation(
        useEffect,
        useLocation,
        useMatches
      ),
    }),
  ],
});

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <RemixBrowser />
    </StrictMode>
  );
});
