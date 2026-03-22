import "dotenv/config";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import { emotionalTransmutation } from "./transmutation.js";

const app = new Hono();

const ACCESS_KEY = process.env.ACCESS_KEY;
const PORT = Number(process.env.PORT) || 3001;

app.use(
  "*",
  cors({
    origin: [
      "https://luisreinoso.dev",
      "http://localhost:4200",
      "http://127.0.0.1:5500",
      "http://localhost:5500",
    ],
    allowMethods: ["POST", "GET", "OPTIONS"],
    allowHeaders: ["Content-Type"],
  })
);

app.get("/", (c) => c.json({ data: "ok" }));

app.post("/emotional-transmutation", async (c) => {
  const body = await c.req.json<{
    key: string;
    emotionDescription: string;
    language?: string;
  }>();

  if (body.key !== ACCESS_KEY) {
    return c.json({ error: "Invalid key" }, 404);
  }

  if (!body.emotionDescription?.trim()) {
    return c.json({ error: "Empty emotion description" }, 400);
  }

  const language = body.language || "es";

  try {
    const result = await emotionalTransmutation(
      body.emotionDescription,
      language
    );

    // Return as a JSON string (frontend does JSON.parse on the response)
    return c.json(result);
  } catch (error) {
    console.error("Transmutation error:", error);
    return c.json({ error: "Failed to process emotional transmutation" }, 500);
  }
});

console.log(`Server running on port ${PORT}`);
serve({ fetch: app.fetch, port: PORT });
