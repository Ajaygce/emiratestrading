import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, ShieldCheck, MessageSquare, Package } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HowItWorksSectionProps {
  className?: string;
}

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Post or discover',
    description: 'Buyers post inquiries; suppliers showcase capabilities.',
  },
  {
    number: '02',
    icon: ShieldCheck,
    title: 'Match & verify',
    description: 'We confirm specs, certifications, and availability.',
  },
  {
    number: '03',
    icon: MessageSquare,
    title: 'Quote & negotiate',
    description: 'Receive structured quotes and finalize terms.',
  },
  {
    number: '04',
    icon: Package,
    title: 'Close & deliver',
    description: 'Documentation, logistics, and payment support.',
  },
];

const HowItWorksSection = ({ className = '' }: HowItWorksSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 20, opacity: 0 },
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

      // Timeline line animation
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: lineRef.current,
            start: 'top 80%',
            end: 'bottom 60%',
            scrub: true,
          },
        }
      );

      // Steps animation
      stepsRef.current.forEach((step) => {
        if (step) {
          gsap.fromTo(
            step,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: step,
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

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className={`section-flowing bg-secondary-dark py-20 lg:py-32 ${className}`}
    >
      <div className="px-6 lg:px-[9vw]">
        {/* Heading */}
        <div ref={headingRef} className="text-center max-w-xl mx-auto mb-12 lg:mb-16">
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-primary-light mb-4">
            How it works
          </h2>
          <p className="text-base lg:text-lg text-secondary-light">
            A simple, repeatable process—whether you're sourcing or selling.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line (desktop) */}
          <div
            ref={lineRef}
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/10 origin-top"
            style={{ transform: 'translateX(-50%)' }}
          />

          {/* Steps */}
          <div className="space-y-8 lg:space-y-0">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={step.number}
                  ref={(el) => { stepsRef.current[index] = el; }}
                  className={`relative lg:grid lg:grid-cols-2 lg:gap-8 ${
                    index > 0 ? 'lg:mt-8' : ''
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`${
                      isLeft ? 'lg:pr-16 lg:text-right' : 'lg:col-start-2 lg:pl-16'
                    }`}
                  >
                    <div className="glass-card rounded-2xl p-6 inline-block w-full lg:w-auto">
                      <div
                        className={`flex items-center gap-4 mb-3 ${
                          isLeft ? 'lg:flex-row-reverse' : ''
                        }`}
                      >
                        <div className="w-10 h-10 rounded-xl bg-accent-periwinkle/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 accent-periwinkle" />
                        </div>
                        <span className="label-mono text-secondary-light">
                          Step {step.number}
                        </span>
                      </div>
                      <h3 className="font-display font-semibold text-xl text-primary-light mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-secondary-light">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Center dot (desktop) */}
                  <div className="hidden lg:block absolute left-1/2 top-6 transform -translate-x-1/2">
                    <div className="w-4 h-4 rounded-full bg-accent-periwinkle" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
