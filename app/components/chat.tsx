import type { SerializedMessage } from "app/types";
import { GrPowerReset } from "react-icons/gr";

import { OneMessage } from "./oneMessage";

interface Props {
  messages: SerializedMessage[];
  handleClear: () => void;
}

export function Chat({ messages, handleClear }: Props) {
  return (
    <div>
      <div className="float-right" onClick={() => handleClear()}>
        <GrPowerReset />
      </div>
      {messages.map((message) => (
        <OneMessage message={message} key={message.id} />
      ))}
    </div>
  );
}
