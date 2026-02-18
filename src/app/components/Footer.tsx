// import { Instagram, Facebook } from 'lucide-react';
// import { MessageCircle } from 'lucide-react';
// import { Link } from 'react-router';
// import { getSettings } from '../../utils/storage';
// import { useState, useEffect } from 'react';

// export function Footer() {
//   const [settings, setSettings] = useState(getSettings());

//   useEffect(() => {
//     const handleStorageChange = () => {
//       setSettings(getSettings());
//     };
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);

//   return (
//     <footer className="bg-[#F5F5F5] dark:bg-[#0F0F0F] py-12 px-4 transition-colors duration-300">
//       <div className="max-w-7xl mx-auto">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
//           {/* Brand */}
//           <div>
//             <div className="flex items-center gap-2 mb-2">
//               <span className="text-2xl">{settings.logo}</span>
//               <h3 className="font-['Poppins'] font-bold text-xl text-[#212121] dark:text-[#F5F5F5]">
//                 {settings.name}
//               </h3>
//             </div>
//             <p className="font-['Inter'] text-sm text-gray-600 dark:text-gray-400">
//               {settings.slogan}
//             </p>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h4 className="font-['Poppins'] font-semibold text-base text-[#212121] dark:text-[#F5F5F5] mb-3">
//               Quick Links
//             </h4>
//             <ul className="space-y-2">
//               <li>
//                 <Link 
//                   to="/menu"
//                   className="font-['Inter'] text-sm text-gray-600 dark:text-gray-400 hover:text-[#FF6B35] transition-colors hover:underline"
//                 >
//                   Menu
//                 </Link>
//               </li>
//               <li>
//                 <Link 
//                   to="/catering"
//                   className="font-['Inter'] text-sm text-gray-600 dark:text-gray-400 hover:text-[#FF6B35] transition-colors hover:underline"
//                 >
//                   Catering Services
//                 </Link>
//               </li>
//               <li>
//                 <Link 
//                   to="/gallery"
//                   className="font-['Inter'] text-sm text-gray-600 dark:text-gray-400 hover:text-[#FF6B35] transition-colors hover:underline"
//                 >
//                   Gallery
//                 </Link>
//               </li>
//               <li>
//                 <Link 
//                   to="/about"
//                   className="font-['Inter'] text-sm text-gray-600 dark:text-gray-400 hover:text-[#FF6B35] transition-colors hover:underline"
//                 >
//                   About Us
//                 </Link>
//               </li>
//               <li>
//                 <Link 
//                   to="/contact"
//                   className="font-['Inter'] text-sm text-gray-600 dark:text-gray-400 hover:text-[#FF6B35] transition-colors hover:underline"
//                 >
//                   Contact
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Contact */}
//           <div>
//             <h4 className="font-['Poppins'] font-semibold text-base text-[#212121] dark:text-[#F5F5F5] mb-3">
//               Contact
//             </h4>
//             <div className="space-y-2">
//               <a 
//                 href={`https://wa.me/${settings.whatsappNumber}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center gap-2 font-['Inter'] text-sm text-gray-600 dark:text-gray-400 hover:text-[#25D366] transition-colors"
//               >
//                 <MessageCircle className="w-4 h-4" />
//                 WhatsApp: {settings.whatsappNumber}
//               </a>
//               <p className="font-['Inter'] text-sm text-gray-600 dark:text-gray-400">
//                 {settings.location}
//               </p>
//               <p className="font-['Inter'] text-xs text-gray-500 dark:text-gray-500 mt-3">
//                 Developer Contact: 0792211741
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Social & Copyright */}
//         <div className="pt-8 border-t border-gray-300 dark:border-gray-700">
//           <div className="flex flex-col md:flex-row items-center justify-between gap-4">
//             <div className="flex items-center gap-4">
//               <a 
//                 href="https://instagram.com" 
//                 target="_blank" 
//                 rel="noopener noreferrer"
//                 className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-[#2A2A2A] hover:bg-[#FF6B35] hover:text-white transition-all"
//                 aria-label="Instagram"
//               >
//                 <Instagram className="w-5 h-5" />
//               </a>
//               <a 
//                 href="https://facebook.com" 
//                 target="_blank" 
//                 rel="noopener noreferrer"
//                 className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-[#2A2A2A] hover:bg-[#FF6B35] hover:text-white transition-all"
//                 aria-label="Facebook"
//               >
//                 <Facebook className="w-5 h-5" />
//               </a>
//             </div>
//             <div className="text-center md:text-right">
//               <p className="font-['Inter'] text-sm text-gray-600 dark:text-gray-400">
//                 © 2026 {settings.name}. All rights reserved.
//               </p>
//               <div className="mt-2 flex items-center justify-center md:justify-end gap-2">
//                 <span className="font-['Inter'] text-xs text-gray-500 dark:text-gray-500">
//                   Powered by
//                 </span>
//                 <a 
//                   href="https://bizwaziri-clean.vercel.app/" 
//                   target="_blank" 
//                   rel="noopener noreferrer"
//                   className="font-['Poppins'] font-bold text-sm text-[#FF6B35] hover:text-[#E55A2B] transition-colors"
//                 >
//                   Bizwaziri
//                 </a>
//               </div>
//               <p className="font-['Inter'] text-xs text-gray-500 dark:text-gray-500 mt-1 italic">
//                 Trusted Discovery for Kenyan Business
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }



import { Link } from 'react-router';
import { getSettings } from '../../utils/storage';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X, ChevronRight } from 'lucide-react';

export function Footer() {
  const [settings, setSettings] = useState(getSettings());
  const [showHelp, setShowHelp] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const handleStorageChange = () => {
      setSettings(getSettings());
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const helpSections = [
    {
      title: 'Getting Started',
      steps: [
        'Browse our menu to discover fresh options',
        'Add items to your cart',
        'Proceed to checkout',
        'Enter delivery details',
        'Confirm your order'
      ]
    },
    {
      title: 'Account Benefits',
      steps: [
        'Save your favorite orders',
        'Track order history',
        'Earn rewards on every order',
        'Get exclusive offers',
        'Faster checkout'
      ]
    },
    {
      title: 'Delivery Information',
      steps: [
        'Free delivery within 5km',
        '30-45 minute estimated time',
        'Real-time order tracking',
        'Contactless delivery available',
        'Pay on delivery or via M-PESA'
      ]
    }
  ];

  return (
    <>
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="inline-block mb-4">
                <h3 className="font-serif text-xl text-gray-900 dark:text-white">
                  {settings.name}
                </h3>
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-md">
                {settings.slogan || 'Fresh ingredients, bold flavors, delivered to your door.'}
              </p>
              <div className="mt-6 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span>{settings.operatingHours}</span>
                <span className="w-1 h-1 bg-gray-300 dark:bg-gray-700 rounded-full" />
                <span>{settings.location?.split(',')[0]}</span>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                Navigation
              </h4>
              <ul className="space-y-2">
                {['Menu', 'Catering', 'Gallery', 'About', 'Contact'].map((item) => (
                  <li key={item}>
                    <Link
                      to={`/${item.toLowerCase()}`}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Help */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                Get in Touch
              </h4>
              <ul className="space-y-2 mb-6">
                <li>
                  <a
                    href={`https://wa.me/${settings.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {settings.whatsappNumber}
                  </a>
                </li>
                <li className="text-sm text-gray-600 dark:text-gray-400">
                  {settings.location}
                </li>
              </ul>
              
              <button
                onClick={() => setShowHelp(true)}
                className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <HelpCircle className="w-4 h-4" />
                Need help?
              </button>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-gray-500">
            <p>
              © {currentYear} {settings.name}. All rights reserved.
            </p>
            <p>
              Powered by{' '}
              <a
                href="https://bizwaziri-clean.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 dark:text-white hover:underline"
              >
                Bizwaziri
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Help Modal */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setShowHelp(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white dark:bg-gray-800 p-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                <h2 className="font-serif text-2xl text-gray-900 dark:text-white">
                  Welcome to {settings.name}
                </h2>
                <button
                  onClick={() => setShowHelp(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-8">
                {/* Welcome Message */}
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    We're here to help you get the most out of your experience. 
                    Whether you're ordering for yourself or planning a catering event, 
                    we've got you covered.
                  </p>
                </div>

                {/* Help Sections */}
                {helpSections.map((section) => (
                  <div key={section.title}>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                      {section.title}
                    </h3>
                    <ul className="space-y-2">
                      {section.steps.map((step, index) => (
                        <li key={index} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                          <span className="w-5 h-5 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                            {index + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {/* Contact Support */}
                <div className="text-center pt-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Still need assistance?
                  </p>
                  <a
                    href={`https://wa.me/${settings.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors text-sm"
                  >
                    Chat with us
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}