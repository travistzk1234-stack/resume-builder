import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(request) {
  try {
    const body = await request.json();
    const { messages, max_tokens = 1000 } = body;

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens,
      messages,
    });

    return Response.json(response);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}