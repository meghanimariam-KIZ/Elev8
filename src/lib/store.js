"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

/* Mock data — replaced by the API layer later. */
export const INITIAL_PRODUCTS = [
  { id: "p1", name: "Elegant Anarkali", price: 2499, category: "Ethnic Wear", variant: "anarkali", color: "#e2667e", accent: "#f3c46a", status: "posted", channel: "social" },
  { id: "p2", name: "Raw Silk Saree", price: 2199, category: "Ethnic Wear", variant: "saree", color: "#d44a6b", accent: "#f0c35c", status: "review", channel: "social" },
  { id: "p3", name: "Bridal Lehenga", price: 8999, category: "Bridal", variant: "lehenga", color: "#b3244a", accent: "#f3c46a", status: "draft", channel: "experience" },
  { id: "p4", name: "Mint Chikankari Kurta", price: 1499, category: "Kurtas", variant: "kurta", color: "#6fbfa6", accent: "#ffffff", status: "posted", channel: "social" },
  { id: "p5", name: "Royal Blue Anarkali", price: 3299, category: "Ethnic Wear", variant: "anarkali", color: "#3b4fc4", accent: "#e8c47a", status: "posted", channel: "experience" },
  { id: "p6", name: "Banarasi Silk Saree", price: 5499, category: "Sarees", variant: "saree", color: "#7a2f8f", accent: "#f0c35c", status: "posted", channel: "social" },
];

const INITIAL = {
  user: { name: "Tara Sharma", email: "+91 98765 43210" },
  business: { name: "Tara Ethnic Wear", category: "Ethnic Wear", location: "Jaipur, Rajasthan" },
  brand: {
    colors: ["#e2667e", "#f3c46a", "#2b1a2f"],
    tone: ["Elegant", "Festive"],
    audience: ["Women 25–40", "Wedding shoppers"],
    tagline: "Grace in every detail",
  },
  products: INITIAL_PRODUCTS,
  draft: { name: "Elegant Anarkali", category: "Ethnic Wear", price: "2499", photo: null },
  experiences: { social: true, virtual: true },
};

const StoreContext = createContext(null);
const KEY = "elev8-ui-state-v1";

export function StoreProvider({ children }) {
  const [state, setState] = useState(INITIAL);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "null");
      if (saved) setState((s) => ({ ...s, ...saved, draft: { ...s.draft, ...saved.draft, photo: null } }));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      const { draft, ...rest } = state;
      localStorage.setItem(KEY, JSON.stringify({ ...rest, draft: { ...draft, photo: null } }));
    } catch {}
  }, [state]);

  const update = useCallback((key, patch) => {
    setState((s) => ({ ...s, [key]: { ...s[key], ...patch } }));
  }, []);

  const addProduct = useCallback((p) => {
    setState((s) => ({ ...s, products: [{ id: `p${Date.now()}`, ...p }, ...s.products] }));
  }, []);

  const value = useMemo(() => ({ ...state, update, addProduct }), [state, update, addProduct]);
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}

export const inr = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;
