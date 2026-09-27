import { useId } from "react";

/**
 * Illustrated product imagery. Stands in for AI-generated photos until the
 * generation backend is wired up.
 *
 * variant: "anarkali" | "saree" | "lehenga" | "kurta"
 * scene:   "room" | "studio" | "outdoor" | "luxury" | "none"
 */
export const SCENES = {
  room: { wall: ["#f7e6de", "#efd3c9"], floor: "#e2bfae", accent: "#fff6ef" },
  studio: { wall: ["#f4f1f8", "#e3def0"], floor: "#d6d0e6", accent: "#ffffff" },
  outdoor: { wall: ["#cfe8f0", "#f6e2c6"], floor: "#b9cf9c", accent: "#fff8e8" },
  luxury: { wall: ["#3a2340", "#1c1230"], floor: "#2b1a2f", accent: "#e6b34f" },
  none: null,
};

export default function GarmentArt({
  variant = "anarkali",
  color = "#e2667e",
  accent = "#f3c46a",
  skin = "#d9a17e",
  hair = "#2b1a17",
  gender,
  beard = false,
  scene = "room",
  showFigure = true,
  mirror = false,
  garmentOnly = false,
  back = false,
  align = "xMidYMin",
  fit = "slice",
  className = "art",
  style,
}) {
  const uid = useId().replace(/:/g, "");
  const s = SCENES[scene];
  const g = (n) => `${n}-${uid}`;
  const isMale = gender ? gender === "Male" : variant === "kurta";

  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 200 260"
      preserveAspectRatio={`${align} ${fit}`}
      role="img"
      aria-label={`${variant} illustration`}
    >
      <defs>
        <linearGradient id={g("wall")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={s ? s.wall[0] : "transparent"} />
          <stop offset="1" stopColor={s ? s.wall[1] : "transparent"} />
        </linearGradient>
        <linearGradient id={g("cloth")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={shade(color, 18)} />
          <stop offset=".55" stopColor={color} />
          <stop offset="1" stopColor={shade(color, -22)} />
        </linearGradient>
        <linearGradient id={g("fold")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity=".16" />
          <stop offset=".3" stopColor="#000" stopOpacity="0" />
          <stop offset=".7" stopColor="#fff" stopOpacity=".12" />
          <stop offset="1" stopColor="#000" stopOpacity=".2" />
        </linearGradient>
        <radialGradient id={g("glow")} cx=".3" cy=".25" r=".7">
          <stop offset="0" stopColor="#fff" stopOpacity=".75" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <pattern id={g("motif")} width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="1.1" fill={accent} opacity=".8" />
          <circle cx="0" cy="0" r=".6" fill={accent} opacity=".55" />
          <circle cx="8" cy="8" r=".6" fill={accent} opacity=".55" />
        </pattern>
      </defs>

      {s && <Scene s={s} scene={scene} g={g} />}

      {showFigure && (
        <g transform={mirror ? "translate(200 0) scale(-1 1)" : undefined}>
          {/* floor shadow */}
          <ellipse cx="100" cy="246" rx={variant === "saree" || variant === "kurta" || isMale ? 34 : 62} ry="6" fill="#000" opacity=".12" />
          {isMale ? (
            <FigureMale variant={variant} g={g} skin={skin} hair={hair} accent={accent} color={color} garmentOnly={garmentOnly} back={back} beard={beard} />
          ) : (
            <Figure variant={variant} g={g} skin={skin} hair={hair} accent={accent} color={color} garmentOnly={garmentOnly} back={back} />
          )}
        </g>
      )}
    </svg>
  );
}

function Scene({ s, scene, g }) {
  if (scene === "outdoor") {
    return (
      <g>
        <rect width="200" height="260" fill={`url(#${g("wall")})`} />
        <circle cx="160" cy="46" r="18" fill="#fff4d6" opacity=".9" />
        <path d="M0 170 Q40 140 90 160 T200 150 V260 H0Z" fill="#a9c58b" opacity=".7" />
        <path d="M0 190 Q60 170 120 188 T200 182 V260 H0Z" fill={s.floor} />
        <g opacity=".75">
          <rect x="18" y="104" width="4" height="70" fill="#7c6a4f" />
          <circle cx="20" cy="100" r="18" fill="#7fae6a" />
          <circle cx="32" cy="112" r="12" fill="#8fbe78" />
        </g>
      </g>
    );
  }
  if (scene === "luxury") {
    return (
      <g>
        <rect width="200" height="260" fill={`url(#${g("wall")})`} />
        {[30, 70, 130, 170].map((x) => (
          <rect key={x} x={x - 7} y="0" width="14" height="210" fill="#fff" opacity=".04" />
        ))}
        <path d="M60 0 Q100 30 140 0" fill="none" stroke={s.accent} strokeOpacity=".5" strokeWidth="1" />
        <g fill={s.accent}>
          <circle cx="100" cy="26" r="6" opacity=".9" />
          <circle cx="100" cy="26" r="16" opacity=".12" />
          <circle cx="100" cy="26" r="34" opacity=".06" />
        </g>
        <rect y="206" width="200" height="54" fill={s.floor} />
        <path d="M0 206 H200" stroke={s.accent} strokeOpacity=".35" />
        <ellipse cx="100" cy="240" rx="80" ry="14" fill={s.accent} opacity=".08" />
      </g>
    );
  }
  return (
    <g>
      <rect width="200" height="260" fill={`url(#${g("wall")})`} />
      {scene === "room" && (
        <g>
          <path d="M20 190 V70 a28 28 0 0 1 56 0 V190Z" fill={s.accent} opacity=".85" />
          <path d="M26 190 V72 a22 22 0 0 1 44 0 V190Z" fill="#fff" opacity=".6" />
          <path d="M48 50 V190 M26 120 H70" stroke="#e8cfc3" strokeWidth="1.2" />
          <rect x="150" y="176" width="26" height="30" rx="4" fill="#caa08a" />
          <g fill="#8fae7e">
            <ellipse cx="156" cy="160" rx="6" ry="16" transform="rotate(-18 156 160)" />
            <ellipse cx="170" cy="158" rx="6" ry="18" transform="rotate(16 170 158)" />
            <ellipse cx="163" cy="152" rx="5" ry="20" />
          </g>
        </g>
      )}
      {scene === "studio" && <ellipse cx="100" cy="90" rx="90" ry="90" fill={`url(#${g("glow")})`} />}
      <rect y="206" width="200" height="54" fill={s.floor} opacity=".55" />
      <rect width="200" height="260" fill={`url(#${g("glow")})`} opacity=".5" />
    </g>
  );
}

function Figure({ variant, g, skin, hair, accent, color, garmentOnly, back }) {
  const cloth = `url(#${g("cloth")})`;
  const fold = `url(#${g("fold")})`;
  const motif = `url(#${g("motif")})`;
  const skinShade = shade(skin, -14);

  const head = garmentOnly ? null : (
    <g>
      {/* hair back */}
      <path d="M86 44 Q86 26 100 25 Q114 26 114 44 L116 70 Q100 76 84 70Z" fill={hair} />
      <rect x="95.5" y="54" width="9" height="14" rx="4" fill={skinShade} />
      <ellipse cx="100" cy="45" rx="11.5" ry="13.5" fill={back ? hair : skin} />
      {back ? (
        <ellipse cx="100" cy="60" rx="6" ry="5" fill={hair} />
      ) : (
        <>
          {/* hair front / parting */}
          <path d="M88 42 Q90 29 100 29 Q110 29 112 42 Q106 34 100 34 Q94 34 88 42Z" fill={hair} />
          <circle cx="100" cy="35.5" r="1.1" fill="#c0263e" />
        </>
      )}
      {/* earrings */}
      <circle cx="88.5" cy="52" r="1.8" fill={accent} />
      <circle cx="111.5" cy="52" r="1.8" fill={accent} />
      {/* necklace */}
      <path d="M94 66 Q100 73 106 66" fill="none" stroke={accent} strokeWidth="1.6" strokeLinecap="round" />
    </g>
  );

  const arms = (sleeve = true) => (
    <g opacity={garmentOnly ? 0 : 1}>
      <path d="M81 74 Q72 100 74 132 L79 132 Q80 104 88 80Z" fill={skin} />
      <path d="M119 74 Q128 100 126 132 L121 132 Q120 104 112 80Z" fill={skin} />
      {sleeve && (
        <>
          <path d="M81 72 Q74 88 75 106 L82 107 Q83 90 89 78Z" fill={cloth} />
          <path d="M119 72 Q126 88 125 106 L118 107 Q117 90 111 78Z" fill={cloth} />
          <path d="M75 104 L82 105" stroke={accent} strokeWidth="1.6" />
          <path d="M125 104 L118 105" stroke={accent} strokeWidth="1.6" />
        </>
      )}
      <circle cx="76.5" cy="134" r="3.3" fill={skin} />
      <circle cx="123.5" cy="134" r="3.3" fill={skin} />
      <path d="M73.5 128 h6 M120.5 128 h6" stroke={accent} strokeWidth="1.5" />
    </g>
  );

  if (variant === "saree") {
    return (
      <g>
        {head}
        {arms(false)}
        {/* blouse */}
        <path d="M84 70 Q100 64 116 70 L114 96 Q100 99 86 96Z" fill={shade(color, -18)} />
        {/* skirt drape */}
        <path d="M86 96 Q100 100 114 96 L126 240 Q100 246 74 240Z" fill={cloth} />
        <path d="M86 96 Q100 100 114 96 L126 240 Q100 246 74 240Z" fill={fold} />
        {[92, 100, 108].map((x, i) => (
          <path key={x} d={`M${x} 110 L${84 + i * 16} 240`} stroke="#000" strokeOpacity=".08" strokeWidth="1.2" />
        ))}
        <path d="M74 232 Q100 238 126 232 L126 240 Q100 246 74 240Z" fill={accent} opacity=".9" />
        {/* pallu over shoulder */}
        <path d="M112 68 Q122 70 120 84 L92 150 Q84 146 80 136 L104 84 Q106 72 112 68Z" fill={cloth} />
        <path d="M112 68 Q122 70 120 84 L92 150 Q84 146 80 136 L104 84 Q106 72 112 68Z" fill={motif} opacity=".7" />
        <path d="M80 136 L92 150" stroke={accent} strokeWidth="3" />
      </g>
    );
  }

  if (variant === "lehenga") {
    return (
      <g>
        {head}
        {arms(true)}
        <path d="M82 70 Q100 63 118 70 L115 92 Q100 95 85 92Z" fill={cloth} />
        <path d="M82 70 Q100 63 118 70 L115 92 Q100 95 85 92Z" fill={motif} opacity=".6" />
        <path d="M86 92 Q100 95 114 92 L114 102 Q100 104 86 102Z" fill={skin} />
        <path d="M85 101 Q100 105 115 101 L168 240 Q100 254 32 240Z" fill={cloth} />
        <path d="M85 101 Q100 105 115 101 L168 240 Q100 254 32 240Z" fill={fold} />
        {[150, 190, 222].map((y, i) => (
          <path key={y} d={`M${60 - i * 9} ${y} Q100 ${y + 10} ${140 + i * 9} ${y}`} fill="none" stroke={accent} strokeWidth="2" opacity=".85" />
        ))}
        <path d="M32 232 Q100 248 168 232 L168 240 Q100 254 32 240Z" fill={motif} />
        {/* dupatta */}
        <path d="M84 72 Q70 80 64 120 Q60 170 70 214 L78 212 Q72 168 76 124 Q80 92 90 78Z" fill={shade(color, 25)} opacity=".55" />
        <path d="M70 214 L78 212" stroke={accent} strokeWidth="2" />
      </g>
    );
  }

  if (variant === "kurta") {
    return (
      <g>
        {head}
        {arms(true)}
        <path d="M82 70 Q100 63 118 70 L124 190 Q100 196 76 190Z" fill={cloth} />
        <path d="M82 70 Q100 63 118 70 L124 190 Q100 196 76 190Z" fill={fold} />
        <path d="M100 68 V110" stroke={accent} strokeWidth="1.6" />
        <path d="M76 182 Q100 188 124 182 L124 190 Q100 196 76 190Z" fill={accent} opacity=".85" />
        <path d="M84 190 L86 240 H96 L98 194 M102 194 L104 240 H114 L116 190" fill={shade(color, 35)} />
      </g>
    );
  }

  // Anarkali (default)
  return (
    <g>
      {head}
      {arms(true)}
      {/* bodice */}
      <path d="M81 70 Q100 62 119 70 L116 108 Q100 112 84 108Z" fill={cloth} />
      <path d="M81 70 Q100 62 119 70 L116 108 Q100 112 84 108Z" fill={motif} opacity=".55" />
      <path d="M92 68 Q100 80 108 68" fill="none" stroke={accent} strokeWidth="1.6" />
      {/* flared skirt */}
      <path d="M84 106 Q100 111 116 106 L166 238 Q100 252 34 238Z" fill={cloth} />
      <path d="M84 106 Q100 111 116 106 L166 238 Q100 252 34 238Z" fill={fold} />
      {[-58, -38, -18, 0, 18, 38, 58].map((dx) => (
        <path key={dx} d={`M${100 + dx * 0.18} 112 L${100 + dx} 244`} stroke="#000" strokeOpacity=".07" strokeWidth="1.4" />
      ))}
      <path d="M84 106 Q100 111 116 106" fill="none" stroke={accent} strokeWidth="2.2" />
      {/* embroidered hem */}
      <path d="M40 222 Q100 236 160 222 L166 238 Q100 252 34 238Z" fill={motif} />
      <path d="M40 222 Q100 236 160 222" fill="none" stroke={accent} strokeWidth="1.4" />
      <path d="M34 238 Q100 252 166 238" fill="none" stroke={accent} strokeWidth="2" />
      {/* sheer dupatta */}
      <path d="M116 70 Q138 90 140 150 Q142 196 132 232 L124 230 Q132 190 128 150 Q124 104 108 80Z" fill="#fff" opacity=".22" />
      <path d="M132 232 L124 230" stroke={accent} strokeWidth="2" />
    </g>
  );
}

function FigureMale({ variant, g, skin, hair, accent, color, garmentOnly, back, beard }) {
  const cloth = `url(#${g("cloth")})`;
  const fold = `url(#${g("fold")})`;
  const skinShade = shade(skin, -14);
  const skinShadow = shade(skin, -22);
  const trouserColor = "#f5efe6"; // clean off-white / ivory churidar

  const head = garmentOnly ? null : (
    <g>
      {/* Neck - masculine, broader */}
      <rect x="94" y="52" width="12" height="18" rx="2" fill={skinShade} />
      {/* Head base */}
      <path
        d="M88 40 C88 28 112 28 112 40 C112 50 108 57 100 57 C92 57 88 50 88 40 Z"
        fill={back ? hair : skin}
      />
      {/* Ears */}
      <ellipse cx="87" cy="43" rx="2.2" ry="3.5" fill={skinShade} />
      <ellipse cx="113" cy="43" rx="2.2" ry="3.5" fill={skinShade} />

      {back ? (
        /* Male hair back - neat tapered crop */
        <path d="M86 42 C86 24 114 24 114 42 C114 50 108 53 100 53 C92 53 86 50 86 42 Z" fill={hair} />
      ) : (
        <>
          {/* Male hair front - short modern pompadour / textured fade */}
          <path d="M86 40 C85 23 115 23 114 40 C114 44 112 46 110 46 C110 38 108 30 100 30 C92 30 90 38 90 46 C88 46 86 44 86 40 Z" fill={hair} />
          {/* Styled volume on top */}
          <path d="M86 36 C85 20 95 18 102 18 C110 18 115 22 114 34 C109 25 104 25 98 26 C92 27 88 30 86 36 Z" fill={hair} />
          {/* Sideburns */}
          <path d="M87 39 L88.5 45 L90 45 L89 39 Z" fill={hair} />
          <path d="M113 39 L111.5 45 L110 45 L111 39 Z" fill={hair} />

          {/* Strong masculine eyebrows */}
          <path d="M91 38 Q95.5 36 98 38" stroke={hair} strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <path d="M102 38 Q104.5 36 109 38" stroke={hair} strokeWidth="1.8" strokeLinecap="round" fill="none" />

          {/* Minimal facial definition */}
          <path d="M100 39 V46 L98.5 47" stroke={skinShadow} strokeWidth="1.1" strokeLinecap="round" fill="none" opacity=".5" />

          {/* Groomed short stubble/beard */}
          {beard && (
            <path
              d="M88.5 44 C88.5 53 93.5 57 100 57 C106.5 57 111.5 53 111.5 44 C111.5 51 106 55.5 100 55.5 C94 55.5 88.5 51 88.5 44 Z"
              fill={hair}
              opacity=".45"
            />
          )}
        </>
      )}
    </g>
  );

  const arms = () => (
    <g opacity={garmentOnly ? 0 : 1}>
      {/* Broad masculine arms */}
      {/* Skin hands */}
      <circle cx="68" cy="134" r="3.6" fill={skin} />
      <circle cx="132" cy="134" r="3.6" fill={skin} />

      {/* Kurta sleeves (broad shoulders) */}
      <path d="M72 72 Q63 98 65 128 L72 129 Q72 102 81 78 Z" fill={cloth} />
      <path d="M128 72 Q137 98 135 128 L128 129 Q128 102 119 78 Z" fill={cloth} />
      {/* Sleeve cuffs with accent */}
      <path d="M65 127 L72 128" stroke={accent} strokeWidth="2" strokeLinecap="round" />
      <path d="M135 127 L128 128" stroke={accent} strokeWidth="2" strokeLinecap="round" />

      {/* Modern watch on left wrist */}
      <rect x="64.5" y="129" width="6" height="2.5" rx="1" fill="#1e2230" />
      <circle cx="67.5" cy="130.2" r="1.1" fill={accent} />
    </g>
  );

  return (
    <g>
      {head}
      {arms()}

      {/* Churidar / Trousers */}
      <g>
        {/* Left leg */}
        <path d="M84 186 L85 240 H94 L97 186 Z" fill={trouserColor} />
        {/* Right leg */}
        <path d="M103 186 L106 240 H115 L116 186 Z" fill={trouserColor} />
        {/* Churidar gather creases */}
        <path d="M85 224 Q89 222 94 224" stroke="#d5ccba" strokeWidth="1.2" fill="none" />
        <path d="M85 232 Q89 230 94 232" stroke="#d5ccba" strokeWidth="1.2" fill="none" />
        <path d="M106 224 Q110 222 115 224" stroke="#d5ccba" strokeWidth="1.2" fill="none" />
        <path d="M106 232 Q110 230 115 232" stroke="#d5ccba" strokeWidth="1.2" fill="none" />

        {/* Mojari / Footwear */}
        <path d="M79 240 Q86 238 95 242 H80 Q77 241 79 240 Z" fill="#2d1d13" />
        <path d="M105 242 Q114 238 121 240 Q123 241 120 242 Z" fill="#2d1d13" />
        <circle cx="87" cy="240" r="0.8" fill={accent} />
        <circle cx="113" cy="240" r="0.8" fill={accent} />
      </g>

      {/* Kurta Body (Broad masculine silhouette) */}
      <path
        d="M72 72 Q100 66 128 72 L127 136 L128 188 Q100 193 72 188 L73 136 Z"
        fill={cloth}
      />
      <path
        d="M72 72 Q100 66 128 72 L127 136 L128 188 Q100 193 72 188 L73 136 Z"
        fill={fold}
      />

      {/* Side slits */}
      <path d="M73 144 V188" stroke="#000" strokeOpacity=".2" strokeWidth="1" />
      <path d="M127 144 V188" stroke="#000" strokeOpacity=".2" strokeWidth="1" />

      {/* Hem border */}
      <path d="M72 184 Q100 189 128 184 L128 188 Q100 193 72 188 Z" fill={accent} opacity=".9" />

      {/* Mandarin / Nehru stand-up collar */}
      <path d="M93 68 Q100 70 107 68 L107 64 Q100 66 93 64 Z" fill={accent} />
      <path d="M94 65 Q100 67 106 65" stroke="#fff" strokeWidth=".8" fill="none" opacity=".6" />

      {/* Center button placket */}
      <rect x="98.5" y="68" width="3" height="46" rx="1.5" fill={accent} opacity=".95" />
      {[75, 85, 95, 105].map((y) => (
        <circle key={y} cx="100" cy={y} r="0.9" fill="#fff" />
      ))}

      {/* Pocket Welt */}
      <path d="M110 84 H119" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M112 83 L114 80 L116 83" fill={accent} opacity=".8" />
    </g>
  );
}

/** Lighten (positive) / darken (negative) a hex colour by percent. */
export function shade(hex, pct) {
  const h = hex.replace("#", "");
  const num = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  const f = (c) => {
    const v = pct >= 0 ? c + ((255 - c) * pct) / 100 : c * (1 + pct / 100);
    return Math.max(0, Math.min(255, Math.round(v)));
  };
  const r = f((num >> 16) & 255), gr = f((num >> 8) & 255), b = f(num & 255);
  return `#${((1 << 24) + (r << 16) + (gr << 8) + b).toString(16).slice(1)}`;
}
