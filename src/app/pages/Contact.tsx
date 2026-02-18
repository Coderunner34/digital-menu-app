import { MapPin, Clock, Phone, MessageCircle, Navigation, Mail, ExternalLink } from 'lucide-react';
import { getSettings } from '../../utils/storage';
import { useState } from 'react';

export function Contact() {
  const [settings] = useState(getSettings());

  const openGoogleMaps = () => {
    window.open('https://www.google.com/maps/search/?api=1&query=Thindingua+opposite+Quick+Mart+Kiambu+Road', '_blank');
  };

  const contactMethods = [
    {
      icon: MapPin,
      title: 'Visit us',
      content: settings.location,
      action: 'Get directions',
      actionHandler: openGoogleMaps,
      actionIcon: Navigation,
      color: 'text-orange-500',
      bg: 'bg-orange-50 dark:bg-orange-950/30'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      content: settings.whatsappNumber,
      action: 'Send message',
      actionLink: `https://wa.me/${settings.whatsappNumber}`,
      actionIcon: MessageCircle,
      color: 'text-green-600',
      bg: 'bg-green-50 dark:bg-green-950/30'
    },
    {
      icon: Phone,
      title: 'Call us',
      content: settings.mpesaNumber,
      action: '0792 211 741',
      actionLink: 'tel:0792211741',
      actionIcon: Phone,
      color: 'text-blue-600',
      bg: 'bg-blue-50 dark:bg-blue-950/30'
    },
    {
      icon: Clock,
      title: 'Open hours',
      content: settings.operatingHours,
      subtitle: 'Events? We\'re available 24/7',
      color: 'text-purple-600',
      bg: 'bg-purple-50 dark:bg-purple-950/30'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A]">
      
      {/* HERO - Clean, minimal */}
      <div className="border-b border-gray-100 dark:border-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="max-w-2xl">
            <span className="text-sm uppercase tracking-wider text-orange-500 font-medium">
              Contact
            </span>
            <h1 className="font-serif text-5xl md:text-6xl text-gray-900 dark:text-white mt-3 mb-4">
              Get in touch
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Order, inquire, or just say hello. We respond within 15min.
            </p>
          </div>
        </div>
      </div>

      {/* CONTACT GRID - 2 column layout */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* LEFT COLUMN - Contact cards */}
          <div className="space-y-6">
            {contactMethods.map((method, index) => (
              <div 
                key={index}
                className={`flex items-start gap-5 p-5 rounded-xl ${method.bg} border border-gray-100 dark:border-gray-800`}
              >
                <div className={`w-12 h-12 rounded-xl ${method.bg} flex items-center justify-center flex-shrink-0`}>
                  <method.icon className={`w-5 h-5 ${method.color}`} />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                    {method.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {method.content}
                  </p>
                  {method.subtitle && (
                    <p className="text-xs text-gray-500 mt-1">
                      {method.subtitle}
                    </p>
                  )}
                  
                  {method.action && (
                    <button
                      onClick={method.actionHandler}
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      <method.actionIcon className="w-3.5 h-3.5" />
                      {method.action}
                    </button>
                  )}
                  
                  {method.actionLink && (
                    <a
                      href={method.actionLink}
                      target={method.title === 'WhatsApp' ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      <method.actionIcon className="w-3.5 h-3.5" />
                      {method.action}
                    </a>
                  )}
                </div>
              </div>
            ))}

            {/* DEVELOPER CARD - Orange accent */}
            <div className="mt-8 p-5 bg-orange-50 dark:bg-orange-950/30 rounded-xl border border-orange-200 dark:border-orange-900">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <ExternalLink className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                    Need urgent help?
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Tech issues or emergency catering
                  </p>
                  <div className="flex items-center gap-3">
                    <a 
                      href="tel:0792211741"
                      className="text-sm font-medium text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300"
                    >
                      0792 211 741
                    </a>
                    <span className="text-gray-300 dark:text-gray-700">•</span>
                    <a 
                      href="https://bizwaziri-clean.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 inline-flex items-center gap-1"
                    >
                      Bizwaziri
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Map & delivery */}
          <div className="space-y-6">
            {/* MAP CARD */}
            <div className="bg-white dark:bg-[#0A0A0A] border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden">
              <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-900">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.247869729633!2d36.8219462!3d-1.2920659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1a4d5c9e8b23%3A0x5e5e5e5e5e5e5e5e!2sThindingua%2C%20Kiambu!5e0!3m2!1sen!2ske!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Restaurant location"
                  className="w-full h-full"
                />
              </div>
              
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                      Thindingua
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Opposite Quick Mart, Kiambu Road
                    </p>
                  </div>
                  <button
                    onClick={openGoogleMaps}
                    className="flex items-center gap-1.5 text-sm font-medium text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300"
                  >
                    <Navigation className="w-4 h-4" />
                    Navigate
                  </button>
                </div>
              </div>
            </div>

            {/* DELIVERY CARD */}
            <div className="bg-white dark:bg-[#0A0A0A] border border-gray-100 dark:border-gray-800 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                    Delivery zones
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Free within 5km radius
                  </p>
                  <ul className="space-y-1">
                    <li className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-2">
                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                      Thindingua
                    </li>
                    <li className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-2">
                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                      Kiambu Road area
                    </li>
                    <li className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-2">
                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                      Ruaka & surrounding
                    </li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                    <span className="font-medium">Catering:</span> County-wide available
                  </p>
                </div>
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://wa.me/${settings.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Order now
              </a>
              <a
                href={`tel:${settings.mpesaNumber}`}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM CTA - Simple */}
      <div className="border-t border-gray-100 dark:border-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-serif text-xl text-gray-900 dark:text-white mb-1">
                Emergency catering?
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Call our urgent response line
              </p>
            </div>
            <a
              href="tel:0792211741"
              className="text-2xl font-serif text-orange-500 hover:text-orange-600 transition-colors"
            >
              0792 211 741
            </a>
          </div>
        </div>
      </div>
      
    </div>
  );
}