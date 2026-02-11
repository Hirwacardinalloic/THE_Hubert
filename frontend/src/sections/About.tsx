import { useEffect, useRef, useState } from 'react';
import { Play, ArrowRight } from 'lucide-react';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 bg-white overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #c9a86c 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-12'
            }`}
          >
            {/* Section Label */}
            <div className="mb-6">
              <span
                className="block text-[#c9a86c] text-sm font-semibold uppercase tracking-[0.3em] mb-2"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                WHO
              </span>
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-black"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                WE ARE
              </h2>
            </div>

            {/* Description */}
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p
                className={`transition-all duration-700 delay-200 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-6'
                }`}
              >
                THE HURBERT is a value-driven business company specializing in
                the production and management of world-class events. With years
                of experience in the industry, we have established ourselves as
                the premier event management company in Rwanda.
              </p>
              <p
                className={`transition-all duration-700 delay-300 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-6'
                }`}
              >
                Our comprehensive services include event consultancy, production,
                car rental, and destination management. We pride ourselves on
                delivering exceptional experiences that exceed our clients'
                expectations.
              </p>
              <p
                className={`transition-all duration-700 delay-400 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-6'
                }`}
              >
                From corporate conferences to cultural celebrations, we bring
                creativity, professionalism, and attention to detail to every
                project we undertake.
              </p>
            </div>

            {/* CTA Button */}
            <div
              className={`mt-10 transition-all duration-700 delay-500 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              }`}
            >
              <button
                onClick={() => scrollToSection('#services')}
                className="group inline-flex items-center gap-3 bg-[#c9a86c] text-white px-8 py-4 font-semibold text-sm uppercase tracking-wider rounded transition-all duration-300 hover:bg-black hover:text-white"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Learn more
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
              </button>
            </div>
          </div>

          {/* Video/Image Section */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-12'
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              {/* Main Image */}
              <div className="aspect-video relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80"
                  alt="THE HURBERT"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:opacity-40" />

                {/* Play Button */}
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="absolute inset-0 flex items-center justify-center"
                  aria-label="Play video"
                >
                  <div className="relative">
                    {/* Pulse Rings */}
                    <div className="absolute inset-0 rounded-full bg-white/30 animate-ping" />
                    <div
                      className="absolute inset-0 rounded-full bg-white/20 animate-ping"
                      style={{ animationDelay: '0.5s' }}
                    />

                    {/* Play Icon */}
                    <div className="relative w-20 h-20 rounded-full bg-[#c9a86c] flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg">
                      <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                    </div>
                  </div>
                </button>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#c9a86c]/20 rounded-full blur-2xl" />
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#c9a86c]/10 rounded-full blur-xl" />
            </div>

            {/* Stats Cards - Hidden but code preserved */}
            {false && (
              <div className="grid grid-cols-3 gap-4 mt-8">
                {[
                  { number: '500+', label: 'Events' },
                  { number: '50+', label: 'Partners' },
                  { number: '10+', label: 'Years' },
                ].map((stat, index) => (
                  <div
                    key={stat.label}
                    className={`text-center p-4 bg-gray-50 rounded-lg transition-all duration-700 ${
                      isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-6'
                    }`}
                    style={{ transitionDelay: `${600 + index * 100}ms` }}
                  >
                    <div
                      className="text-2xl md:text-3xl font-bold text-[#c9a86c]"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 animate-fade-in"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div className="relative w-full max-w-4xl mx-4">
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-[#c9a86c] transition-colors"
            >
              Close
            </button>
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="THE HURBERT Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
