import { Form } from "@remix-run/react";
import { Textarea } from "flowbite-react";
import { BsSend } from "react-icons/bs";

export default function SubmitForm() {
  return (
    <Form
      method="post"
      className="flex gap-4 max-width fixed bottom-0 left-0 w-full bg-transparent bg-white	"
      reloadDocument
      action=""
      // onSubmit={async (event) => {
      //   debugger;
      // }}
    >
      <div className="mx-auto relative p-4">
        <Textarea
          placeholder="Type in..."
          name="userInput"
          className="w-full m-auto"
          style={{ minHeight: "50px", width: "48em" }}
          defaultValue=""
        />
        <button className="absolute right-6 bottom-6" type="submit">
          <BsSend />
        </button>
      </div>
    </Form>
  );
}
