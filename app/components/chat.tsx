import { SerializedMessage } from "app/types";

import { OneMessage } from "./oneMessage";

interface Props {
  messages: SerializedMessage[];
}

export function Chat({ messages }: Props) {
  return (
    <div>
      {messages.map((message) => (
        <OneMessage message={message} />
      ))}
    </div>
  );
}
