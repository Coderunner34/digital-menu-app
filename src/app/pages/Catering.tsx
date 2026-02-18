import { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Users, 
  Utensils, 
  Phone, 
  Mail, 
  MapPin, 
  Check, 
  ChevronRight, 
  Star, 
  Package, 
  Wine, 
  Coffee, 
  Award,
  Send,
  MessageCircle
} from 'lucide-react';
import { Link } from 'react-router';
import { getSettings } from '../../utils/storage';
import { toast } from 'sonner';
import { Toaster } from '../components/ui/sonner';

export function Catering() {
  const [settings] = useState(getSettings());
  const [activeTab, setActiveTab] = useState('packages');
  const [guests, setGuests] = useState('50');
  const [eventType, setEventType] = useState('corporate');
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const packages = [
    {
      id: 'executive',
      name: 'Executive Lunch',
      price: '2,500',
      perPerson: '2,500',
      description: 'Premium corporate dining experience',
      items: ['Grilled Chicken or Beef', 'Seasonal Vegetables', 'Rice or Potatoes', 'Fresh Salad', 'Bottled Water', 'Fresh Fruit Platter'],
      minGuests: 20,
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium Platters',
      price: '3,800',
      perPerson: '3,800',
      description: 'Elevated dining with gourmet selections',
      items: ['Grilled Salmon or Steak', 'Truffle Mashed Potatoes', 'Roasted Vegetables', 'Gourmet Salad', 'Premium Beverages', 'Artisan Desserts'],
      minGuests: 30,
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'celebration',
      name: 'Celebration Feast',
      price: '4,200',
      perPerson: '4,200',
      description: 'Perfect for weddings and special events',
      items: ['Full Buffet Selection', 'Live Cooking Station', 'Premium Bar Setup', 'Custom Cake', 'Decorative Displays', 'Professional Service'],
      minGuests: 50,
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const addOns = [
    { id: 'dessert', name: 'Dessert Station', price: '450', perPerson: true },
    { id: 'drinks', name: 'Premium Drinks', price: '350', perPerson: true },
    { id: 'service', name: 'Wait Staff', price: '15,000', perPerson: false },
    { id: 'decor', name: 'Table Decor', price: '8,500', perPerson: false }
  ];

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      toast.success('Inquiry sent successfully! We\'ll respond within 24 hours.', {
        duration: 5000,
        position: 'top-center',
      });
      setIsSubmitting(false);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 1000);
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      `Hello! I'd like to inquire about catering for ${guests} guests on ${date || '[date]'}.`
    );
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A]">
      <Toaster position="top-center" />
      
      {/* Hero Section - Clean Editorial with Image */}
      <div className="relative bg-white dark:bg-[#0A0A0A] border-b border-gray-100 dark:border-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-900 rounded-full">
                  <Award className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <span className="text-xs uppercase tracking-wider text-gray-700 dark:text-gray-300 font-medium">
                    Premium Catering Service
                  </span>
                </div>
                
                <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-gray-900 dark:text-white tracking-tight leading-[1.1]">
                  Exceptional food
                  <span className="block text-gray-400 dark:text-gray-600 mt-2">
                    for exceptional events
                  </span>
                </h1>
                
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md leading-relaxed">
                  From intimate gatherings to grand celebrations, we bring restaurant-quality dining to your event.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={openWhatsApp}
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300 font-medium tracking-wide"
                >
                  <MessageCircle className="w-5 h-5" />
                  Start your inquiry
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <Link
                  to="/menu"
                  className="inline-flex items-center justify-center px-8 py-4 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-300 font-medium tracking-wide"
                >
                  View menu
                </Link>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">5.0 rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">200+ events</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">10-500 guests</span>
                </div>
              </div>
            </div>
            
            {/* Right - Hero Image */}
            <div className="relative hidden lg:block">
              <div className="aspect-[4/5] bg-gray-100 dark:bg-gray-900 rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80"
                  alt="Catering spread"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gray-100 dark:bg-gray-900 rounded-full -z-10" />
              <div className="absolute -top-6 -right-6 w-40 h-40 bg-gray-100 dark:bg-gray-900 rounded-full -z-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Quote Calculator */}
      <div className="sticky top-20 z-30 bg-white/80 dark:bg-[#0A0A0A]/80 backdrop-blur-md border-y border-gray-100 dark:border-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-gray-400" />
                <select 
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="bg-transparent border-0 text-sm font-medium text-gray-900 dark:text-white focus:ring-0 cursor-pointer"
                >
                  <option value="10">10-20 guests</option>
                  <option value="30">20-50 guests</option>
                  <option value="50">50-100 guests</option>
                  <option value="100">100+ guests</option>
                </select>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-transparent border-0 text-sm font-medium text-gray-900 dark:text-white focus:ring-0"
                  placeholder="Select date"
                />
              </div>
            </div>
            
            <button
              onClick={openWhatsApp}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-all text-sm font-medium rounded-lg"
            >
              Get instant quote
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-8 border-b border-gray-100 dark:border-gray-900 mb-12">
          <button
            onClick={() => setActiveTab('packages')}
            className={`pb-4 text-sm font-medium transition-all relative ${
              activeTab === 'packages'
                ? 'text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white'
                : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Catering Packages
          </button>
          <button
            onClick={() => setActiveTab('addons')}
            className={`pb-4 text-sm font-medium transition-all relative ${
              activeTab === 'addons'
                ? 'text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white'
                : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Add-ons
          </button>
          <button
            onClick={() => setActiveTab('inquiry')}
            className={`pb-4 text-sm font-medium transition-all relative ${
              activeTab === 'inquiry'
                ? 'text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white'
                : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Send Inquiry
          </button>
        </div>

        {/* Packages Grid */}
        {activeTab === 'packages' && (
          <div className="space-y-12">
            <div className="grid md:grid-cols-3 gap-8">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="group bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 rounded-2xl overflow-hidden transition-all"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={pkg.image} 
                      alt={pkg.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {pkg.popular && (
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-full text-xs font-medium">
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          Most Popular
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-serif text-xl text-gray-900 dark:text-white mb-1">
                          {pkg.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {pkg.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="font-serif text-2xl text-gray-900 dark:text-white">
                        KES {pkg.perPerson}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        /person
                      </span>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      {pkg.items.slice(0, 4).map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">{item}</span>
                        </div>
                      ))}
                      {pkg.items.length > 4 && (
                        <div className="text-sm text-gray-500">
                          +{pkg.items.length - 4} more items
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-xs text-gray-500">
                          Min. {pkg.minGuests} guests
                        </span>
                      </div>
                      <button
                        onClick={openWhatsApp}
                        className="text-sm font-medium text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex items-center gap-1"
                      >
                        Inquire
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add-ons Grid */}
        {activeTab === 'addons' && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {addOns.map((addon) => (
                <div
                  key={addon.id}
                  className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 rounded-xl p-6 transition-all"
                >
                  <div className="w-10 h-10 bg-gray-100 dark:bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                    {addon.id === 'dessert' && <Coffee className="w-5 h-5 text-gray-700 dark:text-gray-300" />}
                    {addon.id === 'drinks' && <Wine className="w-5 h-5 text-gray-700 dark:text-gray-300" />}
                    {addon.id === 'service' && <Users className="w-5 h-5 text-gray-700 dark:text-gray-300" />}
                    {addon.id === 'decor' && <Package className="w-5 h-5 text-gray-700 dark:text-gray-300" />}
                  </div>
                  
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                    {addon.name}
                  </h3>
                  
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="font-serif text-xl text-gray-900 dark:text-white">
                      KES {addon.price}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {addon.perPerson ? '/person' : '/event'}
                    </span>
                  </div>
                  
                  <button
                    onClick={openWhatsApp}
                    className="w-full py-2 text-sm text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                  >
                    Add to inquiry
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Inquiry Form */}
        {activeTab === 'inquiry' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-8 md:p-10">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="font-serif text-2xl text-gray-900 dark:text-white">
                    Tell us about your event
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    We'll get back to you within 24 hours with a customized proposal.
                  </p>
                </div>
                
                <form onSubmit={handleInquiry} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Event type
                      </label>
                      <select
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                        className="w-full px-4 py-3 bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-gray-800 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-600"
                      >
                        <option value="corporate">Corporate Event</option>
                        <option value="wedding">Wedding</option>
                        <option value="private">Private Party</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Number of guests
                      </label>
                      <input
                        type="number"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full px-4 py-3 bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-gray-800 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-600"
                        placeholder="e.g., 50"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Event date
                      </label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-3 bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-gray-800 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-600"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Budget per person (KES)
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-gray-800 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-600"
                        placeholder="e.g., 2,500"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Full name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-gray-800 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-600"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Email address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-gray-800 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-600"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Phone number
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-gray-800 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-600"
                        placeholder="+254 XXX XXX XXX"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Additional details
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-gray-800 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-600"
                      placeholder="Tell us about your event, dietary requirements, or special requests..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-all font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        Send inquiry
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  
                  <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                    We'll respond within 24 hours. You can also reach us directly at{' '}
                    <a href={`tel:${settings.phone}`} className="text-gray-900 dark:text-white underline">
                      {settings.phone}
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Why Choose Us Section */}
        <div className="mt-24 pt-16 border-t border-gray-100 dark:border-gray-900">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center">
                <Utensils className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white">Custom menus</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Every event is unique. We work with you to create a personalized menu that fits your taste and budget.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white">Professional service</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                From setup to cleanup, our experienced staff ensures seamless execution so you can enjoy your event.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center">
                <Award className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white">Quality guaranteed</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                We use the same fresh ingredients and recipes as our restaurant. No compromises, ever.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-16 p-8 bg-gray-50 dark:bg-gray-900/50 rounded-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white dark:bg-[#0A0A0A] rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Call us directly</p>
                <a href={`tel:${settings.phone}`} className="font-medium text-gray-900 dark:text-white">
                  {settings.phone || '+254 XXX XXX XXX'}
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white dark:bg-[#0A0A0A] rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Email us</p>
                <a href={`mailto:${settings.email}`} className="font-medium text-gray-900 dark:text-white">
                  {settings.email || 'catering@example.com'}
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white dark:bg-[#0A0A0A] rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Service area</p>
                <p className="font-medium text-gray-900 dark:text-white">Nairobi & surrounding</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
