import { Screen, TopBar } from "@/components/Screen";
import BrandBrainForm from "@/components/BrandBrainForm";

export default function BrandSetup() {
  return (
    <Screen tone="soft">
      <TopBar back="/onboarding/business">
        <div className="stepper" style={{ width: 120, marginRight: 8 }}><i className="on" /><i className="on" /><i className="on" /></div>
      </TopBar>
      <div style={{ padding: "0 20px 4px" }}>
        <p className="eyebrow">Step 3 of 3 · Brand Brain</p>
        <h1 className="h-lg mt-4">Teach ELEV8 your brand</h1>
      </div>
      <BrandBrainForm cta="Save & Continue" next="/home" />
    </Screen>
  );
}
