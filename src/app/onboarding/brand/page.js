import { Screen, TopBar } from "@/components/Screen";
import BrandBrainForm from "@/components/BrandBrainForm";
import AuthLayout from "@/components/AuthLayout";

export default function BrandSetup() {
  return (
    <AuthLayout variant="saree" scene="luxury" headline={<>Teach it once.<br />On-brand forever.</>} copy="Brand Brain remembers your colours, tone and audience so every caption and visual feels like you.">
    <Screen tone="soft" width="narrow">
      <TopBar back="/onboarding/category">
        <div className="stepper" style={{ width: 160, marginRight: 8 }}><i className="on" /><i className="on" /><i className="on" /><i className="on" /></div>
      </TopBar>
      <div className="body" style={{ flex: "none", paddingBottom: 0 }}>
        <p className="eyebrow">Step 4 of 4 · Brand Brain</p>
        <h1 className="h-lg mt-4">Teach ELEV8 your brand</h1>
      </div>
      <BrandBrainForm cta="Save & Continue" next="/home" />
    </Screen>
    </AuthLayout>
  );
}
