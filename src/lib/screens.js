// Every screen in the ELEV8 flow, grouped the way the design board is laid out.
export const SCREEN_GROUPS = [
  {
    title: "Onboarding",
    screens: [
      { href: "/", label: "Splash" },
      { href: "/welcome", label: "Welcome" },
      { href: "/signup", label: "Create account" },
      { href: "/onboarding/business", label: "Business setup" },
      { href: "/onboarding/brand", label: "Brand Brain setup" },
    ],
  },
  {
    title: "Workspace",
    screens: [
      { href: "/home", label: "Home" },
      { href: "/products", label: "Product library" },
      { href: "/products/new", label: "Add product" },
      { href: "/products/new/analyzing", label: "AI product understanding" },
      { href: "/products/new/details", label: "Detected attributes" },
    ],
  },
  {
    title: "Create content",
    screens: [
      { href: "/create", label: "Choose experience" },
      { href: "/create/processing", label: "AI processing" },
      { href: "/create/review", label: "Content review" },
      { href: "/create/feedback", label: "Reject & feedback" },
      { href: "/create/voice", label: "Voice listening" },
      { href: "/create/interpretation", label: "Interpretation" },
      { href: "/create/regenerating", label: "New version" },
      { href: "/publish", label: "Ready to publish" },
    ],
  },
  {
    title: "Virtual experience",
    screens: [
      { href: "/experience", label: "Experience home" },
      { href: "/experience/try-on", label: "Live camera try-on" },
      { href: "/experience/model", label: "Choose your model" },
      { href: "/experience/model/view", label: "AI model view" },
      { href: "/experience/360", label: "360° view" },
    ],
  },
  {
    title: "Grow",
    screens: [
      { href: "/calendar", label: "Content calendar" },
      { href: "/analytics", label: "Analytics" },
      { href: "/brand", label: "Brand Brain" },
      { href: "/profile", label: "Profile & settings" },
    ],
  },
];
