"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Screen } from "@/components/Screen";
import Logo from "@/components/Logo";
import styles from "./splash.module.css";

export default function Splash() {
  const router = useRouter();
  useEffect(() => {
    const t = setTimeout(() => router.push("/welcome"), 3200);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <Screen tone="black" overlayStatus>
      <button className={styles.wrap} onClick={() => router.push("/welcome")} aria-label="Continue to ELEV8">
        <div className={styles.aurora} aria-hidden="true">
          <span className={styles.ribbonA} />
          <span className={styles.ribbonB} />
          <span className={styles.ribbonC} />
        </div>
        <div className={styles.center}>
          <Logo size={64} light />
          <p className={styles.tag}>AI-Powered Retail<br />Transformation</p>
        </div>
        <p className={styles.bottom}>
          One Product <span className="grad-text">→</span><br />Multiple Experiences.
        </p>
      </button>
    </Screen>
  );
}
