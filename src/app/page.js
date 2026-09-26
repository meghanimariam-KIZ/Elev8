"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import styles from "./splash.module.css";

export default function Splash() {
  const router = useRouter();
  useEffect(() => {
    const t = setTimeout(() => router.push("/welcome"), 2800);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <button className={styles.wrap} onClick={() => router.push("/welcome")} aria-label="Continue to ELEV8">
      <div className={styles.aurora} aria-hidden="true">
        <span className={styles.ribbonA} />
        <span className={styles.ribbonB} />
        <span className={styles.ribbonC} />
      </div>
      <div className={styles.center}>
        <Logo size={72} light />
        <p className={styles.tag}>AI-Powered Retail Transformation</p>
      </div>
      <p className={styles.bottom}>
        One Product <span className="grad-text">→</span> Multiple Experiences.
      </p>
    </button>
  );
}
