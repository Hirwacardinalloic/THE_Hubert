import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Calendar, Car, MapPin, Mic, X, Check, Phone, Mail } from 'lucide-react';

const services = [
  {
    id: 1,
    title: 'Events Consultancy',
    description: 'Strategic event planning and expert guidance to make your vision a reality.',
    image: '/norrsken.png',
    icon: Calendar,
    link: '#contact',
    details: {
      fullDescription: 'Our Events Consultancy service provides comprehensive strategic planning and expert guidance to transform your vision into a spectacular reality. We work closely with you to understand your objectives, budget, and desired outcomes.',
      features: [
        'Strategic Event Planning & Concept Development',
        'Budget Management & Cost Optimization',
        'Venue Selection & Vendor Coordination',
        'Timeline Creation & Project Management',
        'Risk Assessment & Contingency Planning',
        'Post-Event Analysis & Reporting',
      ],
      benefits: [
        'Save time and reduce stress with professional guidance',
        'Access to our extensive network of trusted vendors',
        'Expert negotiation for better rates and services',
        'Creative solutions tailored to your unique needs',
      ],
    },
  },
  {
    id: 2,
    title: 'Event Production',
    description: 'Full-service production and execution for seamless events of any scale.',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80',
    icon: Mic,
    link: '#contact',
    details: {
      fullDescription: 'From concept to completion, our Event Production service handles every aspect of your event execution. We ensure flawless delivery with meticulous attention to detail and professional on-site management.',
      features: [
        'Audio-Visual Equipment & Technical Support',
        'Stage Design & Setup',
        'Lighting & Sound Engineering',
        'Catering Coordination & Management',
        'On-site Event Coordination',
        'Guest Registration & Management',
      ],
      benefits: [
        'Professional execution ensuring flawless events',
        'State-of-the-art equipment and technology',
        'Experienced team handling all logistics',
        '24/7 support during your event',
      ],
    },
  },
  {
    id: 3,
    title: 'Car Rental',
    description: 'Premium vehicles and professional drivers for your transportation needs.',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80',
    icon: Car,
    link: '#contact',
    details: {
      fullDescription: 'Our Car Rental service offers a fleet of premium vehicles and professional drivers to ensure you travel in comfort and style. From airport transfers to full-day chauffeur services, we have you covered.',
      features: [
        'Luxury Sedans & SUVs',
        'Executive Minibuses & Coaches',
        'Professional Chauffeur Services',
        'Airport Transfers',
        'Corporate Transportation',
        'Wedding & Special Event Vehicles',
      ],
      benefits: [
        'Well-maintained, modern vehicle fleet',
        'Professional, courteous drivers',
        'Punctual and reliable service',
        'Competitive pricing with no hidden fees',
      ],
    },
  },
  {
    id: 4,
    title: 'Destination Management',
    description: 'Complete destination experiences showcasing the best of Rwanda.',
    image: '/tourism.png',
    icon: MapPin,
    link: '#contact',
    details: {
      fullDescription: 'Discover the beauty of Rwanda with our comprehensive Destination Management services. We create unforgettable travel experiences that showcase the best of the Land of a Thousand Hills.',
      features: [
        'Customized Tour Packages',
        'Hotel & Accommodation Booking',
        'Local Guide Services',
        'Cultural Experience Planning',
        'Wildlife Safari Arrangements',
        'Restaurant Reservations',
      ],
      benefits: [
        'Insider knowledge of Rwanda\'s hidden gems',
        'Seamless travel logistics',
        'Authentic cultural experiences',
        'Personalized itineraries for every traveler',
      ],
    },
  },
];

// Contact Information
const CONTACT_INFO = {
  email: 'cardinaloichirwa@gmail.com',
  whatsapp: '250782169162',
};

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

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

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setSelectedService(null);
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent(`Hello THE HURBERT! I'm interested in your ${selectedService?.title} service.`);
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${message}`, '_blank');
  };

  const openEmail = () => {
    if (!selectedService) return;
    
    // Create email subject and body
    const subject = `Inquiry: ${selectedService.title} Service - THE HURBERT`;
    const body = `I'm interested in learning more about your ${selectedService.title} service.

Service Details:
- ${selectedService.description}

Could you please provide more information about pricing and availability?

Thank you.`;

    // Gmail web interface URL (works 100% of the time)
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_INFO.email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open Gmail in a new tab
    window.open(gmailUrl, '_blank');
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 bg-gray-50 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-0 right-0 w-96 h-96 bg-[#c9a86c] rounded-full blur-3xl"
        />
        <div
          className="absolute bottom-0 left-0 w-96 h-96 bg-[#c9a86c] rounded-full blur-3xl"
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
            Our
          </span>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-black"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Services
          </h2>
          <div className="flex justify-center mt-4">
            <div className="w-20 h-1 bg-[#c9a86c] rounded-full" />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className={`group relative rounded-2xl overflow-hidden shadow-lg transition-all duration-700 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                }`}
                style={{
                  transitionDelay: `${200 + index * 150}ms`,
                  transform:
                    hoveredCard === service.id
                      ? 'translateY(-10px) scale(1.02)'
                      : 'translateY(0) scale(1)',
                }}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Background Image */}
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-full bg-[#c9a86c] flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Title */}
                    <h3
                      className="text-2xl md:text-3xl font-bold text-white mb-3 transition-all duration-300 group-hover:translate-x-2"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      {service.title}
                    </h3>

                    {/* Description - Shows on hover */}
                    <p className="text-white/80 text-sm md:text-base mb-4 max-w-md transform transition-all duration-500 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
                      {service.description}
                    </p>

                    {/* CTA Link */}
                    <button
                      onClick={() => setSelectedService(service)}
                      className="inline-flex items-center gap-2 text-[#c9a86c] font-semibold text-sm uppercase tracking-wider transition-all duration-300 hover:gap-4"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      Learn more
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
                    </button>
                  </div>

                  {/* Gold Accent Border */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#c9a86c] transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div
          className={`text-center mt-16 transition-all duration-1000 delay-700 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-gray-600 mb-6 text-lg">
            Need a customized solution for your event?
          </p>
          <button
            onClick={() => scrollToSection('#contact')}
            className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 font-semibold text-sm uppercase tracking-wider rounded transition-all duration-300 hover:bg-[#c9a86c] hover:text-white"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Get in touch
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in p-4"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-[#c9a86c] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content - Scrollable */}
            <div className="overflow-y-auto max-h-[90vh]">
              {/* Header Image */}
              <div className="relative h-64 md:h-80">
                <img
                  src={selectedService.image}
                  alt={selectedService.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="w-14 h-14 rounded-full bg-[#c9a86c] flex items-center justify-center mb-4">
                    <selectedService.icon className="w-7 h-7 text-white" />
                  </div>
                  <h2
                    className="text-3xl md:text-4xl font-bold text-white"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {selectedService.title}
                  </h2>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-10">
                {/* Description */}
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  {selectedService.details.fullDescription}
                </p>

                {/* Features */}
                <div className="mb-8">
                  <h3
                    className="text-xl font-bold text-black mb-4"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    What We Offer
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {selectedService.details.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#c9a86c]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-[#c9a86c]" />
                        </div>
                        <span className="text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div className="mb-8">
                  <h3
                    className="text-xl font-bold text-black mb-4"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    Benefits
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {selectedService.details.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#c9a86c]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-[#c9a86c]" />
                        </div>
                        <span className="text-gray-600">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => scrollToSection('#booking')}
                    className="flex-1 bg-[#c9a86c] text-white px-6 py-4 rounded-lg font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 hover:bg-black"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    <Calendar className="w-5 h-5" />
                    Book This Service
                  </button>
                  <button
                    onClick={openWhatsApp}
                    className="flex-1 bg-green-500 text-white px-6 py-4 rounded-lg font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 hover:bg-green-600"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    <Phone className="w-5 h-5" />
                    Chat on WhatsApp
                  </button>
                  <button
                    onClick={openEmail}
                    className="flex-1 bg-blue-500 text-white px-6 py-4 rounded-lg font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 hover:bg-blue-600"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    <Mail className="w-5 h-5" />
                    Send Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}