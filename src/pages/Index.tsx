import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhatIsSection from "@/components/WhatIsSection";
import WhatWeDoSection from "@/components/WhatWeDoSection";
import WhoWeAreSection from "@/components/WhoWeAreSection";
import TryCtaSection from "@/components/TryCtaSection";
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
        <WhoWeAreSection />
        <TryCtaSection />
      </main>
      <SiteFooter />
    </>
  );
};

export default Index;
