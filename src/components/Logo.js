/**
 * ELEV8 logo: the ribbon mark + "ELEV8" wordmark.
 * `markOnly` renders just the mark (app icons, avatars, loaders).
 */
export default function Logo({ size = 28, light = false, markOnly = false }) {
  const ink = light ? "#ffffff" : "#14132b";
  const mark = (
    <img
      src="/logo-mark.png"
      alt={markOnly ? "ELEV8" : ""}
      width={Math.round(size * 1.1)}
      height={Math.round(size * 1.1)}
      style={{ display: "block", width: size * 1.1, height: size * 1.1, objectFit: "contain" }}
      draggable={false}
    />
  );
  if (markOnly) return mark;

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: size * 0.22, lineHeight: 1 }} aria-label="ELEV8" role="img">
      {mark}
      <span
        aria-hidden="true"
        style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: size * 0.92, letterSpacing: "0.02em", color: ink }}
      >
        ELEV
        <span style={{ background: "linear-gradient(135deg,#3ad0ff,#7a4dff 50%,#ff4fa3)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
          8
        </span>
      </span>
    </span>
  );
}
