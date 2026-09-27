"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Shirt,
  Crown,
  Baby,
  Gem,
  Footprints,
  Sparkles,
  Heart,
  Sun,
  Scissors,
  ShoppingBag,
} from "lucide-react";
import { Screen, TopBar } from "@/components/Screen";
import { useStore } from "@/lib/store";
import AuthLayout from "@/components/AuthLayout";

const BUSINESS_CATEGORIES = [
  { id: "womens-wear",  label: "Women's Wear",    icon: Shirt,        color: "#e2667e", bg: "#fde8f0" },
  { id: "bridal-wear",  label: "Bridal Wear",     icon: Crown,        color: "#b3244a", bg: "#f9e0e8" },
  { id: "mens-wear",    label: "Men's Wear",      icon: Shirt,        color: "#3b4fc4", bg: "#e8ecff" },
  { id: "kids-wear",    label: "Kids Wear",       icon: Baby,         color: "#16b6a3", bg: "#ddf5f1" },
  { id: "ethnic-wear",  label: "Ethnic Wear",     icon: Sparkles,     color: "#7a2f8f", bg: "#f3e5f9" },
  { id: "sarees",       label: "Sarees",          icon: Heart,        color: "#e2449e", bg: "#fde5f2" },
  { id: "jewellery",    label: "Jewellery",       icon: Gem,          color: "#e6b34f", bg: "#fdf3dc" },
  { id: "footwear",     label: "Footwear",        icon: Footprints,   color: "#e98b3a", bg: "#fff0dd" },
  { id: "western-wear", label: "Western Wear",    icon: Sun,          color: "#3a5bff", bg: "#e8edff" },
  { id: "accessories",  label: "Accessories",     icon: ShoppingBag,  color: "#22b573", bg: "#e1f7ec" },
  { id: "tailoring",    label: "Custom Tailoring", icon: Scissors,    color: "#d44a6b", bg: "#fce4eb" },
  { id: "luxury",       label: "Luxury / Designer", icon: Sparkles,  color: "#7a4dff", bg: "#efe8ff" },
];

export default function CategorySelect() {
  const router = useRouter();
  const { business, update } = useStore();
  const [selected, setSelected] = useState(business.categories || []);

  const toggle = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const proceed = () => {
    update("business", { categories: selected });
    router.push("/onboarding/brand");
  };

  return (
    <AuthLayout
      variant="saree"
      scene="room"
      headline={<>What does your<br />store specialise in?</>}
      copy="Pick the categories that describe your business — ELEV8 uses these to create content that fits your niche."
    >
      <Screen tone="soft" width="narrow">
        <TopBar back="/onboarding/business">
          <div className="stepper" style={{ width: 160, marginRight: 8 }}>
            <i className="on" /><i className="on" /><i className="on" /><i />
          </div>
        </TopBar>

        <div className="body">
          <p className="eyebrow">Step 3 of 4</p>
          <h1 className="h-lg mt-4">What is your business about?</h1>
          <p className="sub mt-4">
            Select all the categories that apply to your store. This helps us
            tailor posts, captions and product shoots to your niche.
          </p>

          <div className="category-grid mt-20">
            {BUSINESS_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const active = selected.includes(cat.id);
              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`cat-card${active ? " active" : ""}`}
                  onClick={() => toggle(cat.id)}
                  style={{
                    "--cat-color": cat.color,
                    "--cat-bg": cat.bg,
                  }}
                >
                  <span className="cat-icon">
                    <Icon size={22} />
                  </span>
                  <span className="cat-label">{cat.label}</span>
                  {active && (
                    <span className="cat-check">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M3 7.5L5.5 10L11 4"
                          stroke="#fff"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {selected.length > 0 && (
            <p className="sub mt-12 center" style={{ fontSize: 13 }}>
              <strong style={{ color: "var(--violet)" }}>{selected.length}</strong>{" "}
              {selected.length === 1 ? "category" : "categories"} selected
            </p>
          )}
        </div>

        <div className="footer">
          <button
            className="btn primary block"
            disabled={selected.length === 0}
            onClick={proceed}
          >
            Continue
          </button>
        </div>
      </Screen>
    </AuthLayout>
  );
}
