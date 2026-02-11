import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Calendar, MapPin, X, Users, Clock, CheckCircle } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Second International Conference on Public Health in Africa',
    category: '2022',
    location: 'Kigali Convention Centre',
    date: 'Dec 13-15, 2022',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    description: 'A landmark conference bringing together health professionals, policymakers, and researchers from across Africa to discuss public health challenges and solutions.',
    client: 'African Union',
    attendees: '2,500+',
    duration: '3 Days',
    services: ['Event Planning', 'Venue Management', 'Technical Production', 'Catering Coordination'],
    highlights: [
      'Successfully hosted 2,500+ delegates from 45 countries',
      'Coordinated 50+ speakers and panel discussions',
      'Managed simultaneous translation in 4 languages',
      'Zero technical issues throughout the event',
    ],
  },
  {
    id: 2,
    title: 'The 17th IGF: Resilient Internet for a Shared Sustainable Future',
    category: '2022',
    location: 'Kigali, Rwanda',
    date: 'Nov 2022',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
    description: 'The Internet Governance Forum brought together stakeholders from government, private sector, and civil society to discuss internet policy and governance.',
    client: 'United Nations',
    attendees: '3,000+',
    duration: '5 Days',
    services: ['Full Event Production', 'Live Streaming', 'Registration Management', 'Security Coordination'],
    highlights: [
      'First hybrid IGF event with both physical and virtual attendance',
      'Live streamed to 10,000+ online participants',
      'Managed 100+ workshop sessions',
      'Coordinated high-level ministerial meetings',
    ],
  },
  {
    id: 3,
    title: 'Rwanda Tourism Week: Boosting Intra-Africa Travel',
    category: '2022',
    location: 'Various Locations',
    date: '2022',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
    description: 'A week-long celebration of Rwandan tourism featuring exhibitions, fam trips, and networking events for tourism professionals.',
    client: 'Rwanda Development Board',
    attendees: '1,500+',
    duration: '7 Days',
    services: ['Tour Coordination', 'Exhibition Management', 'Transportation', 'Accommodation Booking'],
    highlights: [
      'Organized tours to 5 national parks',
      'Hosted 200+ international tour operators',
      'Facilitated 50+ B2B meetings',
      'Generated $2M in tourism partnerships',
    ],
  },
  {
    id: 4,
    title: 'Basketball Africa League 2021',
    category: '2021',
    location: 'Kigali Arena',
    date: 'May 2021',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80',
    description: 'The inaugural season of the Basketball Africa League, featuring top teams from across the continent competing for the championship.',
    client: 'NBA Africa',
    attendees: '5,000+',
    duration: '2 Weeks',
    services: ['Venue Setup', 'Broadcast Support', 'VIP Hospitality', 'Security Management'],
    highlights: [
      'First-ever BAL championship event',
      'Broadcast to 215 countries',
      'Hosted NBA legends and celebrities',
      '100% venue capacity utilization',
    ],
  },
  {
    id: 5,
    title: 'AU-EU Foreign Affairs Ministerial Meeting',
    category: '2021',
    location: 'Kigali Convention Centre',
    date: 'Oct 2021',
    image: 'https://images.unsplash.com/photo-1558008258-3256797b43f3?w=800&q=80',
    description: 'High-level diplomatic meeting between African Union and European Union foreign affairs ministers discussing bilateral relations.',
    client: 'Ministry of Foreign Affairs',
    attendees: '100+ Ministers',
    duration: '2 Days',
    services: ['Protocol Management', 'Translation Services', 'Security', 'Catering'],
    highlights: [
      'Managed protocol for 50+ ministers',
      'Provided simultaneous translation',
      'Ensured zero security incidents',
      'Received commendation from both AU and EU',
    ],
  },
  {
    id: 6,
    title: 'Kigali International Peace Marathon',
    category: '2023',
    location: 'Kigali, Rwanda',
    date: 'May 2023',
    image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800&q=80',
    description: 'Annual marathon event promoting peace and unity through sports, attracting runners from around the world.',
    client: 'Kigali City',
    attendees: '10,000+ Runners',
    duration: '1 Day',
    services: ['Route Planning', 'Participant Management', 'Medical Support', 'Entertainment'],
    highlights: [
      'Largest marathon in East Africa',
      'Participants from 40+ countries',
      'Raised $500K for peace initiatives',
      'Zero medical emergencies',
    ],
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);

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
      id="portfolio"
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 bg-white overflow-hidden"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div
          className={`flex flex-col md:flex-row md:items-end md:justify-between mb-16 transition-all duration-1000 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <div>
            <span
              className="text-[#c9a86c] text-sm font-semibold uppercase tracking-[0.3em] mb-4 block"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Recent
            </span>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-black"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Projects
            </h2>
            <div className="w-20 h-1 bg-[#c9a86c] rounded-full mt-4" />
          </div>

          <button
            onClick={() => setShowAllProjects(true)}
            className={`mt-6 md:mt-0 inline-flex items-center gap-2 text-black font-semibold text-sm uppercase tracking-wider transition-all duration-300 hover:text-[#c9a86c] group ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-8'
            }`}
            style={{ fontFamily: 'Montserrat, sans-serif', transitionDelay: '200ms' }}
          >
            Show All Works
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.slice(0, 6).map((project, index) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className={`group relative rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: `${300 + index * 100}ms`,
                transform:
                  hoveredProject === project.id
                    ? 'translateY(-8px)'
                    : 'translateY(0)',
              }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Image */}
              <div className="aspect-[4/5] relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className="px-4 py-2 bg-[#c9a86c] text-white text-xs font-semibold uppercase tracking-wider rounded"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {project.category}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-6">
                  {/* Location & Date */}
                  <div className="flex items-center gap-4 text-white/70 text-sm mb-3 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {project.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {project.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-xl font-bold text-white mb-4 line-clamp-2 transition-all duration-300 group-hover:translate-x-2"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {project.title}
                  </h3>

                  {/* Show Project Button */}
                  <button
                    className="inline-flex items-center gap-2 text-[#c9a86c] font-semibold text-sm uppercase tracking-wider opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    Show project
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
                  </button>
                </div>

                {/* Border Highlight */}
                <div className="absolute inset-0 border-2 border-[#c9a86c] rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div
          className={`text-center mt-16 transition-all duration-1000 delay-700 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <button
            onClick={() => setShowAllProjects(true)}
            className="inline-flex items-center gap-3 border-2 border-black text-black px-8 py-4 font-semibold text-sm uppercase tracking-wider rounded transition-all duration-300 hover:bg-black hover:text-white"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            View All Projects
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-[#c9a86c] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content - Scrollable */}
            <div className="overflow-y-auto max-h-[90vh]">
              {/* Header Image */}
              <div className="relative h-64 md:h-80">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span
                    className="px-3 py-1 bg-[#c9a86c] text-white text-xs font-semibold uppercase tracking-wider rounded mb-3 inline-block"
                  >
                    {selectedProject.category}
                  </span>
                  <h2
                    className="text-2xl md:text-3xl font-bold text-white"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {selectedProject.title}
                  </h2>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-10">
                {/* Quick Info */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Users className="w-6 h-6 text-[#c9a86c] mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Attendees</p>
                    <p className="font-semibold text-black">{selectedProject.attendees}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Clock className="w-6 h-6 text-[#c9a86c] mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-semibold text-black">{selectedProject.duration}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <MapPin className="w-6 h-6 text-[#c9a86c] mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-semibold text-black">{selectedProject.location}</p>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3
                    className="text-xl font-bold text-black mb-3"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    About This Project
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Services Provided */}
                <div className="mb-8">
                  <h3
                    className="text-xl font-bold text-black mb-3"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    Services Provided
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.services.map((service, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-[#c9a86c]/10 text-[#c9a86c] text-sm font-medium rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-8">
                  <h3
                    className="text-xl font-bold text-black mb-3"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    Key Highlights
                  </h3>
                  <div className="space-y-2">
                    {selectedProject.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#c9a86c] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Client */}
                <div className="p-4 bg-gray-50 rounded-lg mb-6">
                  <p className="text-sm text-gray-500">Client</p>
                  <p className="font-semibold text-black">{selectedProject.client}</p>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full bg-[#c9a86c] text-white px-6 py-4 rounded-lg font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 hover:bg-black"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Start Your Project
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* All Projects Modal */}
      {showAllProjects && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in p-4"
          onClick={() => setShowAllProjects(false)}
        >
          <div
            className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-2xl overflow-hidden animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowAllProjects(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-[#c9a86c] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content - Scrollable */}
            <div className="overflow-y-auto max-h-[90vh]">
              {/* Header */}
              <div className="p-6 md:p-10 border-b">
                <h2
                  className="text-3xl md:text-4xl font-bold text-black"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  All Projects
                </h2>
                <p className="text-gray-600 mt-2">
                  Explore our portfolio of successful events and projects
                </p>
              </div>

              {/* All Projects Grid */}
              <div className="p-6 md:p-10">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      onClick={() => {
                        setShowAllProjects(false);
                        setSelectedProject(project);
                      }}
                      className="group relative rounded-xl overflow-hidden shadow-lg cursor-pointer"
                    >
                      <div className="aspect-[4/3] relative overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                        
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 bg-[#c9a86c] text-white text-xs font-semibold uppercase tracking-wider rounded">
                            {project.category}
                          </span>
                        </div>

                        <div className="absolute inset-x-0 bottom-0 p-4">
                          <h3
                            className="text-lg font-bold text-white line-clamp-2"
                            style={{ fontFamily: 'Montserrat, sans-serif' }}
                          >
                            {project.title}
                          </h3>
                          <p className="text-white/70 text-sm mt-1">{project.location}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
