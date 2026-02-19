import { useEffect, useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';

// ============================================
// YOUR EXISTING HARDCODED PARTNERS DATA WITH IMAGES
// ============================================
const hardcodedPartners = [
  {
    id: 1,
    name: 'Norrsken',
    logo: '/norrsken-logo.png',        // ✅ YOUR EXISTING IMAGE
    website: 'https://norrsken.org',
  },
  {
    id: 2,
    name: 'Kozo',
    logo: '/kozo-logo.png',            // ✅ YOUR EXISTING IMAGE
    website: '#',
  },
  {
    id: 3,
    name: 'Kivu Noire',
    logo: '/KivuNoire-Logo.png',      // ✅ YOUR EXISTING IMAGE
    website: '#',
  },
  {
    id: 4,
    name: 'Zaria Court',
    logo: '/ZariaCourt-logo.png',     // ✅ YOUR EXISTING IMAGE
    website: '#',
  },
];

export default function Partners() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredPartner, setHoveredPartner] = useState<number | null>(null);
  
  // ============================================
  // State for database items
  // ============================================
  const [dbPartners, setDbPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Combine hardcoded + database partners
  const [partners, setPartners] = useState<any[]>(hardcodedPartners);

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

  // ============================================
  // Fetch partners from database
  // ============================================
  useEffect(() => {
    const fetchDbPartners = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/partners');
        const data = await response.json();
        setDbPartners(data.filter((p: any) => p.status === 'active'));
        setPartners([...hardcodedPartners, ...data.filter((p: any) => p.status === 'active')]);
      } catch (error) {
        console.error('Error fetching partners from database:', error);
        // If fetch fails, keep only hardcoded
        setPartners(hardcodedPartners);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDbPartners();
  }, []);

  if (loading) {
    return (
      <section className="relative w-full py-24 lg:py-32 bg-white">
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-[#c9a86c] border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

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
        {partners.length === 0 ? (
          <p className="text-center text-gray-500">No partners to display</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-12">
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
                  href={partner.website || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="relative aspect-square bg-white rounded-2xl shadow-lg overflow-hidden group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 border border-gray-100">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        // If image fails to load, show a placeholder
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x200?text=Logo';
                      }}
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
        )}
      </div>
    </section>
  );
}