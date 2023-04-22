import { Form } from "@remix-run/react";
import { Textarea } from "flowbite-react";
import { BsSend } from "react-icons/bs";

export default function SubmitForm() {
  return (
    <Form method="post" className="flex gap-4 max-width max-w-3xl	relative">
      <Textarea
        placeholder="Type in..."
        name="userInput"
        className="w-full"
        style={{ minHeight: "50px" }}
      />
      <button className="absolute right-2 bottom-2" type="submit">
        <BsSend />
      </button>
    </Form>
  );
}
