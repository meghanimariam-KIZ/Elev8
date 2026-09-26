"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, UserRound, AtSign, Lock } from "lucide-react";
import { Screen, TopBar } from "@/components/Screen";
import { useStore } from "@/lib/store";

export default function Signup() {
  const router = useRouter();
  const { user, update } = useStore();
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ name: user.name, email: user.email, password: "elev8-demo" });
  const valid = form.name.trim() && form.email.trim() && form.password.length >= 6;

  const submit = (e) => {
    e.preventDefault();
    if (!valid) return;
    update("user", { name: form.name, email: form.email });
    router.push("/onboarding/business");
  };

  return (
    <Screen tone="soft">
      <TopBar back="/welcome" />
      <form className="body" onSubmit={submit} id="signup">
        <h1 className="h-lg mt-8">Create your account</h1>
        <p className="sub mt-4">Get started in less than a minute.</p>

        <div className="field">
          <label htmlFor="name">Full Name</label>
          <div className="input">
            <span className="adorn"><UserRound size={18} /></span>
            <input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="name" />
          </div>
        </div>
        <div className="field">
          <label htmlFor="email">Email / Phone</label>
          <div className="input">
            <span className="adorn"><AtSign size={18} /></span>
            <input id="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} autoComplete="email" />
          </div>
        </div>
        <div className="field">
          <label htmlFor="pw">Password</label>
          <div className="input">
            <span className="adorn"><Lock size={18} /></span>
            <input id="pw" type={show ? "text" : "password"} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} autoComplete="new-password" />
            <button type="button" className="adorn" onClick={() => setShow(!show)} aria-label={show ? "Hide password" : "Show password"}>
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button type="submit" className="btn primary block mt-24" disabled={!valid}>Continue</button>

        <div className="divider-text">or continue with</div>
        <div className="row gap-12" style={{ justifyContent: "center" }}>
          <button type="button" className="btn secondary grow" onClick={() => router.push("/onboarding/business")}>
            <GoogleGlyph /> Google
          </button>
          <button type="button" className="btn secondary grow" onClick={() => router.push("/onboarding/business")}>
            <AppleGlyph /> Apple
          </button>
        </div>
      </form>
      <div className="footer">
        <p className="center small muted">Already have an account? <Link href="/home" className="link">Sign In</Link></p>
      </div>
    </Screen>
  );
}

function GoogleGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}

function AppleGlyph() {
  return (
    <svg width="17" height="18" viewBox="0 0 17 20" fill="currentColor" aria-hidden="true">
      <path d="M14.1 10.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9C3.6 4.8 2 5.8 1 7.4c-1.9 3.3-.5 8.2 1.4 10.9.9 1.3 2 2.8 3.4 2.7 1.4-.1 1.9-.9 3.5-.9s2.1.9 3.5.9c1.5 0 2.4-1.3 3.3-2.7 1-1.5 1.5-3 1.5-3.1-.1 0-2.9-1.1-3-4.6zM11.5 3c.7-.9 1.2-2.1 1.1-3.3-1 0-2.3.7-3 1.6-.7.8-1.2 2-1.1 3.2 1.1.1 2.3-.6 3-1.5z" />
    </svg>
  );
}
