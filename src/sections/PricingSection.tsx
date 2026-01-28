import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Store, ShoppingCart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface PricingSectionProps {
  className?: string;
}

const supplierFeatures = [
  'Free listing',
  'Featured placement (AED 299/mo)',
  'Qualified leads (pay-per-inquiry)',
];

const buyerFeatures = [
  'Free to post inquiries',
  'Sourcing assistance (AED 499/mo)',
  'Vendor shortlisting (custom)',
];

const PricingSection = ({ className = '' }: PricingSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: true,
          },
        }
      );

      // Cards animation
      cardsRef.current.forEach((card) => {
        if (card) {
          gsap.fromTo(
            card,
            { y: 30, opacity: 0, scale: 0.98 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 60%',
                scrub: true,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToQuote = () => {
    const element = document.querySelector('#quote');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className={`section-flowing bg-primary-dark py-20 lg:py-32 ${className}`}
    >
      <div className="px-6 lg:px-[9vw]">
        {/* Heading */}
        <div ref={headingRef} className="text-center max-w-xl mx-auto mb-12 lg:mb-16">
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-primary-light mb-4">
            Pricing
          </h2>
          <p className="text-base lg:text-lg text-secondary-light">
            Choose what fits your volume. No hidden fees.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {/* Supplier Card */}
          <div
            ref={(el) => { cardsRef.current[0] = el; }}
            className="glass-card rounded-2xl p-7 lg:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent-periwinkle/10 flex items-center justify-center">
                <Store className="w-5 h-5 accent-periwinkle" />
              </div>
              <h3 className="font-display font-semibold text-xl text-primary-light">
                For Suppliers
              </h3>
            </div>

            <ul className="space-y-3 mb-8">
              {supplierFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <Check className="w-5 h-5 accent-periwinkle flex-shrink-0" />
                  <span className="text-sm text-secondary-light">{feature}</span>
                </li>
              ))}
            </ul>

            <button onClick={scrollToQuote} className="btn-primary w-full">
              List your business
            </button>
          </div>

          {/* Buyer Card */}
          <div
            ref={(el) => { cardsRef.current[1] = el; }}
            className="glass-card rounded-2xl p-7 lg:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent-periwinkle/10 flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 accent-periwinkle" />
              </div>
              <h3 className="font-display font-semibold text-xl text-primary-light">
                For Buyers
              </h3>
            </div>

            <ul className="space-y-3 mb-8">
              {buyerFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <Check className="w-5 h-5 accent-periwinkle flex-shrink-0" />
                  <span className="text-sm text-secondary-light">{feature}</span>
                </li>
              ))}
            </ul>

            <button onClick={scrollToQuote} className="btn-primary w-full">
              Request a quote
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
