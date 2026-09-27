
/** Glowing animated ELEV8 "8" orb used on the dark AI screens. */
export default function Orb({ size = 150 }) {
  return (
    <div className="orb" style={{ width: size, height: size }}>
      <span className="orb-ring" />
      <span className="orb-ring r2" />
      <span className="orb-core">
        <img src="/logo-mark.png" alt="" className="orb-8" style={{ width: size * 0.5, height: size * 0.5, objectFit: "contain" }} />
      </span>
      <style>{`
        .orb { position: relative; margin: 0 auto; display: grid; place-items: center; }
        .orb-core { width: 62%; height: 62%; border-radius: 50%; display: grid; place-items: center;
          background: radial-gradient(circle at 35% 30%, rgba(255,255,255,.25), rgba(122,77,255,.15) 60%, transparent 70%);
          box-shadow: 0 0 60px 10px rgba(122,77,255,.45), inset 0 0 30px rgba(58,208,255,.3); }
        .orb-8 { filter: drop-shadow(0 0 12px rgba(160,120,255,.8)); animation: breathe 2.4s ease-in-out infinite; }
        .orb-ring { position: absolute; inset: 0; border-radius: 50%;
          background: conic-gradient(from 0deg, transparent, #3ad0ff, #7a4dff, #ff4fa3, transparent 70%);
          -webkit-mask: radial-gradient(closest-side, transparent 88%, #000 90%); mask: radial-gradient(closest-side, transparent 88%, #000 90%);
          animation: spin 3s linear infinite; }
        .orb-ring.r2 { inset: 12%; animation-duration: 5s; animation-direction: reverse; opacity: .6; }
        @keyframes breathe { 50% { transform: scale(1.08); } }
      `}</style>
    </div>
  );
}
