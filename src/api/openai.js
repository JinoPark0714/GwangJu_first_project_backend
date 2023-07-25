import { Configuration, OpenAIApi } from "openai";

export async function getResponseOpenAi() {
  const bearerToken = `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`;
  const configuration = new Configuration({
    organization: "org-Td0vwAmMhk9Nz1XBm9zI2kfO",
    apiKey: bearerToken,
  });
  const openai = new OpenAIApi(configuration);
  return openai
}

export async function getImage(openai){
  const response = await openai.createImageVariation({
    prompt: "a white siamese cat",
    n: 1,
    size: "1024x1024",
  })    
  return response.data.data[0].url;
}
