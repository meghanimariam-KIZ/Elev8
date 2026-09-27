import { N8N_PUBLISH_CONTENT_URL } from "@/lib/config";
import { createClient } from "@/utils/supabase/server";

export const maxDuration = 60;

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: settings, error: settingsError } = await supabase
    .from("brand_settings")
    .select("instagram_business_account_id, facebook_page_id")
    .limit(1)
    .maybeSingle();

  if (settingsError) {
    return Response.json({ error: `Could not read brand settings: ${settingsError.message}` }, { status: 500 });
  }

  if (!settings?.instagram_business_account_id || !settings?.facebook_page_id) {
    return Response.json(
      { error: "Meta account isn't connected yet. Add your Instagram Business Account ID and Facebook Page ID in Profile → Connected Accounts." },
      { status: 412 }
    );
  }

  const payload = {
    ...body,
    instagramBusinessAccountId: settings.instagram_business_account_id,
    facebookPageId: settings.facebook_page_id,
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
