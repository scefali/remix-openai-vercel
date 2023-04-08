import { FaUserCircle } from "react-icons/fa";
import {SiRemix} from "react-icons/si";
import type { SerializedMessage } from "app/types";

export function OneMessage({ message }: { message: SerializedMessage }) {
  const { isBot } = message;
  return (
    <div className='flex'>
      {isBot ? <SiRemix /> : <FaUserCircle />}
      <span>{message.text}</span>
    </div>
  );
}
