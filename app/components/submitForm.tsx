import { Form } from "@remix-run/react";
import { Textarea } from "flowbite-react";
import { BsSend } from "react-icons/bs";

export default function SubmitForm({ lockInput }: { lockInput?: boolean }) {
  return (
    <Form
      method="post"
      className="flex gap-4 max-width fixed bottom-0 left-0 w-full bg-transparent bg-white"
      // reloadDocument
      action="?index"
      id="text-input-form"
    >
      <div className="mx-auto relative p-4">
        <Textarea
          placeholder="Type in..."
          name="userInput"
          id="userInput"
          className="w-full m-auto"
          style={{ minHeight: "50px", width: "48em" }}
          defaultValue=""
          disabled={lockInput}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              (e.target as any).form.submit();
            }
          }}
        />
        <button className="absolute right-6 bottom-6" type="submit">
          <BsSend />
        </button>
      </div>
    </Form>
  );
}
