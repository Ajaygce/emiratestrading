import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileCheck, Truck, FileText } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ServicesSectionProps {
  className?: string;
}

const services = [
  {
    icon: FileCheck,
    title: 'Customs & Compliance',
    description: 'Classification, duties, and clearance guidance.',
  },
  {
    icon: Truck,
    title: 'Logistics Coordination',
    description: 'Freight, warehousing, and last-mile options.',
  },
  {
    icon: FileText,
    title: 'Trade Documentation',
    description: 'Contracts, certificates, and invoicing.',
  },
];

const ServicesSection = ({ className = '' }: ServicesSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Text animation
      gsap.fromTo(
        textRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: true,
          },
        }
      );

      // Image animation
      gsap.fromTo(
        imageRef.current,
        { x: '6vw', opacity: 0, scale: 1.02 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
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

      // Cards animation
      cardsRef.current.forEach((card) => {
        if (card) {
          gsap.fromTo(
            card,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
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

  return (
    <section
      ref={sectionRef}
      id="services"
      className={`section-flowing bg-primary-dark py-20 lg:py-32 ${className}`}
    >
      <div className="px-6 lg:px-[9vw]">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 lg:gap-16">
          {/* Left Text */}
          <div ref={textRef} className="lg:max-w-[42vw]">
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-primary-light mb-4">
              Import & Export services
            </h2>
            <p className="text-base lg:text-lg text-secondary-light">
              Documentation, logistics, compliance, and payment support—so deals
              close without delays.
            </p>
          </div>

          {/* Right Image */}
          <div
            ref={imageRef}
            className="lg:absolute lg:right-[6vw] lg:top-20 lg:w-[38vw] lg:h-[56vh] rounded-2xl overflow-hidden"
          >
            <img
              src="/services_office.jpg"
              alt="Trade services"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12 lg:mt-20">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="glass-card rounded-2xl p-6 hover:translate-y-[-6px] transition-transform duration-300"
              >
                <Icon className="w-8 h-8 accent-periwinkle mb-4" />
                <h3 className="font-display font-semibold text-lg text-primary-light mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-secondary-light">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
