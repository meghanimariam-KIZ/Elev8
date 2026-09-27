import { N8N_GENERATE_CONTENT_URL } from "@/lib/config";

// Gemini/OpenAI/Veo generation can take 30-90+s — give the function room.
export const maxDuration = 120;

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  let res;
  try {
    res = await fetch(N8N_GENERATE_CONTENT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (err) {
    return Response.json({ error: `Could not reach the content generator: ${err.message}` }, { status: 502 });
  }

  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    // fall through with a raw-text-derived error below
  }

  if (!res.ok) {
    return Response.json({ error: data?.message || text || `Content generation failed (${res.status})` }, { status: res.status });
  }

  return Response.json(data);
}
