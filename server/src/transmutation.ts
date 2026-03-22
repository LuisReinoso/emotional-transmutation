import { query } from "@anthropic-ai/claude-agent-sdk";
import { buildTransmutationPrompt } from "./prompt.js";

export interface TransmutationResult {
  emotion: string;
  oppositeEmotion: string;
  intensity: number;
  suggestions: string[];
}

export async function emotionalTransmutation(
  emotionDescription: string,
  language: string
): Promise<string> {
  const prompt = buildTransmutationPrompt(emotionDescription, language);

  const messages: any[] = [];

  for await (const message of query({
    prompt,
    options: {
      maxTurns: 1,
      allowedTools: [],
    },
  })) {
    messages.push(message);
  }

  const text = extractText(messages);

  // Validate it's parseable JSON before returning
  const jsonStr = extractJson(text);
  JSON.parse(jsonStr); // throws if invalid

  return jsonStr;
}

function extractText(messages: any[]): string {
  for (let i = messages.length - 1; i >= 0; i--) {
    const msg = messages[i];
    if (msg?.message?.content) {
      for (const block of msg.message.content) {
        if (block.type === "text") {
          return block.text;
        }
      }
    }
    if (msg?.result) {
      return msg.result;
    }
  }
  return "";
}

function extractJson(text: string): string {
  // Try to find a JSON object in the response
  const match = text.match(/\{[\s\S]*\}/);
  if (match) {
    return match[0];
  }
  throw new Error("No JSON found in Claude response");
}
