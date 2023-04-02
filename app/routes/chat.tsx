import { Suspense } from 'react';
import { Await, useLoaderData } from '@remix-run/react';
import { defer } from '@vercel/remix';

export async function loader({ request }) {
  const version = process.versions.node;

  return defer({
    version: sleep(version, 1000),
  });
}

function sleep(val, ms) {
  return new Promise((resolve) => setTimeout(() => resolve(val), ms));
}

export default function App() {
  const { version } = useLoaderData();
  
  return (
    <Suspense fallback={'Loading…'}>
      <Await resolve={version}>
        {(version) => <strong>{version}</strong>}
      </Await>
    </Suspense>
  );
}