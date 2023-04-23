import { FaUserCircle } from "react-icons/fa";
import { GrServers } from "react-icons/gr";
import type { SerializedMessage } from "app/types";

export function OneMessage({ message }: { message: SerializedMessage }) {
  const { isBot } = message;
  const iconProps = { size: 24 };
  return (
    <div className={`${isBot ? "bg-slate-100" : ""}`}>
      <div className="md:max-w-2xl lg:max-w-xl xl:max-w-3xl p-4 flex lg:px-0 m-auto gap-2">
        <div className="w-[30px] m-1">
          {isBot ? <GrServers {...iconProps} /> : <FaUserCircle {...iconProps} />}
        </div>
        <span>{message.text}</span>
      </div>
    </div>
  );
}
