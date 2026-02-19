import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Calendar, Car, MapPin, Mic, X, Check, Phone, Mail } from 'lucide-react';

// Services data remains hardcoded (your company services)
const services = [
  {
    id: 1,
    title: 'Events Consultancy',
    description: 'Strategic event planning and expert guidance to make your vision a reality.',
    image: '/norrsken.png',
    icon: Calendar,
    details: {
      fullDescription: 'Our Events Consultancy service provides comprehensive strategic planning and expert guidance to transform your vision into a spectacular reality.',
      features: [
        'Strategic Event Planning & Concept Development',
        'Budget Management & Cost Optimization',
        'Venue Selection & Vendor Coordination',
        'Timeline Creation & Project Management',
      ],
      benefits: [
        'Save time and reduce stress with professional guidance',
        'Access to our extensive network of trusted vendors',
        'Expert negotiation for better rates and services',
      ],
    },
  },
  {
    id: 2,
    title: 'Event Production',
    description: 'Full-service production and execution for seamless events of any scale.',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80',
    icon: Mic,
    details: {
      fullDescription: 'From concept to completion, our Event Production service handles every aspect of your event execution.',
      features: [
        'Audio-Visual Equipment & Technical Support',
        'Stage Design & Setup',
        'Lighting & Sound Engineering',
        'On-site Event Coordination',
      ],
      benefits: [
        'Professional execution ensuring flawless events',
        'State-of-the-art equipment and technology',
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
    isDynamic: true, // This will fetch from database
  },
  {
    id: 4,
    title: 'Destination Management',
    description: 'Complete destination experiences showcasing the best of Rwanda.',
    image: '/tourism.png',
    icon: MapPin,
    isDynamic: true, // This will fetch from database
  },
];

const CONTACT_INFO = {
  phone: '0782169162',
  whatsapp: '250782169162',
  email: 'cardinaloichirwa@gmail.com',
  address: '1 KN 78 St, Kigali',
};

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [cars, setCars] = useState<any[]>([]);
  const [tours, setTours] = useState<any[]>([]);
  const [selectedCar, setSelectedCar] = useState<any | null>(null);
  const [selectedTour, setSelectedTour] = useState<any | null>(null);

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

  useEffect(() => {
    fetchCars();
    fetchTours();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/cars');
      const data = await response.json();
      setCars(data.filter((c: any) => c.status === 'available'));
    } catch (error) {
      console.error('Failed to fetch cars:', error);
    }
  };

  const fetchTours = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tourism');
      const data = await response.json();
      setTours(data.filter((t: any) => t.status === 'active'));
    } catch (error) {
      console.error('Failed to fetch tours:', error);
    }
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setSelectedService(null);
  };

  const openWhatsApp = (serviceName: string) => {
    const message = encodeURIComponent(`Hello THE HURBERT! I'm interested in your ${serviceName} service.`);
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${message}`, '_blank');
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 bg-gray-50 overflow-hidden"
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
                      onClick={() => {
                        if (service.isDynamic && service.title === 'Car Rental') {
                          // Show cars list
                          setSelectedService({ title: 'Car Rental', items: cars, type: 'car' });
                        } else if (service.isDynamic && service.title === 'Destination Management') {
                          // Show tours list
                          setSelectedService({ title: 'Tours', items: tours, type: 'tour' });
                        } else {
                          setSelectedService(service);
                        }
                      }}
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
      </div>

      {/* Service Detail Modal */}
      {selectedService && !selectedService.items && (
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
                    {selectedService.details.features.map((feature: string, index: number) => (
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
                    {selectedService.details.benefits.map((benefit: string, index: number) => (
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
                    onClick={() => openWhatsApp(selectedService.title)}
                    className="flex-1 bg-green-500 text-white px-6 py-4 rounded-lg font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 hover:bg-green-600"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    <Phone className="w-5 h-5" />
                    Chat on WhatsApp
                  </button>
                  <button
                    onClick={() => window.open(`mailto:${CONTACT_INFO.email}`, '_blank')}
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

      {/* Cars/Tours List Modal */}
      {selectedService?.items && (
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

            <div className="overflow-y-auto max-h-[90vh]">
              <div className="p-6 md:p-10">
                <h2 className="text-3xl font-bold text-black mb-6">{selectedService.title}</h2>
                
                {selectedService.items.length === 0 ? (
                  <p className="text-gray-500">No items available at the moment.</p>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    {selectedService.items.map((item: any) => (
                      <div
                        key={item.id}
                        className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => {
                          if (selectedService.type === 'car') {
                            setSelectedCar(item);
                          } else {
                            setSelectedTour(item);
                          }
                          setSelectedService(null);
                        }}
                      >
                        <img
                          src={item.image || 'https://via.placeholder.com/400x300'}
                          alt={item.title}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                        {selectedService.type === 'car' && (
                          <>
                            <p className="text-[#c9a86c] font-semibold mb-2">{item.price}</p>
                            <p className="text-sm text-gray-600">{item.features}</p>
                          </>
                        )}
                        {selectedService.type === 'tour' && (
                          <>
                            <p className="text-gray-600 mb-2">{item.location}</p>
                            <p className="text-sm text-gray-500">Duration: {item.duration}</p>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Car Detail Modal */}
      {selectedCar && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in p-4"
          onClick={() => setSelectedCar(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCar(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-[#c9a86c] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 bg-gray-100">
                <img
                  src={selectedCar.image || 'https://via.placeholder.com/800x600'}
                  alt={selectedCar.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>

              <div className="md:w-1/2 p-8">
                <h2 className="text-3xl font-bold text-black mb-2">{selectedCar.title}</h2>
                <p className="text-[#c9a86c] font-semibold text-xl mb-4">{selectedCar.price}</p>
                <p className="text-gray-600 mb-6">{selectedCar.description}</p>
                <p className="text-gray-700 mb-4">{selectedCar.features}</p>
                <button
                  onClick={() => {
                    setSelectedCar(null);
                    document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full bg-[#c9a86c] text-white px-6 py-4 rounded-lg font-semibold hover:bg-black transition-colors"
                >
                  Book This Car
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tour Detail Modal */}
      {selectedTour && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in p-4"
          onClick={() => setSelectedTour(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedTour(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-[#c9a86c] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 bg-gray-100">
                <img
                  src={selectedTour.image || 'https://via.placeholder.com/800x600'}
                  alt={selectedTour.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>

              <div className="md:w-1/2 p-8">
                <h2 className="text-3xl font-bold text-black mb-2">{selectedTour.title}</h2>
                <p className="text-gray-600 mb-4">{selectedTour.location}</p>
                <p className="text-gray-700 mb-4">{selectedTour.description}</p>
                <p className="text-sm text-gray-500 mb-2">Duration: {selectedTour.duration}</p>
                <p className="text-sm text-gray-500 mb-4">Best time: {selectedTour.bestTime}</p>
                <button
                  onClick={() => {
                    setSelectedTour(null);
                    document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full bg-[#c9a86c] text-white px-6 py-4 rounded-lg font-semibold hover:bg-black transition-colors"
                >
                  Book This Tour
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}