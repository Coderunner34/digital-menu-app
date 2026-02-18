import { X, Clock, MessageCircle } from 'lucide-react';
import { useEffect } from 'react';

interface ItemDetailModalProps {
  item: {
    name: string;
    description: string;
    price: number;
    image: string;
    prepTime?: string;
    dietary?: string[];
    labels?: string[];
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ItemDetailModal({ item, isOpen, onClose }: ItemDetailModalProps) {
  const whatsappNumber = "254XXXXXXXXX";

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !item) return null;

  const orderOnWhatsApp = () => {
    const message = encodeURIComponent(
      `Hello! I'd like to order from Mobile Kitchen:\n\nItem: ${item.name}\nQuantity: 1\nPrice: KES ${item.price}\n\nDelivery/Pickup: [Please specify]\nLocation: [Please provide]\n\nPlease confirm availability.`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-0 md:p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-[#2A2A2A] w-full md:max-w-2xl md:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        style={{ 
          animation: 'slideUp 0.3s ease-out',
        }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-[#2A2A2A] p-4 flex justify-end border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Image */}
        <div className="w-full aspect-[4/3] relative">
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Name */}
          <h2 className="font-['Poppins'] font-bold text-2xl md:text-3xl text-[#212121] dark:text-[#F5F5F5]">
            {item.name}
          </h2>

          {/* Labels */}
          {item.labels && item.labels.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {item.labels.map((label) => (
                <span 
                  key={label}
                  className="bg-[#FF6B35] text-white text-xs px-3 py-1 rounded-full font-['Inter'] font-semibold"
                >
                  {label}
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          <p className="font-['Inter'] text-base text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
            {item.description}
          </p>

          {/* Info */}
          <div className="mt-6 space-y-2">
            {item.prepTime && (
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Clock className="w-5 h-5" />
                <span className="font-['Inter'] text-sm">
                  Prep Time: {item.prepTime}
                </span>
              </div>
            )}
            {item.dietary && item.dietary.length > 0 && (
              <div className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                <span className="font-['Inter'] text-sm font-semibold">Dietary:</span>
                <span className="font-['Inter'] text-sm">
                  {item.dietary.join(', ')}
                </span>
              </div>
            )}
          </div>

          {/* Price & CTA */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <span className="font-['Poppins'] font-bold text-3xl text-[#FF6B35]">
                KES {item.price}
              </span>
            </div>
            <button
              onClick={orderOnWhatsApp}
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-4 rounded-xl hover:bg-[#20BA5A] transition-colors font-['Poppins'] font-semibold text-lg"
            >
              <MessageCircle className="w-6 h-6" />
              Order on WhatsApp
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
