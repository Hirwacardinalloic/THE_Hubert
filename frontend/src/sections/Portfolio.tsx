import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Calendar, MapPin, X, Users, Clock, CheckCircle, Car, Star, Briefcase, Mountain, TreePine, Landmark, Waves } from 'lucide-react';

// Events/Projects - YOUR EXISTING HARDCODED DATA (KEPT AS IS)
const events = [
  {
    id: 1,
    title: 'Founders Friday at Norrsken',
    category: '2025',
    location: 'Norrsken House Kigali',
    date: 'Last Friday of every month',
    image: '/norrsken.png',
    description: 'A monthly gathering bringing together founders, investors, and ecosystem players to connect, share experiences, and build the future of African tech.',
    client: 'Norrsken Foundation',
    website: 'https://www.foundersfriday.co/',
    attendees: '200-300+',
    duration: 'Monthly Event',
    servicesProvided: [
      'Sound System Setup',
      'Lighting Installation',
      'LED Screens',
      'Cocktail Tables',
      'Round Tables',
      'Event Planning',
    ],
  },
  {
    id: 2,
    title: 'Jasiri Annual Gathering',
    category: '2025',
    location: 'Kigali, Rwanda',
    date: 'July 2025',
    image: 'https://images.unsplash.com/photo-1540575467065-25a122532d94?w=800&q=80',
    description: 'We proudly supported Jasiri in their annual event, bringing together visionaries and change-makers from across Africa.',
    client: 'Jasiri',
    website: 'https://jasiri.org/',
    attendees: '300+',
    duration: '2 Days',
    servicesProvided: [
      'Full Event Production',
      'Stage Setup',
      'Lighting Design',
      'Sound Engineering',
      'LED Screens',
      'Decorations',
      'Manpower',
    ],
  },
  {
    id: 3,
    title: 'Mastercard Foundation Scholars Program',
    category: '2025',
    location: 'Kigali Convention Centre',
    date: 'June 2025',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    description: 'A two-day gathering of scholars, partners, and leaders celebrating achievements in education across Africa.',
    client: 'Mastercard Foundation',
    website: 'https://mastercardfdn.org/',
    attendees: '500+',
    duration: '2 Days',
    servicesProvided: [
      'Sound System',
      'Lighting',
      'LED Screens',
      'Cocktail Tables',
      'Round Tables',
      'Event Planning',
      'Smoke Machine',
    ],
  },
  {
    id: 4,
    title: 'Zaria Court End of Year Celebration',
    category: '2025',
    location: 'Zaria Court, Kigali',
    date: 'December 20, 2025',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80',
    description: 'A luxurious end-of-year celebration at Zaria Court with elegant decor and entertainment.',
    client: 'Zaria Court',
    website: 'https://zariacourt.org/',
    attendees: '150+',
    duration: '1 Evening',
    servicesProvided: [
      'Decorations',
      'Lighting',
      'Sound System',
      'Cocktail Tables',
      'Round Tables',
      'Event Planning',
      'Manpower',
    ],
  },
  {
    id: 5,
    title: 'Second International Conference on Public Health in Africa',
    category: '2022',
    location: 'Kigali Convention Centre',
    date: 'Dec 13-15, 2022',
    image: './norrsken.png',
    description: 'A landmark conference bringing together health professionals from across Africa.',
    client: 'African Union',
    attendees: '2,500+',
    duration: '3 Days',
    servicesProvided: [
      'LED Screens',
      'Sound System',
      'Lighting',
      'Event Planning',
      'Stage Setup',
      'Manpower',
    ],
  },
  {
    id: 6,
    title: 'The 17th IGF',
    category: '2022',
    location: 'Kigali, Rwanda',
    date: 'Nov 2022',
    image: './3.jpeg',
    description: 'Internet Governance Forum bringing together stakeholders from government and private sector.',
    client: 'United Nations',
    attendees: '3,000+',
    duration: '5 Days',
    servicesProvided: [
      'Sound System',
      'Lighting',
      'LED Screens',
      'Event Planning',
      'Manpower',
    ],
  },
  {
    id: 7,
    title: 'Rwanda Tourism Week',
    category: '2022',
    location: 'Various Locations',
    date: '2022',
    image: './volcano.png',
    description: 'A week-long celebration of Rwandan tourism featuring exhibitions and networking events.',
    client: 'Rwanda Development Board',
    attendees: '1,500+',
    duration: '7 Days',
    servicesProvided: [
      'Event Planning',
      'Decorations',
      'Sound System',
      'Lighting',
      'Cocktail Tables',
      'Round Tables',
    ],
  },
  {
    id: 8,
    title: 'Basketball Africa League 2021',
    category: '2021',
    location: 'Kigali Arena',
    date: 'May 2021',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80',
    description: 'The inaugural season of the Basketball Africa League.',
    client: 'NBA Africa',
    attendees: '5,000+',
    duration: '2 Weeks',
    servicesProvided: [
      'LED Screens',
      'Sound System',
      'Lighting',
      'Event Planning',
      'Manpower',
    ],
  },
  {
    id: 9,
    title: 'AU-EU Foreign Affairs Ministerial Meeting',
    category: '2021',
    location: 'Kigali Convention Centre',
    date: 'Oct 2021',
    image: 'https://images.unsplash.com/photo-1558008258-3256797b43f3?w=800&q=80',
    description: 'High-level diplomatic meeting between African Union and European Union ministers.',
    client: 'Ministry of Foreign Affairs',
    attendees: '100+ Ministers',
    duration: '2 Days',
    servicesProvided: [
      'LED Screens',
      'Sound System',
      'Lighting',
      'Event Planning',
      'Round Tables',
    ],
  },
  {
    id: 10,
    title: 'Kigali International Peace Marathon',
    category: '2023',
    location: 'Kigali, Rwanda',
    date: 'May 2023',
    image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800&q=80',
    description: 'Annual marathon event promoting peace and unity through sports.',
    client: 'Kigali City',
    attendees: '10,000+ Runners',
    duration: '1 Day',
    servicesProvided: [
      'Sound System',
      'Event Planning',
      'Manpower',
      'Stage Setup',
    ],
  },
];

// Cars Fleet - YOUR EXISTING HARDCODED DATA (KEPT AS IS)
const cars = [
  {
    id: 101,
    title: 'Toyota RAV4',
    category: 'SUV',
    location: 'Kigali',
    features: '5 seats • AC • GPS • Bluetooth',
    image: 'https://images.unsplash.com/photo-1581540222194-0def2dda95b8?w=800&q=80',
    description: 'Luxury SUV, perfect for family trips and business travel.',
    price: '$85/day',
    transmission: 'Automatic',
    fuel: 'Petrol',
    mileage: 'Unlimited',
  },
  {
    id: 102,
    title: 'Mercedes C300',
    category: 'Sedan',
    location: 'Kigali',
    features: 'Leather seats • Sunroof • Premium sound',
    image: 'https://images.unsplash.com/photo-1617654112368-307921291f42?w=800&q=80',
    description: 'Executive sedan for business travel.',
    price: '$120/day',
    transmission: 'Automatic',
    fuel: 'Petrol',
    mileage: 'Unlimited',
  },
  {
    id: 103,
    title: 'Toyota Land Cruiser Prado',
    category: 'SUV',
    location: 'Kigali',
    features: '7 seats • 4WD • AC',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80',
    description: 'Perfect for safari and off-road adventures.',
    price: '$150/day',
    transmission: 'Automatic',
    fuel: 'Diesel',
    mileage: 'Unlimited',
  },
  {
    id: 104,
    title: 'Coaster Bus',
    category: 'Bus',
    location: 'Kigali',
    features: '25 seats • AC • Luggage space',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
    description: 'Perfect for group travel and corporate outings.',
    price: '$250/day',
    transmission: 'Manual',
    fuel: 'Diesel',
    mileage: 'Limited',
  },
  {
    id: 105,
    title: 'Hyundai Tucson',
    category: 'SUV',
    location: 'Kigali',
    features: '5 seats • Fuel efficient • Bluetooth',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80',
    description: 'Economy SUV, great value for money.',
    price: '$70/day',
    transmission: 'Automatic',
    fuel: 'Petrol',
    mileage: 'Unlimited',
  },
  {
    id: 106,
    title: 'Range Rover Velar',
    category: 'Luxury SUV',
    location: 'Kigali',
    features: 'Luxury interior • Panoramic roof',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80',
    description: 'Ultimate luxury SUV for discerning clients.',
    price: '$200/day',
    transmission: 'Automatic',
    fuel: 'Petrol',
    mileage: 'Unlimited',
  },
];

// Tourism Destinations - YOUR EXISTING HARDCODED DATA (KEPT AS IS)
const tourism = [
  {
    id: 201,
    title: 'Volcanoes National Park',
    category: 'National Park',
    location: 'Musanze',
    bestTime: 'June - September',
    image: 'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=800&q=80',
    description: 'Home to the endangered mountain gorillas, offering gorilla trekking experiences.',
    activities: ['Gorilla Trekking', 'Hiking', 'Bird Watching'],
    duration: 'Full day',
    bestSeason: 'June to September',
  },
  {
    id: 202,
    title: 'Nyungwe National Park',
    category: 'National Park',
    location: 'Southwest Rwanda',
    bestTime: 'Year-round',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    description: 'One of Africa\'s oldest montane rainforests with canopy walk.',
    activities: ['Canopy Walk', 'Chimpanzee Tracking', 'Hiking'],
    duration: '1-2 days',
    bestSeason: 'Year-round',
  },
  {
    id: 203,
    title: 'Akagera National Park',
    category: 'National Park',
    location: 'Eastern Province',
    bestTime: 'June - September',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01c7e?w=800&q=80',
    description: 'Rwanda\'s Big Five safari destination with diverse wildlife.',
    activities: ['Game Drives', 'Boat Safaris', 'Bird Watching'],
    duration: '1-2 days',
    bestSeason: 'June to September',
  },
  {
    id: 204,
    title: 'Lake Kivu',
    category: 'Lake',
    location: 'Western Province',
    bestTime: 'Year-round',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80',
    description: 'Beautiful lake with stunning beaches and island excursions.',
    activities: ['Boat Rides', 'Kayaking', 'Beach Relaxation'],
    duration: '2-3 days',
    bestSeason: 'Year-round',
  },
  {
    id: 205,
    title: 'Lake Muhazi',
    category: 'Lake',
    location: 'Eastern Province',
    bestTime: 'Year-round',
    image: 'https://images.unsplash.com/photo-1578852318182-1c3dd2e9e8b0?w=800&q=80',
    description: 'Serene lake perfect for weekend getaways.',
    activities: ['Boating', 'Fishing', 'Picnics'],
    duration: '1 day',
    bestSeason: 'Year-round',
  },
  {
    id: 206,
    title: 'Nyanza King\'s Palace Museum',
    category: 'Museum',
    location: 'Nyanza',
    bestTime: 'Year-round',
    image: 'https://images.unsplash.com/photo-1590518637260-5d6ad554f8d9?w=800&q=80',
    description: 'Traditional royal residence with cultural exhibits.',
    activities: ['Cultural Tours', 'History Exhibits'],
    duration: '2-3 hours',
    bestSeason: 'Year-round',
  },
  {
    id: 207,
    title: 'Huye Ethnographic Museum',
    category: 'Museum',
    location: 'Huye',
    bestTime: 'Year-round',
    image: 'https://images.unsplash.com/photo-1566127992631-137a642a90f4?w=800&q=80',
    description: 'Premier museum of Rwandan culture with extensive artifacts.',
    activities: ['Cultural Exhibits', 'Guided Tours'],
    duration: '2-3 hours',
    bestSeason: 'Year-round',
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [selectedCar, setSelectedCar] = useState<any | null>(null);
  const [selectedTourism, setSelectedTourism] = useState<any | null>(null);
  const [showAllWorks, setShowAllWorks] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [returnToAllWorks, setReturnToAllWorks] = useState(false);
  
  // ============================================
  // NEW: State for database items
  // ============================================
  const [dbEvents, setDbEvents] = useState<any[]>([]);
  const [dbCars, setDbCars] = useState<any[]>([]);
  const [dbTourism, setDbTourism] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

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
  // NEW: Fetch items from database on mount
  // ============================================
  useEffect(() => {
    const fetchDbItems = async () => {
      setLoading(true);
      try {
        // Fetch events from database
        const eventsRes = await fetch('http://localhost:5000/api/events');
        const eventsData = await eventsRes.json();
        setDbEvents(eventsData.filter((e: any) => e.status === 'active'));
        
        // Fetch cars from database
        const carsRes = await fetch('http://localhost:5000/api/cars');
        const carsData = await carsRes.json();
        setDbCars(carsData.filter((c: any) => c.status === 'available'));
        
        // Fetch tourism from database
        const tourismRes = await fetch('http://localhost:5000/api/tourism');
        const tourismData = await tourismRes.json();
        setDbTourism(tourismData.filter((t: any) => t.status === 'active'));
        
      } catch (error) {
        console.error('Error fetching from database:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDbItems();
  }, []);

  // ============================================
  // MODIFIED: Combine hardcoded + database items
  // ============================================
  const allWorks = [
    // Your original hardcoded items
    ...events.map(event => ({ ...event, type: 'event', source: 'hardcoded' })),
    ...cars.map(car => ({ ...car, type: 'car', source: 'hardcoded' })),
    ...tourism.map(destination => ({ ...destination, type: 'tourism', source: 'hardcoded' })),
    
    // New items from database
    ...dbEvents.map(event => ({ ...event, type: 'event', source: 'database' })),
    ...dbCars.map(car => ({ ...car, type: 'car', source: 'database' })),
    ...dbTourism.map(tour => ({ ...tour, type: 'tourism', source: 'database' })),
  ];

  const filteredWorks = activeTab === 'all' 
    ? allWorks 
    : activeTab === 'events' 
    ? allWorks.filter(item => item.type === 'event')
    : activeTab === 'cars'
    ? allWorks.filter(item => item.type === 'car')
    : allWorks.filter(item => item.type === 'tourism');

  // Handle closing modals - return to appropriate view
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

  // Helper to parse JSON fields from database
  const parseJsonField = (field: any) => {
    if (!field) return [];
    if (Array.isArray(field)) return field;
    try {
      return JSON.parse(field);
    } catch {
      return [];
    }
  };

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
              Our
            </span>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-black"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Portfolio
            </h2>
            <div className="w-20 h-1 bg-[#c9a86c] rounded-full mt-4" />
          </div>

          <button
            onClick={() => setShowAllWorks(true)}
            className={`mt-6 md:mt-0 inline-flex items-center gap-2 text-black font-semibold text-sm uppercase tracking-wider transition-all duration-300 hover:text-[#c9a86c] group ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-8'
            }`}
            style={{ fontFamily: 'Montserrat, sans-serif', transitionDelay: '200ms' }}
          >
            View All Works
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
          </button>
        </div>

        {/* Featured Projects Grid (First 6 from combined list) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {allWorks.slice(0, 6).map((project, index) => (
            <div
              key={`${project.source}-${project.id}`}
              onClick={() => {
                if (project.type === 'event') setSelectedEvent(project);
                else if (project.type === 'car') setSelectedCar(project);
                else setSelectedTourism(project);
              }}
              className={`group relative rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: `${300 + index * 100}ms`,
                transform:
                  hoveredItem === project.id
                    ? 'translateY(-8px)'
                    : 'translateY(0)',
              }}
              onMouseEnter={() => setHoveredItem(project.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Image */}
              <div className="aspect-[4/5] relative overflow-hidden">
                <img
                  src={project.image || '/placeholder.jpg'}
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
                      {project.date || project.bestTime || 'N/A'}
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
            onClick={() => setShowAllWorks(true)}
            className="inline-flex items-center gap-3 border-2 border-black text-black px-8 py-4 font-semibold text-sm uppercase tracking-wider rounded transition-all duration-300 hover:bg-black hover:text-white"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            View All Works
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in p-4"
          onClick={handleCloseEvent}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseEvent}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-[#c9a86c] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content - Scrollable */}
            <div className="overflow-y-auto max-h-[90vh]">
              {/* Header Image */}
              <div className="relative h-64 md:h-80">
                <img
                  src={selectedEvent.image || '/placeholder.jpg'}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span
                    className="px-3 py-1 bg-[#c9a86c] text-white text-xs font-semibold uppercase tracking-wider rounded mb-3 inline-block"
                  >
                    {selectedEvent.category}
                  </span>
                  <h2
                    className="text-2xl md:text-3xl font-bold text-white"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {selectedEvent.title}
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
                    <p className="font-semibold text-black">{selectedEvent.attendees || 'N/A'}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Clock className="w-6 h-6 text-[#c9a86c] mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-semibold text-black">{selectedEvent.duration || 'N/A'}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <MapPin className="w-6 h-6 text-[#c9a86c] mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-semibold text-black">{selectedEvent.location}</p>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3
                    className="text-xl font-bold text-black mb-3"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    About This Event
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedEvent.description}
                  </p>
                  {selectedEvent.website && (
                    <a
                      href={selectedEvent.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#c9a86c] hover:text-black transition-colors mt-3"
                    >
                      Visit website <ArrowRight className="w-4 h-4" />
                    </a>
                  )}
                </div>

                {/* Services Provided */}
                {selectedEvent.servicesProvided && (
                  <div className="mb-8">
                    <h3
                      className="text-xl font-bold text-black mb-3"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      Our Services Provided
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {(selectedEvent.source === 'database' 
                        ? parseJsonField(selectedEvent.servicesProvided)
                        : selectedEvent.servicesProvided
                      ).map((service: string, index: number) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-[#c9a86c]/10 text-[#c9a86c] text-sm font-medium rounded-full"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Client */}
                {selectedEvent.client && (
                  <div className="p-4 bg-gray-50 rounded-lg mb-6">
                    <p className="text-sm text-gray-500">Client</p>
                    <p className="font-semibold text-black">{selectedEvent.client}</p>
                  </div>
                )}

                {/* CTA Button */}
                <button
                  onClick={() => {
                    setSelectedEvent(null);
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full bg-[#c9a86c] text-white px-6 py-4 rounded-lg font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 hover:bg-black"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Inquire About Similar Event
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Car Detail Modal */}
      {selectedCar && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in p-4"
          onClick={handleCloseCar}
        >
          <div
            className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseCar}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-[#c9a86c] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col md:flex-row">
              {/* Left - Image */}
              <div className="md:w-1/2 bg-gray-100">
                <img
                  src={selectedCar.image || '/placeholder.jpg'}
                  alt={selectedCar.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>

              {/* Right - Details */}
              <div className="md:w-1/2 p-8">
                <div className="mb-6">
                  <span className="px-3 py-1 bg-[#c9a86c] text-white text-xs font-semibold uppercase tracking-wider rounded inline-block mb-3">
                    {selectedCar.category}
                  </span>
                  <h2
                    className="text-3xl font-bold text-black mb-2"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {selectedCar.title}
                  </h2>
                  <p className="text-[#c9a86c] font-semibold text-xl">
                    {selectedCar.price}
                  </p>
                </div>

                <p className="text-gray-600 mb-6">
                  {selectedCar.description}
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-[#c9a86c]" />
                    <span className="text-gray-600">{selectedCar.features}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Car className="w-5 h-5 text-[#c9a86c]" />
                    <span className="text-gray-600">Transmission: {selectedCar.transmission}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#c9a86c]" />
                    <span className="text-gray-600">Fuel: {selectedCar.fuel}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedCar(null);
                    document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full bg-[#c9a86c] text-white px-6 py-4 rounded-lg font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 hover:bg-black"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Book This Car
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tourism Detail Modal */}
      {selectedTourism && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in p-4"
          onClick={handleCloseTourism}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseTourism}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-[#c9a86c] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content - Scrollable */}
            <div className="overflow-y-auto max-h-[90vh]">
              {/* Header Image */}
              <div className="relative h-64 md:h-80">
                <img
                  src={selectedTourism.image || '/placeholder.jpg'}
                  alt={selectedTourism.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span
                    className="px-3 py-1 bg-[#c9a86c] text-white text-xs font-semibold uppercase tracking-wider rounded mb-3 inline-block"
                  >
                    {selectedTourism.category}
                  </span>
                  <h2
                    className="text-2xl md:text-3xl font-bold text-white"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {selectedTourism.title}
                  </h2>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-10">
                {/* Quick Info */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <MapPin className="w-6 h-6 text-[#c9a86c] mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-semibold text-black">{selectedTourism.location}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Clock className="w-6 h-6 text-[#c9a86c] mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-semibold text-black">{selectedTourism.duration}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Calendar className="w-6 h-6 text-[#c9a86c] mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Best Time</p>
                    <p className="font-semibold text-black">{selectedTourism.bestTime}</p>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3
                    className="text-xl font-bold text-black mb-3"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    About This Destination
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedTourism.description}
                  </p>
                </div>

                {/* Activities */}
                {selectedTourism.activities && (
                  <div className="mb-8">
                    <h3
                      className="text-xl font-bold text-black mb-3"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      Activities
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {(selectedTourism.source === 'database'
                        ? parseJsonField(selectedTourism.activities)
                        : selectedTourism.activities
                      ).map((activity: string, index: number) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-[#c9a86c]/10 text-[#c9a86c] text-sm font-medium rounded-full"
                        >
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Best Season */}
                {selectedTourism.bestSeason && (
                  <div className="p-4 bg-gray-50 rounded-lg mb-6">
                    <p className="text-sm text-gray-500">Best Season to Visit</p>
                    <p className="font-semibold text-black">{selectedTourism.bestSeason}</p>
                  </div>
                )}

                {/* CTA Button */}
                <button
                  onClick={() => {
                    setSelectedTourism(null);
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full bg-[#c9a86c] text-white px-6 py-4 rounded-lg font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 hover:bg-black"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Plan Your Visit
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* All Works Modal */}
      {showAllWorks && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in p-4"
          onClick={() => setShowAllWorks(false)}
        >
          <div
            className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-2xl overflow-hidden animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowAllWorks(false)}
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
                  All Works
                </h2>
                <p className="text-gray-600 mt-2">
                  Explore our portfolio of successful events, premium vehicles, and top destinations
                </p>

                {/* Tabs - Show counts */}
                <div className="flex flex-wrap gap-4 mt-6">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                      activeTab === 'all'
                        ? 'bg-[#c9a86c] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    All ({allWorks.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('events')}
                    className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                      activeTab === 'events'
                        ? 'bg-[#c9a86c] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Events ({allWorks.filter(item => item.type === 'event').length})
                  </button>
                  <button
                    onClick={() => setActiveTab('cars')}
                    className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                      activeTab === 'cars'
                        ? 'bg-[#c9a86c] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Cars ({allWorks.filter(item => item.type === 'car').length})
                  </button>
                  <button
                    onClick={() => setActiveTab('tourism')}
                    className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                      activeTab === 'tourism'
                        ? 'bg-[#c9a86c] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Tourism ({allWorks.filter(item => item.type === 'tourism').length})
                  </button>
                </div>
              </div>

              {/* All Works Grid */}
              <div className="p-6 md:p-10">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredWorks.map((item) => (
                    <div
                      key={`${item.source}-${item.id}`}
                      onClick={() => handleOpenFromAllWorks(item)}
                      className="group relative rounded-xl overflow-hidden shadow-lg cursor-pointer"
                    >
                      <div className="aspect-[4/3] relative overflow-hidden">
                        <img
                          src={item.image || '/placeholder.jpg'}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                        
                        <div className="absolute top-3 left-3 flex gap-2">
                          <span className="px-3 py-1 bg-[#c9a86c] text-white text-xs font-semibold uppercase tracking-wider rounded">
                            {item.category}
                          </span>
                          {item.type === 'car' && item.price && (
                            <span className="px-3 py-1 bg-blue-500 text-white text-xs font-semibold uppercase tracking-wider rounded">
                              {item.price}
                            </span>
                          )}
                        </div>

                        <div className="absolute inset-x-0 bottom-0 p-4">
                          <h3
                            className="text-lg font-bold text-white line-clamp-2"
                            style={{ fontFamily: 'Montserrat, sans-serif' }}
                          >
                            {item.title}
                          </h3>
                          <p className="text-white/70 text-sm mt-1">
                            {item.type === 'event' 
                              ? item.location 
                              : item.type === 'car' 
                              ? item.features 
                              : item.location}
                          </p>
                        </div>

                        {/* Type Indicator */}
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
    </section>
  );
}