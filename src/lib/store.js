"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

/* Seed data — replaced by the API layer later. */
export const INITIAL_PRODUCTS = [
  { id: "p1", name: "Elegant Anarkali", price: 2499, category: "Ethnic Wear", variant: "anarkali", color: "#e2667e", accent: "#f3c46a", status: "review", channel: "social" },
  { id: "p2", name: "Raw Silk Saree", price: 2199, category: "Sarees", variant: "saree", color: "#d44a6b", accent: "#f0c35c", status: "review", channel: "social" },
  { id: "p3", name: "Bridal Lehenga", price: 8999, category: "Bridal", variant: "lehenga", color: "#b3244a", accent: "#f3c46a", status: "draft", channel: "experience" },
  { id: "p4", name: "Mint Chikankari Kurta", price: 1499, category: "Kurtas", variant: "kurta", color: "#6fbfa6", accent: "#ffffff", status: "posted", channel: "social" },
  { id: "p5", name: "Royal Blue Anarkali", price: 3299, category: "Ethnic Wear", variant: "anarkali", color: "#3b4fc4", accent: "#e8c47a", status: "posted", channel: "experience" },
  { id: "p6", name: "Banarasi Silk Saree", price: 5499, category: "Sarees", variant: "saree", color: "#7a2f8f", accent: "#f0c35c", status: "review", channel: "social" },
];

export const PALETTES = [
  { color: "#e2667e", accent: "#f3c46a" },
  { color: "#3b4fc4", accent: "#e8c47a" },
  { color: "#b3244a", accent: "#f3c46a" },
  { color: "#6fbfa6", accent: "#ffffff" },
  { color: "#7a2f8f", accent: "#f0c35c" },
  { color: "#e98b3a", accent: "#fff1c9" },
];

export const toISO = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

function seedPosts() {
  const t = new Date();
  const at = (offset) => toISO(new Date(t.getFullYear(), t.getMonth(), t.getDate() + offset));
  return [
    { id: "s1", productId: "p4", date: at(-9), time: "11:00 AM", platforms: ["instagram"], status: "published" },
    { id: "s2", productId: "p5", date: at(-4), time: "7:30 PM", platforms: ["instagram", "facebook"], status: "published" },
    { id: "s3", productId: "p1", date: at(2), time: "7:30 PM", platforms: ["instagram"], status: "scheduled" },
    { id: "s4", productId: "p6", date: at(5), time: "1:30 PM", platforms: ["instagram", "whatsapp"], status: "scheduled" },
    { id: "s5", productId: "p3", date: at(9), time: "11:00 AM", platforms: ["instagram"], status: "draft" },
  ];
}

const INITIAL = {
  user: { name: "Tara Sharma", email: "+91 98765 43210" },
  business: { name: "Tara Ethnic Wear", category: "Ethnic Wear", categories: [], location: "Jaipur, Rajasthan" },
  brand: {
    colors: ["#e2667e", "#f3c46a", "#2b1a2f"],
    tone: ["Elegant", "Festive"],
    audience: ["Women 25–40", "Wedding shoppers"],
    tagline: "Grace in every detail",
  },
  products: INITIAL_PRODUCTS,
  posts: null, // seeded on the client (date-relative)
  currentId: "p1",
  draft: { name: "", category: "Ethnic Wear", price: "", photo: null, imageUrl: null },
  experiences: { social: true, virtual: true },
  credits: 320,
};

const StoreContext = createContext(null);
const KEY = "elev8-app-state-v2";

export function StoreProvider({ children }) {
  const [state, setState] = useState(INITIAL);
  const [ready, setReady] = useState(false);

  // Load persisted state once on the client.
  useEffect(() => {
    let saved = null;
    try { saved = JSON.parse(localStorage.getItem(KEY) || "null"); } catch {}
    setState((s) => ({
      ...s,
      ...(saved || {}),
      posts: saved?.posts || seedPosts(),
      draft: { ...s.draft, ...(saved?.draft || {}), photo: null, imageUrl: null },
    }));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify({ ...state, draft: { ...state.draft, photo: null, imageUrl: null } }));
    } catch {}
  }, [state, ready]);

  const update = useCallback((key, patch) => setState((s) => ({ ...s, [key]: { ...s[key], ...patch } })), []);

  const addProduct = useCallback((p) => {
    const id = `p${Date.now()}`;
    setState((s) => ({ ...s, products: [{ id, ...p }, ...s.products], currentId: id }));
    return id;
  }, []);

  const updateProduct = useCallback((id, patch) => {
    setState((s) => ({ ...s, products: s.products.map((p) => (p.id === id ? { ...p, ...patch } : p)) }));
  }, []);

  const deleteProduct = useCallback((id) => {
    setState((s) => {
      const products = s.products.filter((p) => p.id !== id);
      return {
        ...s,
        products,
        posts: (s.posts || []).filter((x) => x.productId !== id),
        currentId: s.currentId === id ? products[0]?.id : s.currentId,
      };
    });
  }, []);

  const setCurrent = useCallback((id) => setState((s) => ({ ...s, currentId: id })), []);

  const addPost = useCallback((post) => {
    setState((s) => ({
      ...s,
      credits: Math.max(0, s.credits - 5),
      posts: [...(s.posts || []), { id: `s${Date.now()}`, ...post }],
      products: s.products.map((p) => (p.id === post.productId ? { ...p, status: "posted" } : p)),
    }));
  }, []);

  const resetDemo = useCallback(() => {
    try { localStorage.removeItem(KEY); } catch {}
    setState({ ...INITIAL, posts: seedPosts() });
  }, []);

  const value = useMemo(() => {
    const posts = state.posts || [];
    const current = state.products.find((p) => p.id === state.currentId) || state.products[0] || null;
    return { ...state, posts, current, ready, update, addProduct, updateProduct, deleteProduct, setCurrent, addPost, resetDemo };
  }, [state, ready, update, addProduct, updateProduct, deleteProduct, setCurrent, addPost, resetDemo]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}

export const inr = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;
