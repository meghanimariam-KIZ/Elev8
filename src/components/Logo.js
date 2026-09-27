import Image from "next/image";

/** ELEV8 logo – renders the brand logo image at the requested size. */
export default function Logo({ size = 28, light = false, stacked = false }) {
  /* The logo image is portrait-oriented (709x1138).
     We size by height and maintain the natural 0.623 aspect ratio. */
  const h = size;
  const w = Math.max(1, Math.round(h * (709 / 1138)));

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        lineHeight: 1,
        ...(light ? { filter: "brightness(1.15) drop-shadow(0 2px 14px rgba(80,60,255,.4))" } : {}),
      }}
      aria-label="ELEV8"
    >
      <Image
        src="/elev8-logo.png"
        alt="ELEV8"
        width={709}
        height={1138}
        priority
        style={{
          width: "auto",
          height: h,
          maxWidth: "100%",
          objectFit: "contain",
        }}
      />
    </span>
  );
}
