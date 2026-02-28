import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhatIsSection from "@/components/WhatIsSection";
import WhatWeDoSection from "@/components/WhatWeDoSection";
import WhoWeAreSection from "@/components/WhoWeAreSection";
import TryCtaSection from "@/components/TryCtaSection";
import ContactSection from "@/components/ContactSection";
import SiteFooter from "@/components/SiteFooter";

const Index = () => {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <WhatIsSection />
        <WhatWeDoSection />
        <TryCtaSection />
        <WhoWeAreSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
};

export default Index;
