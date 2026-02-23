import { useEffect, useRef, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ArrowRight, Calendar, MapPin, X, Users, Clock, Car, Star, Briefcase, Mountain } from 'lucide-react';

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [selectedCar, setSelectedCar] = useState<any | null>(null);
  const [selectedTourism, setSelectedTourism] = useState<any | null>(null);
  const [showAllWorks, setShowAllWorks] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [returnToAllWorks, setReturnToAllWorks] = useState(false);
  
  const queryClient = useQueryClient();

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

  // Fetch events with React Query
  const { data: events = [], refetch: refetchEvents } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const response = await fetch('http://localhost:5000/api/events');
      const data = await response.json();
      const activeEvents = data.filter((e: any) => e.status === 'active');
      return removeDuplicates(activeEvents, 'title');
    },
  });

  // Fetch cars with React Query
  const { data: cars = [], refetch: refetchCars } = useQuery({
    queryKey: ['cars'],
    queryFn: async () => {
      const response = await fetch('http://localhost:5000/api/cars');
      const data = await response.json();
      const activeCars = data.filter((c: any) => c.status === 'available');
      return removeDuplicates(activeCars, 'title');
    },
  });

  // Fetch tourism with React Query
  const { data: tourism = [], refetch: refetchTourism } = useQuery({
    queryKey: ['tourism'],
    queryFn: async () => {
      const response = await fetch('http://localhost:5000/api/tourism');
      const data = await response.json();
      const activeTourism = data.filter((t: any) => t.status === 'active');
      return removeDuplicates(activeTourism, 'title');
    },
  });

  // Listen for storage events (when admin makes changes)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'admin-update') {
        // Refetch all data when admin makes changes
        refetchEvents();
        refetchCars();
        refetchTourism();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [refetchEvents, refetchCars, refetchTourism]);

  // Helper function to remove duplicates
  const removeDuplicates = (array: any[], key: string) => {
    const seen = new Set();
    return array.filter(item => {
      const duplicate = seen.has(item[key]);
      seen.add(item[key]);
      return !duplicate;
    });
  };

  // Combine all items
  const allWorks = [
    ...events.map((event: any) => ({ ...event, type: 'event' })),
    ...cars.map((car: any) => ({ ...car, type: 'car' })),
    ...tourism.map((tour: any) => ({ ...tour, type: 'tourism' })),
  ];

  const filteredWorks = activeTab === 'all' 
    ? allWorks 
    : activeTab === 'events' 
    ? allWorks.filter(item => item.type === 'event')
    : activeTab === 'cars'
    ? allWorks.filter(item => item.type === 'car')
    : allWorks.filter(item => item.type === 'tourism');

  // Handle closing modals and returning to all works
  const handleCloseEvent = () => {
    setSelectedEvent(null);
    if (returnToAllWorks) {
      setShowAllWorks(true);
      setReturnToAllWorks(false);
    }
  };

  const handleCloseCar = () => {
    setSelectedCar(null);
    if (returnToAllWorks) {
      setShowAllWorks(true);
      setReturnToAllWorks(false);
    }
  };

  const handleCloseTourism = () => {
    setSelectedTourism(null);
    if (returnToAllWorks) {
      setShowAllWorks(true);
      setReturnToAllWorks(false);
    }
  };

  // Handle opening from All Works
  const handleOpenFromAllWorks = (item: any) => {
    setShowAllWorks(false);
    setReturnToAllWorks(true);
    if (item.type === 'event') {
      setSelectedEvent(item);
    } else if (item.type === 'car') {
      setSelectedCar(item);
    } else if (item.type === 'tourism') {
      setSelectedTourism(item);
    }
  };

  // Helper for images
  const getImageUrl = (image: string) => {
    if (!image) return '/placeholder.jpg';
    if (image.startsWith('http')) return image;
    const cleanPath = image.replace('./', '/');
    return cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
  };

  // Parse JSON fields
  const parseJsonField = (field: any) => {
    if (!field) return [];
    if (Array.isArray(field)) return field;
    try {
      return JSON.parse(field);
    } catch {
      return [];
    }
  };

  // Show loading if data is still being fetched
  if (events.length === 0 && cars.length === 0 && tourism.length === 0) {
    return (
      <section className="w-full py-24 bg-white">
        <div className="flex justify-center">
          <div className="w-8 h-8 border-4 border-[#c9a86c] border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 bg-white"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <span className="text-[#c9a86c] text-sm font-semibold uppercase tracking-[0.3em] mb-4 block">
              Our
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black">
              Portfolio
            </h2>
            <div className="w-20 h-1 bg-[#c9a86c] rounded-full mt-4" />
          </div>

          <button
            onClick={() => setShowAllWorks(true)}
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-black font-semibold text-sm uppercase tracking-wider hover:text-[#c9a86c]"
          >
            View All Works
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Featured Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {allWorks.slice(0, 6).map((item, index) => (
            <div
              key={`${item.type}-${item.id}-${index}`}
              onClick={() => {
                if (item.type === 'event') setSelectedEvent(item);
                else if (item.type === 'car') setSelectedCar(item);
                else setSelectedTourism(item);
              }}
              className="group relative rounded-xl overflow-hidden shadow-lg cursor-pointer"
            >
              <div className="aspect-[4/5] relative overflow-hidden bg-gray-100">
                <img
                  src={getImageUrl(item.image)}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.jpg';
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                <div className="absolute top-4 left-4">
                  <span className="px-4 py-2 bg-[#c9a86c] text-white text-xs font-semibold uppercase tracking-wider rounded">
                    {item.category || 'Portfolio'}
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="flex items-center gap-4 text-white/70 text-sm mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {item.location || 'Rwanda'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {item.date || item.bestTime || 'TBA'}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-4 line-clamp-2">
                    {item.title}
                  </h3>

                  <button className="inline-flex items-center gap-2 text-[#c9a86c] font-semibold text-sm uppercase tracking-wider">
                    Show project
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-16">
          <button
            onClick={() => setShowAllWorks(true)}
            className="inline-flex items-center gap-3 border-2 border-black text-black px-8 py-4 font-semibold text-sm uppercase tracking-wider rounded hover:bg-black hover:text-white transition-colors"
          >
            View All Works
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* All Works Modal */}
      {showAllWorks && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setShowAllWorks(false)}
        >
          <div
            className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowAllWorks(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-[#c9a86c]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="overflow-y-auto max-h-[90vh]">
              <div className="p-6 md:p-10 border-b">
                <h2 className="text-3xl md:text-4xl font-bold text-black">
                  All Works
                </h2>

                <div className="flex flex-wrap gap-4 mt-6">
                  {['all', 'events', 'cars', 'tourism'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-2 rounded-lg font-semibold capitalize transition-all ${
                        activeTab === tab
                          ? 'bg-[#c9a86c] text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6 md:p-10">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredWorks.map((item, index) => (
                    <div
                      key={`${item.type}-${item.id}-${index}`}
                      onClick={() => handleOpenFromAllWorks(item)}
                      className="group relative rounded-xl overflow-hidden shadow-lg cursor-pointer"
                    >
                      <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
                        <img
                          src={getImageUrl(item.image)}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder.jpg';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                        
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 bg-[#c9a86c] text-white text-xs font-semibold uppercase tracking-wider rounded">
                            {item.category || 'Portfolio'}
                          </span>
                        </div>

                        <div className="absolute inset-x-0 bottom-0 p-4">
                          <h3 className="text-lg font-bold text-white line-clamp-2">
                            {item.title}
                          </h3>
                          <p className="text-white/70 text-sm mt-1">
                            {item.type === 'car' ? item.features : item.location}
                          </p>
                        </div>

                        <div className="absolute top-3 right-3">
                          {item.type === 'event' && <Briefcase className="w-5 h-5 text-white" />}
                          {item.type === 'car' && <Car className="w-5 h-5 text-white" />}
                          {item.type === 'tourism' && <Mountain className="w-5 h-5 text-white" />}
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

      {/* Event Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={handleCloseEvent}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseEvent}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-[#c9a86c]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="overflow-y-auto max-h-[90vh]">
              <div className="relative h-64 md:h-80 bg-gray-100">
                <img
                  src={getImageUrl(selectedEvent.image)}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className="px-3 py-1 bg-[#c9a86c] text-white text-xs font-semibold uppercase tracking-wider rounded mb-3 inline-block">
                    {selectedEvent.category}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    {selectedEvent.title}
                  </h2>
                </div>
              </div>

              <div className="p-6 md:p-10">
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Users className="w-6 h-6 text-[#c9a86c] mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Attendees</p>
                    <p className="font-semibold">{selectedEvent.attendees || 'N/A'}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Clock className="w-6 h-6 text-[#c9a86c] mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-semibold">{selectedEvent.duration || 'N/A'}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <MapPin className="w-6 h-6 text-[#c9a86c] mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-semibold">{selectedEvent.location}</p>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed mb-8">
                  {selectedEvent.description}
                </p>

                {selectedEvent.servicesProvided && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-3">Services Provided</h3>
                    <div className="flex flex-wrap gap-2">
                      {parseJsonField(selectedEvent.servicesProvided).map((service: string, i: number) => (
                        <span key={i} className="px-4 py-2 bg-[#c9a86c]/10 text-[#c9a86c] rounded-full">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedEvent.client && (
                  <div className="p-4 bg-gray-50 rounded-lg mb-6">
                    <p className="text-sm text-gray-500">Client</p>
                    <p className="font-semibold">{selectedEvent.client}</p>
                  </div>
                )}

                <button
                  onClick={handleCloseEvent}
                  className="w-full bg-[#c9a86c] text-white px-6 py-4 rounded-lg font-semibold uppercase tracking-wider hover:bg-black transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Car Modal */}
      {selectedCar && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={handleCloseCar}
        >
          <div
            className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseCar}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white hover:bg-[#c9a86c]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 bg-gray-100">
                <img
                  src={getImageUrl(selectedCar.image)}
                  alt={selectedCar.title}
                  className="w-full h-64 md:h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.jpg';
                  }}
                />
              </div>

              <div className="md:w-1/2 p-8">
                <span className="px-3 py-1 bg-[#c9a86c] text-white text-xs font-semibold uppercase tracking-wider rounded inline-block mb-3">
                  {selectedCar.category}
                </span>
                <h2 className="text-3xl font-bold mb-2">{selectedCar.title}</h2>
                <p className="text-[#c9a86c] font-semibold text-xl mb-4">{selectedCar.price}</p>
                <p className="text-gray-600 mb-6">{selectedCar.description}</p>
                <p className="text-gray-600 mb-2">Features: {selectedCar.features}</p>
                <p className="text-gray-600 mb-2">Transmission: {selectedCar.transmission}</p>
                <p className="text-gray-600 mb-6">Fuel: {selectedCar.fuel}</p>

                <button
                  onClick={handleCloseCar}
                  className="w-full bg-[#c9a86c] text-white px-6 py-4 rounded-lg font-semibold uppercase tracking-wider hover:bg-black transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tourism Modal */}
      {selectedTourism && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={handleCloseTourism}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseTourism}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white hover:bg-[#c9a86c]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="overflow-y-auto max-h-[90vh]">
              <div className="relative h-64 md:h-80 bg-gray-100">
                <img
                  src={getImageUrl(selectedTourism.image)}
                  alt={selectedTourism.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className="px-3 py-1 bg-[#c9a86c] text-white text-xs font-semibold uppercase tracking-wider rounded mb-3 inline-block">
                    {selectedTourism.category}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    {selectedTourism.title}
                  </h2>
                </div>
              </div>

              <div className="p-6 md:p-10">
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <MapPin className="w-6 h-6 text-[#c9a86c] mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-semibold">{selectedTourism.location}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Clock className="w-6 h-6 text-[#c9a86c] mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-semibold">{selectedTourism.duration}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Calendar className="w-6 h-6 text-[#c9a86c] mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Best Time</p>
                    <p className="font-semibold">{selectedTourism.bestTime}</p>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed mb-8">
                  {selectedTourism.description}
                </p>

                {selectedTourism.activities && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-3">Activities</h3>
                    <div className="flex flex-wrap gap-2">
                      {parseJsonField(selectedTourism.activities).map((activity: string, i: number) => (
                        <span key={i} className="px-4 py-2 bg-[#c9a86c]/10 text-[#c9a86c] rounded-full">
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={handleCloseTourism}
                  className="w-full bg-[#c9a86c] text-white px-6 py-4 rounded-lg font-semibold uppercase tracking-wider hover:bg-black transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}