/** Small Instagram-style glyph (lucide no longer ships brand icons). */
export default function InstagramGlyph({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id="ig-g" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#feda75" />
          <stop offset=".35" stopColor="#fa7e1e" />
          <stop offset=".6" stopColor="#d62976" />
          <stop offset="1" stopColor="#4f5bd5" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#ig-g)" />
      <circle cx="12" cy="12" r="4.3" fill="none" stroke="#fff" strokeWidth="2" />
      <circle cx="17.3" cy="6.7" r="1.3" fill="#fff" />
    </svg>
  );
}
