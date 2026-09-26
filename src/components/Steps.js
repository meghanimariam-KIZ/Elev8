import { Check } from "lucide-react";

/** Checklist whose items tick off as `current` advances. */
export default function Steps({ items, current }) {
  return (
    <div className="steps">
      {items.map((label, i) => {
        const state = i < current ? "done" : i === current ? "active" : "";
        return (
          <div key={label} className={`step ${state}`}>
            <span className="mark">{i < current && <Check size={14} strokeWidth={3} />}</span>
            {label}
          </div>
        );
      })}
    </div>
  );
}
