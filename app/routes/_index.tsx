import type { V2_MetaFunction } from "@vercel/remix";
import { Suspense } from "react";
import { Await, Form, useLoaderData, useActionData } from "@remix-run/react";
import { ActionArgs, json } from "@vercel/remix";
import { Button, Textarea } from "flowbite-react";
import { defer } from "@vercel/remix";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

import type { Message } from "app/types";
import { getCompletion } from "app/chat";
import { sessionId as sessionIdCookie } from "app/cookies";
import { Chat } from "app/components/chat";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Remix Open AI" }];
};

export async function loader({
  request,
}: ActionArgs): Promise<{ messages: Message[] }> {
  const prisma = new PrismaClient();
  const cookieHeader = request.headers.get("Cookie");
  // async to get data from request
  const sessionId = await sessionIdCookie.parse(cookieHeader);
  if (sessionId && typeof sessionId === "string") {
    const messages: Message[] = await prisma.message.findMany({
      where: { sessionId },
    });
    return { messages };
  }
  return { messages: [] };
}

export async function action({ request }: ActionArgs) {
  const prisma = new PrismaClient();
  const cookieHeader = request.headers.get("Cookie");
  // async to get data from request
  const [cookie, requestText] = await Promise.all([
    sessionIdCookie.parse(cookieHeader),
    request.text(),
  ]);
  const form = new URLSearchParams(requestText);
  const userInput = form.get("userInput");
  if (!userInput) {
    return json({ error: { message: "No input" } }, { status: 400 });
  }
  console.log({ cookie });
  const sessionId = cookie || uuidv4();
  const [_message, response] = await Promise.all([
    prisma.message.create({
      data: {
        text: userInput,
        sessionId,
        isBot: false,
      },
    }),
    getCompletion(userInput || ""),
  ]);
  // now make the response
  await prisma.message.create({
    data: {
      text: response || "",
      sessionId,
      isBot: true,
    },
  });

  // TODO: respond with all messages
  return new Response(JSON.stringify({ response }), {
    headers: {
      "Set-Cookie": await sessionIdCookie.serialize(sessionId),
      "Content-Type": "application/json",
    },
  });
}

export default function App() {
  const data = useActionData<typeof action>();
  const { messages } = useLoaderData<typeof loader>();
  console.log({ messages });

  return (
    <div className="flex-auto w-full">
      <h1 className="">Remix Open AI</h1>
      <Chat messages={messages} />
      <Form method="post" className="flex gap-4 max-width max-w-3xl	">
        <Textarea
          placeholder="Type in..."
          name="userInput"
          className="w-full"
        />
        <Button className="btn btn-blue" type="submit">
          Send
        </Button>
      </Form>
      {data && <p>{data.response}</p>}
    </div>
  );
}
