import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from './sections/Header';
import HeroSection from './sections/HeroSection';
import ValuePropSection from './sections/ValuePropSection';
import IndustriesSection from './sections/IndustriesSection';
import ServicesSection from './sections/ServicesSection';
import HowItWorksSection from './sections/HowItWorksSection';
import SupplierSection from './sections/SupplierSection';
import BuyerSection from './sections/BuyerSection';
import PricingSection from './sections/PricingSection';
import QuoteSection from './sections/QuoteSection';
import FooterSection from './sections/FooterSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Global snap for pinned sections
    const setupGlobalSnap = () => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(r => value >= r.start - 0.08 && value <= r.end + 0.08);
            if (!inPinned) return value;

            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: "power2.out"
        }
      });
    };

    // Delay snap setup to ensure all ScrollTriggers are created
    const timer = setTimeout(setupGlobalSnap, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative bg-primary-dark">
      {/* Viewport frame */}
      <div className="viewport-frame hidden md:block" />
      
      {/* Noise overlay */}
      <div className="noise-overlay" />
      
      {/* Header */}
      <Header />
      
      {/* Main content */}
      <main className="relative">
        {/* Section 1: Hero */}
        <HeroSection className="z-10" />
        
        {/* Section 2: Find Supplier */}
        <ValuePropSection
          className="z-20"
          id="find-supplier"
          backgroundImage="/supplier_warehouse.jpg"
          headline="Find the right supplier—without the endless search."
          subheadline="Browse verified categories, compare capabilities, and start conversations in minutes."
          ctaText="Explore suppliers"
          ctaLink="#industries"
          metricValue="850+"
          metricLabel="Verified suppliers"
          secondaryLink="See all industries"
          secondaryLinkHref="#industries"
        />
        
        {/* Section 3: Cut Procurement Time */}
        <ValuePropSection
          className="z-30"
          id="cut-time"
          backgroundImage="/procurement_factory.jpg"
          headline="Cut procurement time from weeks to days."
          subheadline="Structured inquiries, clear specs, and faster approvals—built for teams that move."
          ctaText="Request a quote"
          ctaLink="#quote"
          metricValue="68%"
          metricLabel="Faster sourcing"
          secondaryLink="How it works"
          secondaryLinkHref="#how-it-works"
        />
        
        {/* Section 4: Expand to UAE */}
        <ValuePropSection
          className="z-40"
          id="expand-uae"
          backgroundImage="/expand_port.jpg"
          headline="Expand into the UAE with confidence."
          subheadline="Get discovered by buyers, receive qualified inquiries, and close deals with local support."
          ctaText="Join as a supplier"
          ctaLink="#supplier"
          metricValue="1,200+"
          metricLabel="Buyer accounts"
          secondaryLink="Supplier benefits"
          secondaryLinkHref="#supplier"
          entranceDirection="bottom"
        />
        
        {/* Section 5: Industries */}
        <IndustriesSection className="z-50" />
        
        {/* Section 6: Services */}
        <ServicesSection className="z-[60]" />
        
        {/* Section 7: How It Works */}
        <HowItWorksSection className="z-[70]" />
        
        {/* Section 8: Supplier Onboarding */}
        <SupplierSection className="z-[80]" />
        
        {/* Section 9: Buyer Onboarding */}
        <BuyerSection className="z-[90]" />
        
        {/* Section 10: Pricing */}
        <PricingSection className="z-[100]" />
        
        {/* Section 11: Quote Form */}
        <QuoteSection className="z-[110]" />
        
        {/* Section 12: Footer */}
        <FooterSection className="z-[120]" />
      </main>
    </div>
  );
}

export default App;
