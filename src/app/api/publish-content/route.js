import { N8N_PUBLISH_CONTENT_URL, META_ACCOUNT_IDS } from "@/lib/config";

export const maxDuration = 60;

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // TODO(config): see src/lib/config.js — no settings screen yet stores the
  // merchant's connected Meta account IDs, so publishing is blocked until
  // they're configured via env vars.
  if (!META_ACCOUNT_IDS.instagramBusinessAccountId || !META_ACCOUNT_IDS.facebookPageId) {
    return Response.json(
      { error: "Meta account isn't connected yet. Set INSTAGRAM_BUSINESS_ACCOUNT_ID and FACEBOOK_PAGE_ID (see src/lib/config.js)." },
      { status: 412 }
    );
  }

  const payload = {
    ...body,
    instagramBusinessAccountId: META_ACCOUNT_IDS.instagramBusinessAccountId,
    facebookPageId: META_ACCOUNT_IDS.facebookPageId,
  };

  let res;
  try {
    res = await fetch(N8N_PUBLISH_CONTENT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    return Response.json({ error: `Could not reach the publisher: ${err.message}` }, { status: 502 });
  }

  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    // fall through with a raw-text-derived error below
  }

  if (!res.ok) {
    return Response.json({ error: data?.message || text || `Publishing failed (${res.status})` }, { status: res.status });
  }

  return Response.json(data || { ok: true });
}
