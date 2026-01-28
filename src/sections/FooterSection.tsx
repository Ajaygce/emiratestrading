import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FooterSectionProps {
  className?: string;
}

const platformLinks = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Request a quote', href: '#quote' },
];

const industryLinks = [
  { label: 'Steel', href: '#industries' },
  { label: 'Food', href: '#industries' },
  { label: 'FMCG', href: '#industries' },
  { label: 'Electronics', href: '#industries' },
  { label: 'Building Materials', href: '#industries' },
];

const legalLinks = [
  { label: 'Terms', href: '#' },
  { label: 'Privacy', href: '#' },
  { label: 'Cookies', href: '#' },
];

const FooterSection = ({ className = '' }: FooterSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Left column animation
      gsap.fromTo(
        leftRef.current,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: leftRef.current,
            start: 'top 85%',
            end: 'top 60%',
            scrub: true,
          },
        }
      );

      // Right column animation
      gsap.fromTo(
        rightRef.current,
        { y: 14, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: rightRef.current,
            start: 'top 85%',
            end: 'top 60%',
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    if (href === '#') return;
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={sectionRef}
      className={`section-flowing bg-secondary-dark py-16 lg:py-24 ${className}`}
    >
      <div className="px-6 lg:px-[9vw]">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-12 lg:gap-16 mb-12">
          {/* Left Column - Brand & Contact */}
          <div ref={leftRef} className="lg:max-w-sm">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="font-display font-bold text-xl text-primary-light block mb-3"
            >
              Emirates Trading
            </a>
            <p className="text-sm text-secondary-light mb-6">
              Connecting global suppliers with UAE buyers.
            </p>

            <div className="space-y-3">
              <a
                href="mailto:hello@emiratestrading.ae"
                className="flex items-center gap-3 text-sm text-secondary-light hover:text-primary-light transition-colors"
              >
                <Mail className="w-4 h-4" />
                hello@emiratestrading.ae
              </a>
              <a
                href="tel:+97141234567"
                className="flex items-center gap-3 text-sm text-secondary-light hover:text-primary-light transition-colors"
              >
                <Phone className="w-4 h-4" />
                +971 4 123 4567
              </a>
              <div className="flex items-center gap-3 text-sm text-secondary-light">
                <MapPin className="w-4 h-4" />
                Dubai, UAE
              </div>
            </div>
          </div>

          {/* Right Column - Links */}
          <div
            ref={rightRef}
            className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-16"
          >
            {/* Platform */}
            <div>
              <h4 className="font-display font-medium text-primary-light mb-4">
                Platform
              </h4>
              <ul className="space-y-2">
                {platformLinks.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-sm text-secondary-light hover:text-primary-light transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Industries */}
            <div>
              <h4 className="font-display font-medium text-primary-light mb-4">
                Industries
              </h4>
              <ul className="space-y-2">
                {industryLinks.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-sm text-secondary-light hover:text-primary-light transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-display font-medium text-primary-light mb-4">
                Legal
              </h4>
              <ul className="space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-sm text-secondary-light hover:text-primary-light transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-secondary-light">
            © 2026 Emirates Trading. All rights reserved.
          </p>
          <p className="text-xs text-secondary-light">
            Designed for the future of trade.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
