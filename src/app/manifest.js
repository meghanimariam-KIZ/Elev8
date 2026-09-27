export default function manifest() {
  return {
    name: "ELEV8 — AI-Powered Retail",
    short_name: "ELEV8",
    description: "Your digital AI employee for physical retail.",
    start_url: "/home",
    display: "standalone",
    background_color: "#f7f6fd",
    theme_color: "#7a4dff",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
