import { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, CheckCircle, MapPinned } from 'lucide-react';

// Contact Information
const CONTACT_INFO = {
  phone: '0782169162',
  whatsapp: '250782169162',
  email: 'cardinaloichirwa@gmail.com',
  address: '1 KN 78 St, Kigali',
};

const contactInfo = [
  {
    icon: MapPinned,
    title: 'Address',
    content: CONTACT_INFO.address,
  },
  {
    icon: Phone,
    title: 'Phone / WhatsApp',
    content: CONTACT_INFO.phone,
    link: `tel:${CONTACT_INFO.phone}`,
  },
  {
    icon: Mail,
    title: 'Email',
    content: CONTACT_INFO.email,
    link: `mailto:${CONTACT_INFO.email}`,
  },
  {
    icon: Clock,
    title: 'Working Hours',
    content: 'Mon - Fri: 8:00 AM - 6:00 PM',
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare the message for WhatsApp and Email
    const contactMessage = `
*New Contact Message - THE HURBERT*

*From:*
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}

*Subject:*
${formData.subject || 'No subject'}

*Message:*
${formData.message}
    `.trim();

    // Open WhatsApp with pre-filled message
    const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(contactMessage)}`;
    window.open(whatsappUrl, '_blank');

    // Also send email
    const emailSubject = formData.subject || 'New Contact Message';
    const emailBody = encodeURIComponent(contactMessage);
    const emailUrl = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(emailSubject)}&body=${emailBody}`;
    
    // Small delay before opening email to allow WhatsApp to open first
    setTimeout(() => {
      window.open(emailUrl, '_blank');
    }, 500);

    // Show success message
    setSubmitSuccess(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });

    setTimeout(() => setSubmitSuccess(false), 5000);
    setIsSubmitting(false);
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent('Hello THE HURBERT! I would like to inquire about your services.');
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${message}`, '_blank');
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 bg-white overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#c9a86c] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#c9a86c] rounded-full blur-3xl" />
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
            Get in Touch
          </span>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-black"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Contact Us
          </h2>
          <div className="flex justify-center mt-4">
            <div className="w-20 h-1 bg-[#c9a86c] rounded-full" />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left - Contact Info */}
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-12'
            }`}
          >
            <p className="text-gray-600 text-lg mb-10 leading-relaxed">
              Have a question or need a quote? Reach out to us and our team will
              be happy to assist you with your event, car rental, or tourism needs.
            </p>

            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                const content = (
                  <div
                    className="p-6 bg-gray-50 rounded-xl transition-all duration-300 hover:bg-[#c9a86c]/10 hover:shadow-lg group"
                    style={{ transitionDelay: `${200 + index * 100}ms` }}
                  >
                    <div className="w-12 h-12 rounded-full bg-[#c9a86c] flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h4
                      className="font-semibold text-black mb-2"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      {item.title}
                    </h4>
                    <p className="text-gray-600 text-sm">{item.content}</p>
                  </div>
                );

                return item.link ? (
                  <a key={item.title} href={item.link} className="block">
                    {content}
                  </a>
                ) : (
                  <div key={item.title}>{content}</div>
                );
              })}
            </div>

            {/* WhatsApp CTA */}
            <div className="p-6 bg-green-50 rounded-xl border border-green-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4
                    className="font-semibold text-black mb-2"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    Chat on WhatsApp
                  </h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Get instant responses to your queries via WhatsApp at {CONTACT_INFO.phone}.
                  </p>
                  <button
                    onClick={openWhatsApp}
                    className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold text-sm uppercase tracking-wider transition-all duration-300 hover:bg-green-600"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    <MessageCircle className="w-5 h-5" />
                    Start Chat
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-12'
            }`}
          >
            <div className="bg-gray-50 rounded-2xl p-8 lg:p-10">
              {submitSuccess ? (
                <div className="text-center py-10">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h3
                    className="text-2xl font-bold text-black mb-4"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    Message Sent!
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Thank you for reaching out. We've opened WhatsApp and email for you to complete your message.
                  </p>
                  <p className="text-sm text-gray-500">
                    We'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#c9a86c] focus:border-transparent transition-all duration-300 bg-white"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#c9a86c] focus:border-transparent transition-all duration-300 bg-white"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  {/* Phone & Subject */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#c9a86c] focus:border-transparent transition-all duration-300 bg-white"
                        placeholder="0782169162"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#c9a86c] focus:border-transparent transition-all duration-300 bg-white"
                        placeholder="How can we help?"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#c9a86c] focus:border-transparent transition-all duration-300 bg-white resize-none"
                      placeholder="Tell us about your project or inquiry..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black text-white py-4 rounded-lg font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 hover:bg-[#c9a86c] disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    By submitting, you'll be redirected to WhatsApp and email to complete your message.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <button
        onClick={openWhatsApp}
        className="fixed bottom-8 right-8 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </button>
    </section>
  );
}
