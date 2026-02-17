import { useEffect, useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';

const partners = [
  {
    id: 1,
    name: 'Norrsken',
    logo: '/norrsken-logo.png',
    website: 'https://www.norrsken.org/',
  },
  {
    id: 2,
    name: 'Kozo',
    logo: '/kozo-logo.png',
    website: 'https://www.kozogh.com/',
  },
  {
    id: 3,
    name: 'Kivu Noire',
    logo: '/KivuNoire-Logo.png',
    website: 'https://rw.kivunoir.coffee/',
  },
  {
    id: 4,
    name: 'Zaria Court',
    logo: '/ZariaCourt-logo.png',
    website: 'https://www.zariacourt.com/',
  },
];

export default function Partners() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredPartner, setHoveredPartner] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="partners"
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 bg-white overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c9a86c] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#c9a86c] rounded-full blur-3xl" />
      </div>

      <div className="relative w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <span
            className="text-[#c9a86c] text-sm font-semibold uppercase tracking-[0.3em] mb-4 block"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Our
          </span>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-black"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Partners
          </h2>
          <div className="flex justify-center mt-4">
            <div className="w-20 h-1 bg-[#c9a86c] rounded-full" />
          </div>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {partners.map((partner, index) => (
            <div
              key={partner.id}
              className={`group relative transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
              onMouseEnter={() => setHoveredPartner(partner.id)}
              onMouseLeave={() => setHoveredPartner(null)}
            >
              <a
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="relative aspect-square bg-white rounded-2xl shadow-lg overflow-hidden group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 border border-gray-100">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Gold Accent Border */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#c9a86c] transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
                </div>
                
                {/* Partner Name */}
                <h3
                  className="text-center mt-4 text-lg font-semibold text-gray-800 group-hover:text-[#c9a86c] transition-colors duration-300"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  {partner.name}
                </h3>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}