import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function getCompletion(prompt: string) {
  const response = await openai.createCompletion(
    {
      model: process.env.OPEN_API_MODEL ?? "text-davinci-003",
      prompt,
    },
    {
      timeout: 10_000,
    }
  );
  console.log(response.data);
  return response.data.choices[0].text;
}
