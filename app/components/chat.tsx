import type { SerializedMessage } from "app/types";
import { GrPowerReset } from "react-icons/gr";

import { OneMessage } from "./oneMessage";
import { Button } from "flowbite-react";
import { Fragment } from "react";
import { Form } from '@remix-run/react';

interface Props {
  messages: SerializedMessage[];
  handleClear: () => void;
}

export function Chat({ messages, handleClear }: Props) {
  return (
    <Fragment>
      <Form
        className="fixed w-full"
        method="post"
        action=""
        onSubmit={() => handleClear()}
      >
        {messages.length > 0 ? (
          <div className="mx-auto max-w-3xl justify-end flex">
            <Button color="light" type="submit" size="xs">
              <GrPowerReset className="mr-2 h-5 w-5" />
              Clear Chat
            </Button>
          </div>
        ) : null}
      </Form>
      {messages.map((message) => (
        <OneMessage message={message} key={message.id} />
      ))}
    </Fragment>
  );
}
