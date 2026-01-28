import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ValuePropSectionProps {
  className?: string;
  id?: string;
  backgroundImage: string;
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
  metricValue: string;
  metricLabel: string;
  secondaryLink: string;
  secondaryLinkHref: string;
  entranceDirection?: 'left' | 'bottom';
}

const ValuePropSection = ({
  className = '',
  id,
  backgroundImage,
  headline,
  subheadline,
  ctaText,
  ctaLink,
  metricValue,
  metricLabel,
  secondaryLink,
  secondaryLinkHref,
  entranceDirection = 'left',
}: ValuePropSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0% - 30%)
      if (entranceDirection === 'left') {
        scrollTl.fromTo(
          headlineRef.current,
          { x: '-50vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'power2.out' },
          0
        );
      } else {
        scrollTl.fromTo(
          headlineRef.current,
          { y: '35vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'power2.out' },
          0
        );
      }

      scrollTl.fromTo(
        subheadlineRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.05
      );

      scrollTl.fromTo(
        ctaRef.current,
        { y: 22, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, ease: 'power2.out' },
        0.1
      );

      scrollTl.fromTo(
        cardRef.current,
        { x: '55vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      scrollTl.fromTo(
        bgRef.current,
        { scale: 1.08, y: '6vh' },
        { scale: 1, y: 0, ease: 'power2.out' },
        0
      );

      // SETTLE (30% - 70%) - elements hold position

      // EXIT (70% - 100%)
      if (entranceDirection === 'left') {
        scrollTl.fromTo(
          headlineRef.current,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.7
        );
      } else {
        scrollTl.fromTo(
          headlineRef.current,
          { y: 0, opacity: 1 },
          { y: '-10vh', opacity: 0, ease: 'power2.in' },
          0.7
        );
      }

      scrollTl.fromTo(
        subheadlineRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(
        ctaRef.current,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(
        cardRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, y: 0 },
        { scale: 1.06, y: '-4vh', ease: 'none' },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [entranceDirection]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`section-pinned ${className}`}
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{ willChange: 'transform' }}
      >
        <img
          src={backgroundImage}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0B0F17]/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full px-6 lg:px-[9vw]">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-0">
            {/* Left Content */}
            <div className="max-w-[58vw] lg:max-w-[58vw]">
              <h2
                ref={headlineRef}
                className="font-display font-bold text-3xl sm:text-4xl lg:text-[clamp(36px,5vw,64px)] text-primary-light leading-[1.05] mb-6"
                style={{ willChange: 'transform, opacity' }}
              >
                {headline}
              </h2>

              <p
                ref={subheadlineRef}
                className="text-base lg:text-lg text-secondary-light max-w-lg mb-8"
                style={{ willChange: 'opacity' }}
              >
                {subheadline}
              </p>

              <div ref={ctaRef} className="flex flex-wrap items-center gap-4" style={{ willChange: 'transform, opacity' }}>
                <button
                  onClick={() => scrollToSection(ctaLink)}
                  className="btn-primary"
                >
                  {ctaText}
                </button>
              </div>
            </div>

            {/* Right Metric Card */}
            <div
              ref={cardRef}
              className="glass-card rounded-2xl p-6 lg:p-7 w-full lg:w-[26vw] lg:min-w-[280px]"
              style={{ willChange: 'transform, opacity' }}
            >
              <div className="flex items-center gap-4 mb-5">
                <TrendingUp className="w-10 h-10 accent-periwinkle" />
                <div>
                  <div className="font-display font-bold text-3xl accent-periwinkle">
                    {metricValue}
                  </div>
                  <div className="text-sm text-secondary-light">{metricLabel}</div>
                </div>
              </div>

              <button
                onClick={() => scrollToSection(secondaryLinkHref)}
                className="flex items-center gap-2 text-sm text-secondary-light hover:text-primary-light transition-colors group"
              >
                {secondaryLink}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuePropSection;
