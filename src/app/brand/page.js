import { Screen, TopBar } from "@/components/Screen";
import BrandBrainForm from "@/components/BrandBrainForm";

export default function BrandBrain() {
  return (
    <Screen tone="soft" width="narrow">
      <TopBar title="Brand Brain" subtitle="Your style guide for every post." />
      <BrandBrainForm cta="Save changes" next={null} />
    </Screen>
  );
}
