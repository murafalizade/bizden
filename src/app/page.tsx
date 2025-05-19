import { MainSection } from "@/app/components/MainSection";
import { AboutSection } from "@/app/components/AboutSection"
import { VisionSection } from "@/app/components/VisionSection";
import { HowSection } from "@/app/components/HowSection";
import { ContactSection } from "@/app/components/ContactSection";

export default function Home() {

  return (
    <div>
      <MainSection />
      <AboutSection />
      <VisionSection />
      <HowSection />
      <ContactSection />
    </div>
  );
}
