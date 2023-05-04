import type { V2_MetaFunction } from "@vercel/remix";
import { useCallback, useEffect, useState } from "react";
import { useLoaderData, useNavigation } from "@remix-run/react";
import { ActionArgs, json } from "@vercel/remix";
import { v4 as uuidv4 } from "uuid";

import type { Message, SerializedMessage } from "app/types";
import { getCompletion } from "app/chat";
import { sessionId as sessionIdCookie, clearSession } from "app/cookies";
import { Chat } from "app/components/chat";
import SubmitForm from "app/components/submitForm";
import prisma from "~/db";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Remix Open AI" }];
};

export async function loader({ request }: ActionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  // async to get data from request
  const _sessionId = await sessionIdCookie.parse(cookieHeader);
  const sessionId = _sessionId || uuidv4();
  let messages: Message[] = [];
  if (_sessionId) {
    messages = await prisma.message.findMany({
      where: { sessionId },
    });
  }
  return new Response(JSON.stringify({ messages }), {
    headers: {
      "Set-Cookie": await sessionIdCookie.serialize(sessionId),
      "Content-Type": "application/json",
    },
  });
}

export async function action({ request }: ActionArgs) {
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
  // do we need to generate a default sessionId?
  const sessionId = cookie || uuidv4();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [message, response] = await Promise.all([
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
  return new Response(JSON.stringify({ messages: ["test"] }), {
    headers: {
      "Set-Cookie": await sessionIdCookie.serialize(sessionId),
      "Content-Type": "application/json",
    },
  });
}

export default function App() {
  const { messages }: { messages: SerializedMessage[] } =
    useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const [localMessages, setLocalMessages] = useState(messages);

  // add in the user input in an optimistic update
  const userInput = navigation.formData?.get("userInput");
  useEffect(() => {
    if (userInput && typeof userInput === "string") {
      setLocalMessages((prev) => [
        ...prev,
        {
          text: userInput,
          isBot: false,
          id: -1,
          sessionId: "",
          createdAt: new Date().toDateString(),
        },
      ]);
    }
  }, [userInput]);

  const clearMessages = useCallback(() => {
    clearSession();
    setLocalMessages([]);
  }, []);

  const lockInput = navigation.state === "submitting"

  return (
    <div className="flex-auto w-full p-4 pb-20">
      <Chat messages={localMessages} handleClear={clearMessages} />
      <SubmitForm lockInput={lockInput} />
    </div>
  );
}
