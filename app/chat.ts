import { Configuration, OpenAIApi } from "openai";
import axios from "axios";
import type { AxiosError } from "axios";
// import { OpenAI } from 'openai-streams'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function getCompletion(prompt: string) {
  // const stream = await OpenAI(
  //   "completions",
  //   {
  //     model: "text-davinci-003",
  //     prompt,
  //     max_tokens: 100
  //   }
  // );
  try {
    const response = await openai.createCompletion(
      {
        model: process.env.OPEN_API_MODEL ?? "text-davinci-003",
        prompt,
        max_tokens: 3000,
      },
      {
        timeout: 10_000,
      }
    );
    return response.data.choices[0].text;
  } catch (error) {
    // Give a bertter error message back
    if (axios.isAxiosError(error) && (error as AxiosError).response) {
      console.log(error)
      throw new Error((error as AxiosError).response?.data?.error?.message);
    }
    throw error;
  }
}
