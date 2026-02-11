import { useEffect, useRef, useState } from 'react';
import { Calendar, Car, MapPin, Send, CheckCircle, User, Mail, Phone, MessageSquare, Users, MapPinned } from 'lucide-react';

const bookingTypes = [
  { id: 'event', label: 'Event Management', icon: Calendar },
  { id: 'car', label: 'Car Rental', icon: Car },
  { id: 'tour', label: 'Tourism Package', icon: MapPin },
];

// Contact Information
const CONTACT_INFO = {
  phone: '0782169162',
  whatsapp: '250782169162',
  email: 'cardinaloichirwa@gmail.com',
  address: '1 KN 78 St, Kigali',
};

export default function Booking() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedType, setSelectedType] = useState('event');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    start_date: '',
    end_date: '',
    number_of_guests: 1,
    message: '',
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare the message for WhatsApp and Email
    const bookingMessage = `
*New Booking Request - THE HURBERT*

*Service Type:* ${bookingTypes.find(t => t.id === selectedType)?.label}

*Customer Details:*
Name: ${formData.customer_name}
Email: ${formData.customer_email}
Phone: ${formData.customer_phone || 'Not provided'}

*Booking Details:*
Start Date: ${formData.start_date || 'Not specified'}
End Date: ${formData.end_date || 'Not specified'}
Number of Guests: ${formData.number_of_guests}

*Message:*
${formData.message || 'No additional message'}
    `.trim();

    // Open WhatsApp with pre-filled message
    const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(bookingMessage)}`;
    window.open(whatsappUrl, '_blank');

    // Also send email
    const emailSubject = `New Booking Request - ${bookingTypes.find(t => t.id === selectedType)?.label}`;
    const emailBody = encodeURIComponent(bookingMessage);
    const emailUrl = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(emailSubject)}&body=${emailBody}`;
    
    // Small delay before opening email to allow WhatsApp to open first
    setTimeout(() => {
      window.open(emailUrl, '_blank');
    }, 500);

    // Show success message
    setSubmitSuccess(true);
    setFormData({
      customer_name: '',
      customer_email: '',
      customer_phone: '',
      start_date: '',
      end_date: '',
      number_of_guests: 1,
      message: '',
    });

    setTimeout(() => setSubmitSuccess(false), 5000);
    setIsSubmitting(false);
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent('Hello THE HURBERT! I would like to make a booking inquiry.');
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${message}`, '_blank');
  };

  return (
    <section
      id="booking"
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
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Content */}
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-12'
            }`}
          >
            <span
              className="text-[#c9a86c] text-sm font-semibold uppercase tracking-[0.3em] mb-4 block"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Book Now
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold text-black mb-6"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Reserve Your Experience
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Ready to plan your next event, rent a vehicle, or explore Rwanda?
              Fill out the form and our team will get back to you within 24 hours.
            </p>

            {/* Booking Type Cards */}
            <div className="space-y-4">
              {bookingTypes.map((type, index) => {
                const Icon = type.icon;
                return (
                  <div
                    key={type.id}
                    className={`p-5 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                      selectedType === type.id
                        ? 'border-[#c9a86c] bg-[#c9a86c]/10'
                        : 'border-gray-200 bg-white hover:border-[#c9a86c]/50'
                    }`}
                    onClick={() => setSelectedType(type.id)}
                    style={{ transitionDelay: `${200 + index * 100}ms` }}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
                          selectedType === type.id
                            ? 'bg-[#c9a86c]'
                            : 'bg-gray-100'
                        }`}
                      >
                        <Icon
                          className={`w-6 h-6 transition-colors duration-300 ${
                            selectedType === type.id
                              ? 'text-white'
                              : 'text-gray-500'
                          }`}
                        />
                      </div>
                      <div>
                        <h3
                          className="font-semibold text-black"
                          style={{ fontFamily: 'Montserrat, sans-serif' }}
                        >
                          {type.label}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Click to select this service
                        </p>
                      </div>
                      <div className="ml-auto">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                            selectedType === type.id
                              ? 'border-[#c9a86c] bg-[#c9a86c]'
                              : 'border-gray-300'
                          }`}
                        >
                          {selectedType === type.id && (
                            <CheckCircle className="w-4 h-4 text-white" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Contact Info */}
            <div className="mt-10 p-6 bg-black rounded-xl text-white">
              <h4
                className="font-semibold mb-4"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Need Immediate Assistance?
              </h4>
              <div className="space-y-3 text-sm">
                <p className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#c9a86c]" />
                  <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-[#c9a86c] transition-colors">
                    {CONTACT_INFO.phone}
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#c9a86c]" />
                  <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-[#c9a86c] transition-colors">
                    {CONTACT_INFO.email}
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <MapPinned className="w-5 h-5 text-[#c9a86c]" />
                  <span>{CONTACT_INFO.address}</span>
                </p>
              </div>
              <button
                onClick={openWhatsApp}
                className="mt-4 w-full bg-green-500 text-white py-3 rounded-lg font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 hover:bg-green-600"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                <MessageSquare className="w-5 h-5" />
                Chat on WhatsApp
              </button>
            </div>
          </div>

          {/* Right Form */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-12'
            }`}
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10">
              {submitSuccess ? (
                <div className="text-center py-10">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h3
                    className="text-2xl font-bold text-black mb-4"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    Booking Submitted!
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Thank you for your booking request. We've opened WhatsApp and email for you to complete your submission.
                  </p>
                  <p className="text-sm text-gray-500">
                    Our team will contact you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="customer_name"
                          value={formData.customer_name}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#c9a86c] focus:border-transparent transition-all duration-300"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          name="customer_email"
                          value={formData.customer_email}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#c9a86c] focus:border-transparent transition-all duration-300"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="customer_phone"
                        value={formData.customer_phone}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#c9a86c] focus:border-transparent transition-all duration-300"
                        placeholder="0782169162"
                      />
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="date"
                          name="start_date"
                          value={formData.start_date}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#c9a86c] focus:border-transparent transition-all duration-300"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="date"
                          name="end_date"
                          value={formData.end_date}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#c9a86c] focus:border-transparent transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Number of Guests */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Guests
                    </label>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        name="number_of_guests"
                        value={formData.number_of_guests}
                        onChange={handleInputChange}
                        min={1}
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#c9a86c] focus:border-transparent transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Message
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#c9a86c] focus:border-transparent transition-all duration-300 resize-none"
                        placeholder="Tell us more about your requirements..."
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#c9a86c] text-white py-4 rounded-lg font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Submit Booking Request
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    By submitting, you'll be redirected to WhatsApp and email to complete your booking request.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
