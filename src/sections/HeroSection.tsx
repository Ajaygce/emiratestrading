import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  // Load animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Background animation
      tl.fromTo(
        bgRef.current,
        { scale: 1.08, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1 }
      );

      // Label
      tl.fromTo(
        labelRef.current,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        '-=0.6'
      );

      // Headline words animation
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        tl.fromTo(
          words,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.04 },
          '-=0.3'
        );
      }

      // Subheadline
      tl.fromTo(
        subheadlineRef.current,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        '-=0.4'
      );

      // CTA
      tl.fromTo(
        ctaRef.current,
        { y: 10, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.45 },
        '-=0.3'
      );

      // Right card
      tl.fromTo(
        cardRef.current,
        { x: '8vw', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7 },
        '-=0.5'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back
            gsap.set([headlineRef.current, subheadlineRef.current, ctaRef.current, cardRef.current, labelRef.current], {
              opacity: 1, x: 0, y: 0
            });
            gsap.set(bgRef.current, { scale: 1, y: 0 });
          }
        }
      });

      // EXIT phase (70% - 100%)
      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        subheadlineRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(
        ctaRef.current,
        { opacity: 1, y: 0 },
        { opacity: 0, y: '10vh', ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(
        cardRef.current,
        { x: 0, opacity: 1 },
        { x: '10vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        labelRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, y: 0 },
        { scale: 1.06, y: '-3vh', ease: 'none' },
        0.7
      );
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
      className={`section-pinned ${className}`}
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{ willChange: 'transform' }}
      >
        <img
          src="/hero_port_city.jpg"
          alt="Port city"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0B0F17]/55" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full px-6 lg:px-[9vw]">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-0">
            {/* Left Content */}
            <div className="max-w-[52vw] lg:max-w-[52vw]">
              <span
                ref={labelRef}
                className="label-mono text-secondary-light block mb-6"
              >
                B2B Trade Platform
              </span>

              <h1
                ref={headlineRef}
                className="font-display font-bold text-4xl sm:text-5xl lg:text-[clamp(44px,6vw,84px)] text-primary-light leading-[0.95] mb-6"
              >
                <span className="word inline-block">Connect</span>{' '}
                <span className="word inline-block">globally.</span>
                <br />
                <span className="word inline-block">Source</span>{' '}
                <span className="word inline-block">locally.</span>
              </h1>

              <p
                ref={subheadlineRef}
                className="text-base lg:text-lg text-secondary-light max-w-md mb-8"
              >
                A curated network of verified suppliers and buyers across the UAE.
              </p>

              <div ref={ctaRef}>
                <button onClick={scrollToQuote} className="btn-primary">
                  Request a quote
                </button>
              </div>
            </div>

            {/* Right Card */}
            <div
              ref={cardRef}
              className="glass-card rounded-2xl p-6 lg:p-7 w-full lg:w-[28vw] lg:min-w-[300px]"
              style={{ willChange: 'transform, opacity' }}
            >
              <h3 className="font-display font-semibold text-lg text-primary-light mb-5">
                Why Emirates Trading
              </h3>

              <ul className="space-y-3 mb-6">
                {[
                  'Verified suppliers & buyers',
                  'End-to-end trade support',
                  'Fast, transparent pricing',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 accent-periwinkle flex-shrink-0" />
                    <span className="text-sm text-secondary-light">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-5 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-8 h-8 accent-periwinkle" />
                  <div>
                    <div className="font-display font-bold text-2xl accent-periwinkle">
                      3,200+
                    </div>
                    <div className="text-xs text-secondary-light">
                      Successful deals
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
