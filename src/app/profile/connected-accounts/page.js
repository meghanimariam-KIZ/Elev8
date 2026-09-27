"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { Screen, TopBar } from "@/components/Screen";
import { createClient } from "@/utils/supabase/client";

export default function ConnectedAccounts() {
  const [rowId, setRowId] = useState(null);
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("brand_settings")
        .select("id, instagram_business_account_id, facebook_page_id")
        .limit(1)
        .maybeSingle();
      if (error) setError(error.message);
      else if (data) {
        setRowId(data.id);
        setInstagram(data.instagram_business_account_id || "");
        setFacebook(data.facebook_page_id || "");
      }
      setLoading(false);
    })();
  }, []);

  const save = async () => {
    setSaving(true);
    setError(null);
    const supabase = createClient();
    const payload = {
      instagram_business_account_id: instagram.trim() || null,
      facebook_page_id: facebook.trim() || null,
      updated_at: new Date().toISOString(),
    };
    const { data, error } = rowId
      ? await supabase.from("brand_settings").update(payload).eq("id", rowId).select("id").maybeSingle()
      : await supabase.from("brand_settings").insert(payload).select("id").maybeSingle();

    setSaving(false);
    if (error) { setError(error.message); return; }
    if (data?.id) setRowId(data.id);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  return (
    <Screen width="narrow">
      <TopBar title="Connected Accounts" subtitle="Used to publish approved content to Instagram and Facebook." back="/profile" />
      <div className="body">
        {loading ? (
          <p className="small muted">Loading…</p>
        ) : (
          <>
            <div className="field" style={{ marginTop: 0 }}>
              <label htmlFor="iid">Instagram Business Account ID</label>
              <div className="input">
                <input id="iid" value={instagram} onChange={(e) => setInstagram(e.target.value)} placeholder="17841400000000000" />
              </div>
            </div>
            <div className="field">
              <label htmlFor="fid">Facebook Page ID</label>
              <div className="input">
                <input id="fid" value={facebook} onChange={(e) => setFacebook(e.target.value)} placeholder="100000000000000" />
              </div>
            </div>
            {error && (
              <p className="tiny row gap-6 mt-8" style={{ color: "var(--red)" }}><AlertTriangle size={13} /> {error}</p>
            )}
            <button type="button" className="btn primary block mt-20" disabled={saving} onClick={save}>
              {saving ? "Saving…" : "Save"}
            </button>
          </>
        )}
      </div>
      {saved && <div className="toast"><CheckCircle2 size={18} color="#4ade80" /> Connected accounts saved</div>}
    </Screen>
  );
}
