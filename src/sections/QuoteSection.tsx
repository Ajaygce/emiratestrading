import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Clock, Shield, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface QuoteSectionProps {
  className?: string;
}

const productCategories = [
  'Steel',
  'Food & Agriculture',
  'FMCG',
  'Electronics',
  'Building Materials',
  'Other',
];

const QuoteSection = ({ className = '' }: QuoteSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    category: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Form animation
      gsap.fromTo(
        formRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formRef.current,
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        category: '',
        message: '',
      });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="quote"
      className={`section-flowing bg-primary-dark py-20 lg:py-32 ${className}`}
    >
      <div className="px-6 lg:px-[9vw]">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 lg:gap-16">
          {/* Left Form */}
          <div ref={formRef} className="lg:max-w-[42vw] w-full">
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-primary-light mb-4">
              Request a quote
            </h2>
            <p className="text-base lg:text-lg text-secondary-light mb-8">
              Tell us what you need. We'll match you with the right suppliers and
              send a quote within 48 hours.
            </p>

            {isSubmitted ? (
              <div className="glass-card rounded-2xl p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-accent-periwinkle/10 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 accent-periwinkle" />
                </div>
                <h3 className="font-display font-semibold text-xl text-primary-light mb-2">
                  Quote request submitted!
                </h3>
                <p className="text-sm text-secondary-light">
                  We'll be in touch within 48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-secondary-light mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-primary-light placeholder:text-secondary-light/50 focus:outline-none focus:border-accent-periwinkle/50 transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-secondary-light mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-primary-light placeholder:text-secondary-light/50 focus:outline-none focus:border-accent-periwinkle/50 transition-colors"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-secondary-light mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-primary-light placeholder:text-secondary-light/50 focus:outline-none focus:border-accent-periwinkle/50 transition-colors"
                      placeholder="Your company"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-secondary-light mb-2">
                      Product Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-primary-light focus:outline-none focus:border-accent-periwinkle/50 transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-[#0B0F17]">
                        Select category
                      </option>
                      {productCategories.map((cat) => (
                        <option key={cat} value={cat} className="bg-[#0B0F17]">
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-secondary-light mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-primary-light placeholder:text-secondary-light/50 focus:outline-none focus:border-accent-periwinkle/50 transition-colors resize-none"
                    placeholder="Describe what you're looking for..."
                  />
                </div>

                <button type="submit" className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" />
                  Get a quote
                </button>

                {/* Trust line */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <div className="flex items-center gap-2 text-xs text-secondary-light">
                    <Sparkles className="w-3 h-3" />
                    Free
                  </div>
                  <div className="flex items-center gap-2 text-xs text-secondary-light">
                    <Shield className="w-3 h-3" />
                    No commitment
                  </div>
                  <div className="flex items-center gap-2 text-xs text-secondary-light">
                    <Clock className="w-3 h-3" />
                    Response within 48h
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Right Image */}
          <div
            ref={imageRef}
            className="lg:absolute lg:right-[6vw] lg:top-20 lg:w-[38vw] lg:h-[56vh] rounded-2xl overflow-hidden"
          >
            <img
              src="/quote_meeting.jpg"
              alt="Business meeting"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
