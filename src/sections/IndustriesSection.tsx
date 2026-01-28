import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface IndustriesSectionProps {
  className?: string;
}

const industries = [
  {
    title: 'Steel',
    description: 'Structurals, coils, rebar',
    image: '/industry_steel.jpg',
    span: 'lg:col-span-6',
    height: 'h-[320px]',
  },
  {
    title: 'Food & Agriculture',
    description: 'Grains, dairy, produce',
    image: '/industry_food.jpg',
    span: 'lg:col-span-6',
    height: 'h-[320px]',
  },
  {
    title: 'FMCG',
    description: 'Household, personal care, packaged goods',
    image: '/industry_fmcg.jpg',
    span: 'lg:col-span-4',
    height: 'h-[260px]',
  },
  {
    title: 'Electronics',
    description: 'Components, devices, accessories',
    image: '/industry_electronics.jpg',
    span: 'lg:col-span-4',
    height: 'h-[260px]',
  },
  {
    title: 'Building Materials',
    description: 'Cement, insulation, finishes',
    image: '/industry_building.jpg',
    span: 'lg:col-span-4',
    height: 'h-[260px]',
  },
];

const IndustriesSection = ({ className = '' }: IndustriesSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 24, opacity: 0 },
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
            { y: 40, opacity: 0, scale: 0.98 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 55%',
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
      id="industries"
      className={`section-flowing bg-primary-dark py-20 lg:py-32 ${className}`}
    >
      <div className="px-6 lg:px-[9vw]">
        {/* Heading */}
        <div ref={headingRef} className="max-w-2xl mb-12 lg:mb-16">
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-primary-light mb-4">
            Industries we serve
          </h2>
          <p className="text-base lg:text-lg text-secondary-light">
            From raw materials to finished goods—connect with specialists across
            key sectors.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
          {industries.map((industry, index) => (
            <div
              key={industry.title}
              ref={(el) => { cardsRef.current[index] = el; }}
              className={`${industry.span} group relative overflow-hidden rounded-2xl cursor-pointer`}
            >
              <div className={`relative ${industry.height} overflow-hidden`}>
                {/* Image */}
                <img
                  src={industry.image}
                  alt={industry.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17]/90 via-[#0B0F17]/40 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
                  <h3 className="font-display font-semibold text-xl lg:text-2xl text-primary-light mb-1">
                    {industry.title}
                  </h3>
                  <p className="text-sm text-secondary-light">
                    {industry.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 lg:mt-12">
          <button className="btn-secondary inline-flex items-center gap-2 group">
            Explore all industries
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
