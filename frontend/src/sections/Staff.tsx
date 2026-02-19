import { useEffect, useRef, useState } from 'react';
import { X, Linkedin, Mail, ChevronRight } from 'lucide-react';

// ============================================
// YOUR EXISTING HARDCODED STAFF DATA WITH IMAGES
// ============================================
const hardcodedStaff = [
  {
    id: 1,
    name: 'Harindintwali Jean Paul',
    role: 'Chief Executive Officer',
    image: '/staff/ceo.jpeg',      
    bio: 'Visionary leader with over 10 years of experience in event management and hospitality.',
    linkedin: '#',
    email: 'ceo@thehurbert.com',
  },
  {
    id: 2,
    name: 'Iyumva Danny',
    role: 'Chief Marketing Officer',
    image: '/staff/cmo.jpeg',      
    bio: 'Marketing expert specializing in luxury brand experiences and customer engagement.',
    linkedin: '#',
    email: 'cmo@thehurbert.com',
  },
  {
    id: 3,
    name: 'Mbabazi Channy',
    role: 'Site Manager',
    image: '/staff/sm.jpeg',  
    bio: 'Ensures flawless execution of all events with meticulous attention to detail.',
    linkedin: '#',
    email: 'manager@thehurbert.com',
  },
];

export default function Staff() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<any | null>(null);
  
  // ============================================
  // State for database items
  // ============================================
  const [dbStaff, setDbStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Combine hardcoded + database staff
  const [staff, setStaff] = useState<any[]>(hardcodedStaff);

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
  // Fetch staff from database
  // ============================================
  useEffect(() => {
    const fetchDbStaff = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/staff');
        const data = await response.json();
        setDbStaff(data.filter((s: any) => s.status === 'active'));
        setStaff([...hardcodedStaff, ...data.filter((s: any) => s.status === 'active')]);
      } catch (error) {
        console.error('Error fetching staff from database:', error);
        // If fetch fails, keep only hardcoded
        setStaff(hardcodedStaff);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDbStaff();
  }, []);

  if (loading) {
    return (
      <section className="relative w-full py-24 lg:py-32 bg-gray-50">
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-[#c9a86c] border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  return (
    <section
      id="staff"
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 bg-gray-50 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #c9a86c 1px, transparent 0)`,
            backgroundSize: '50px 50px',
          }}
        />
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
            Meet
          </span>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-black"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Our Team
          </h2>
          <div className="flex justify-center mt-4">
            <div className="w-20 h-1 bg-[#c9a86c] rounded-full" />
          </div>
        </div>

        {/* Staff Grid */}
        {staff.length === 0 ? (
          <p className="text-center text-gray-500">No team members to display</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {staff.map((member, index) => (
              <div
                key={member.id}
                className={`group relative cursor-pointer transition-all duration-700 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${200 + index * 150}ms` }}
                onClick={() => setSelectedStaff(member)}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                  {/* Image */}
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        // If image fails to load, show a placeholder
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x400?text=Team';
                      }}
                    />
                    
                    {/* Gold Overlay on Hover */}
                    <div className="absolute inset-0 bg-[#c9a86c]/0 group-hover:bg-[#c9a86c]/10 transition-all duration-500" />
                  </div>

                  {/* Info Overlay - Shows on hover */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <h3
                      className="text-xl font-bold text-white mb-1"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      {member.name}
                    </h3>
                    <p className="text-[#c9a86c] font-medium text-sm mb-3">
                      {member.role}
                    </p>
                    <div className="flex items-center gap-2 text-white/80 text-sm">
                      <span>Click to view profile</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Gold Accent Border */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#c9a86c] transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
                </div>

                {/* Name below image (visible always) */}
                <div className="text-center mt-4">
                  <h3
                    className="text-lg font-semibold text-black"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {member.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Staff Detail Modal */}
      {selectedStaff && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in p-4"
          onClick={() => setSelectedStaff(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedStaff(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-[#c9a86c] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col md:flex-row">
              {/* Left - Image */}
              <div className="md:w-2/5 bg-gray-100">
                <img
                  src={selectedStaff.image}
                  alt={selectedStaff.name}
                  className="w-full h-64 md:h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x400';
                  }}
                />
              </div>

              {/* Right - Details */}
              <div className="md:w-3/5 p-8">
                <div className="mb-6">
                  <h2
                    className="text-3xl font-bold text-black mb-2"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {selectedStaff.name}
                  </h2>
                  <p className="text-[#c9a86c] font-semibold text-lg">
                    {selectedStaff.role}
                  </p>
                </div>

                <p className="text-gray-600 leading-relaxed mb-8">
                  {selectedStaff.bio || 'No biography available.'}
                </p>

                <div className="space-y-4">
                  <a
                    href={`mailto:${selectedStaff.email}`}
                    className="flex items-center gap-3 text-gray-600 hover:text-[#c9a86c] transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span>{selectedStaff.email}</span>
                  </a>
                  
                  {selectedStaff.linkedin && (
                    <a
                      href={selectedStaff.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-600 hover:text-[#c9a86c] transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                      <span>LinkedIn Profile</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}