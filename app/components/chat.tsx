import type { SerializedMessage } from "app/types";
import { GrPowerReset } from "react-icons/gr";

import { OneMessage } from "./oneMessage";
import { Button } from "flowbite-react";

interface Props {
  messages: SerializedMessage[];
  handleClear: () => void;
}

export function Chat({ messages, handleClear }: Props) {
  return (
    <div>
      <form
        className="max-w-3xl relative mx-auto justify-end	flex"
        method="post"
        onSubmit={() => handleClear()}
      >
        <Button  color="light" type="submit" size="xs">
          <GrPowerReset className="mr-2 h-5 w-5" />
          Clear Chat
        </Button>
      </form>
      {messages.map((message) => (
        <OneMessage message={message} key={message.id} />
      ))}
    </div>
  );
}
