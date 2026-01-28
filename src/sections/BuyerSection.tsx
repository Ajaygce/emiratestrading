import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, BarChart3, Headphones, ArrowRight, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface BuyerSectionProps {
  className?: string;
}

const benefits = [
  {
    icon: Shield,
    title: 'Pre-verified supplier network',
    description: 'Access trusted suppliers vetted by our team.',
  },
  {
    icon: BarChart3,
    title: 'Structured quote comparison',
    description: 'Compare offers side-by-side with clear metrics.',
  },
  {
    icon: Headphones,
    title: 'Dedicated sourcing support',
    description: 'Get expert help throughout your procurement journey.',
  },
];

const BuyerSection = ({ className = '' }: BuyerSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      gsap.fromTo(
        contentRef.current,
        { x: '-4vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: true,
          },
        }
      );

      // Image animation
      gsap.fromTo(
        imageRef.current,
        { x: '6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: true,
          },
        }
      );

      // Benefits animation
      benefitsRef.current.forEach((benefit) => {
        if (benefit) {
          gsap.fromTo(
            benefit,
            { y: 14, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: benefit,
                start: 'top 85%',
                end: 'top 65%',
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
      id="buyer"
      className={`section-flowing bg-primary-dark py-20 lg:py-32 ${className}`}
    >
      <div className="relative">
        <div className="flex flex-col-reverse lg:flex-row">
          {/* Left Content */}
          <div
            ref={contentRef}
            className="lg:w-1/2 px-6 lg:px-[9vw] py-10 lg:py-0 lg:pt-16"
          >
            <div className="max-w-lg">
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-primary-light mb-4">
                Buyer onboarding
              </h2>
              <p className="text-base lg:text-lg text-secondary-light mb-8">
                Post your requirements, compare quotes, and choose the right
                partner—fast.
              </p>

              {/* Benefits */}
              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div
                      key={benefit.title}
                      ref={(el) => { benefitsRef.current[index] = el; }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-10 h-10 rounded-xl bg-accent-periwinkle/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 accent-periwinkle" />
                      </div>
                      <div>
                        <h4 className="font-display font-medium text-primary-light mb-1">
                          {benefit.title}
                        </h4>
                        <p className="text-sm text-secondary-light">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4">
                <button onClick={scrollToQuote} className="btn-primary">
                  Start sourcing
                </button>
                <button className="flex items-center gap-2 text-sm text-secondary-light hover:text-primary-light transition-colors group">
                  <MessageCircle className="w-4 h-4" />
                  Talk to a specialist
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div
            ref={imageRef}
            className="lg:w-[44vw] lg:h-[600px] h-[300px] relative"
          >
            <img
              src="/buyer_onboarding.jpg"
              alt="Buyer onboarding"
              className="w-full h-full object-cover"
            />
            {/* Soft fade overlay on left */}
            <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#0B0F17] to-transparent hidden lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuyerSection;
