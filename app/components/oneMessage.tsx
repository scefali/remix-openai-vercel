import { FaUserCircle } from "react-icons/fa";
import {SiRemix} from "react-icons/si";
import type { SerializedMessage } from "app/types";

export function OneMessage({ message }: { message: SerializedMessage }) {
  const { isBot } = message;
  return (
    <div className='text-base gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0 m-auto'>
      {isBot ? <SiRemix /> : <FaUserCircle />}
      <span>{message.text}</span>
    </div>
  );
}
