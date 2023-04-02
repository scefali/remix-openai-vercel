import { Suspense } from "react";
import { Await, Form, useLoaderData, useActionData } from "@remix-run/react";
import { ActionArgs, json } from "@vercel/remix";
import { defer } from "@vercel/remix";

import { getCompletion } from "app/chat";

export async function loader({ request }: ActionArgs) {
  const version = process.versions.node;

  return defer({
    version: sleep(version, 1000),
  });
}

export async function action({ request }: ActionArgs) {
  const form = new URLSearchParams(await request.text());
  const userInput = form.get("userInput");
  const response = await getCompletion(userInput || '');

  return json({ response });
}

function sleep(val: string, ms: number) {
  return new Promise((resolve) => setTimeout(() => resolve(val), ms));
}

export default function App() {
  const { version } = useLoaderData();
  const data = useActionData<typeof action>();

  return (
    <div className="flex-auto w-full">
      <h1>Type in stuff</h1>
      <Form method="post">
        <input placeholder="type" type="text" name="userInput" />
        <button type="submit">Submit</button>
      </Form>
      <Suspense fallback={"Loading…"}>
        <Await resolve={version}>
          {(version) => <strong>{version}</strong>}
        </Await>
      </Suspense>
      {data && <p>{data.response}</p>}
    </div>
  );
}
