import { Plus } from 'lucide-react';

interface MenuItemProps {
  name: string;
  description: string;
  price: number;
  image: string;
  labels?: string[];
  viewMode?: 'grid' | 'list';
  onClick?: () => void;
}

export function MenuItem({ 
  name, 
  description, 
  price, 
  image, 
  labels = [], 
  viewMode = 'grid',
  onClick 
}: MenuItemProps) {
  const whatsappNumber = "254775269628";

  const orderOnWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message = encodeURIComponent(
      `Hello! I'd like to order from Mobile Kitchen:\n\nItem: ${name}\nQuantity: 1\nPrice: KES ${price}\n\nDelivery/Pickup: [Please specify]\nLocation: [Please provide]\n\nPlease confirm availability.`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const getBadgeColor = (label: string) => {
    const colors: Record<string, string> = {
      'Spicy': 'bg-red-500',
      'Vegetarian': 'bg-green-500',
      'Halal': 'bg-teal-500',
      'Popular': 'bg-[#FF6B35]',
      'Combo': 'bg-purple-500'
    };
    return colors[label] || 'bg-gray-500';
  };

  if (viewMode === 'list') {
    return (
      <div 
        onClick={onClick}
        className="flex gap-4 bg-white dark:bg-[#2A2A2A] rounded-xl p-4 shadow-[0px_2px_8px_rgba(0,0,0,0.08)] dark:shadow-[0px_2px_8px_rgba(0,0,0,0.3)] hover:shadow-[0px_4px_12px_rgba(255,107,53,0.2)] transition-all duration-300 cursor-pointer"
      >
        <div className="relative w-24 h-24 flex-shrink-0">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover rounded-lg"
            loading="lazy"
          />
          {labels.length > 0 && (
            <div className="absolute top-1 right-1 flex flex-col gap-1">
              {labels.map((label) => (
                <span 
                  key={label}
                  className={`${getBadgeColor(label)} text-white text-[10px] px-2 py-0.5 rounded-full font-['Inter'] font-semibold`}
                >
                  {label}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-['Poppins'] font-semibold text-lg text-[#212121] dark:text-[#F5F5F5]">
              {name}
            </h3>
            <p className="font-['Inter'] text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">
              {description}
            </p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="font-['Poppins'] font-bold text-lg text-[#FF6B35]">
              KES {price}
            </span>
            <button
              onClick={orderOnWhatsApp}
              className="flex items-center gap-2 bg-[#FF6B35] text-white px-4 py-2 rounded-lg hover:bg-[#E55A2B] transition-colors font-['Poppins'] font-semibold text-sm"
            >
              Order <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={onClick}
      className="bg-white dark:bg-[#2A2A2A] rounded-xl overflow-hidden shadow-[0px_2px_8px_rgba(0,0,0,0.08)] dark:shadow-[0px_2px_8px_rgba(0,0,0,0.3)] hover:shadow-[0px_4px_12px_rgba(255,107,53,0.2)] transition-all duration-300 cursor-pointer"
    >
      <div className="relative aspect-square">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {labels.length > 0 && (
          <div className="absolute top-2 right-2 flex flex-col gap-1">
            {labels.map((label) => (
              <span 
                key={label}
                className={`${getBadgeColor(label)} text-white text-[10px] px-2 py-1 rounded-full font-['Inter'] font-semibold`}
              >
                {label}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-['Poppins'] font-semibold text-lg text-[#212121] dark:text-[#F5F5F5]">
          {name}
        </h3>
        <div className="flex items-center justify-between mt-3">
          <span className="font-['Poppins'] font-bold text-lg text-[#FF6B35]">
            KES {price}
          </span>
          <button
            onClick={orderOnWhatsApp}
            className="bg-[#FF6B35] text-white p-2 rounded-full hover:bg-[#E55A2B] transition-colors"
            aria-label="Add to order"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
