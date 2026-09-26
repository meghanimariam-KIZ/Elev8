import { Screen, TopBar } from "@/components/Screen";
import BrandBrainForm from "@/components/BrandBrainForm";

export default function BrandBrain() {
  return (
    <Screen tone="soft">
      <TopBar title="Brand Brain" back="/profile" />
      <BrandBrainForm cta="Save changes" next="/profile" />
    </Screen>
  );
}
