import GarmentArt from "./GarmentArt";
import Logo from "./Logo";

/**
 * Split layout for welcome / sign-up / onboarding.
 * Desktop: brand visual on the left, the form on the right. Phone: form only.
 */
export default function AuthLayout({ children, variant = "anarkali", scene = "room", image, headline, copy }) {
  return (
    <div className="auth">
      <aside className="auth-art" aria-hidden="true">
        {image ? (
          <img src={image} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <GarmentArt scene={scene} variant={variant} fit="slice" align="xMidYMin" style={{ position: "absolute", inset: 0 }} />
        )}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(7,6,15,.1) 30%, rgba(7,6,15,.85) 100%)" }} />
        <div style={{ position: "absolute", top: 36, left: 48, zIndex: 2 }}>
          <span style={{ display: "inline-flex", padding: "10px 16px", borderRadius: 16, background: "rgba(255,255,255,.9)" }}><Logo size={24} /></span>
        </div>
        <div className="auth-art-copy">
          <p style={{ fontFamily: "var(--font-display)", fontSize: 34, fontWeight: 700, lineHeight: 1.15, letterSpacing: "-.02em" }}>
            {headline || <>One product →<br />multiple experiences.</>}
          </p>
          <p style={{ marginTop: 12, fontSize: 16, opacity: 0.8, maxWidth: 440, lineHeight: 1.5 }}>
            {copy || "Upload a product once. ELEV8 creates the photoshoot, the reel, the caption and a virtual try-on — ready to post."}
          </p>
        </div>
      </aside>
      <div style={{ minWidth: 0 }}>{children}</div>
    </div>
  );
}
