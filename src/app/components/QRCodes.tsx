import { useState } from 'react';
import { Download, Share2, X, QrCode } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface QRCodeProps {
  url: string;
  restaurantName: string;
}

export function QRCode({ url, restaurantName }: QRCodeProps) {
  const [showQR, setShowQR] = useState(false);
  const [qrSize, setQrSize] = useState(200);

  // Generate QR code URL using a free API
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(url)}`;

  const handleDownload = async () => {
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${restaurantName}-qr-code.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
      toast.success('QR Code downloaded');
    } catch (error) {
      toast.error('Failed to download QR code');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        const response = await fetch(qrUrl);
        const blob = await response.blob();
        const file = new File([blob], `${restaurantName}-qr.png`, { type: 'image/png' });
        
        await navigator.share({
          title: restaurantName,
          text: 'Scan to visit our menu',
          files: [file]
        });
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          toast.error('Share cancelled');
        }
      }
    } else {
      // Fallback - copy link
      navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard');
    }
  };

  return (
    <>
      {/* QR Button - Add this to your footer or wherever you want */}
      <button
        onClick={() => setShowQR(true)}
        className="fixed bottom-6 left-6 z-40 group"
        aria-label="Show QR Code"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-[#FF6B35] rounded-full animate-ping opacity-20" />
          <div className="relative w-12 h-12 bg-gradient-to-r from-[#FF6B35] to-[#FF8C5A] rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center">
            <QrCode className="w-6 h-6 text-white" />
          </div>
        </div>
        <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
          Scan to open menu
        </span>
      </button>

      {/* QR Modal */}
      <AnimatePresence>
        {showQR && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowQR(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C5A] p-4 flex items-center justify-between">
                <h3 className="font-serif text-xl text-white">Scan to Order</h3>
                <button
                  onClick={() => setShowQR(false)}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="p-6">
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Scan this QR code with your phone camera
                  </p>
                  <p className="text-xs text-gray-500">
                    Opens {restaurantName} menu on your device
                  </p>
                </div>

                {/* QR Code Image */}
                <div className="bg-white p-4 rounded-xl shadow-inner mb-6 flex justify-center">
                  <img
                    src={qrUrl}
                    alt={`QR Code for ${restaurantName}`}
                    className="w-48 h-48"
                    onError={(e) => {
                      e.currentTarget.src = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=error';
                    }}
                  />
                </div>

                {/* Size Selector */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    QR Code Size
                  </label>
                  <div className="flex gap-2">
                    {[150, 200, 250].map(size => (
                      <button
                        key={size}
                        onClick={() => setQrSize(size)}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                          qrSize === size
                            ? 'bg-[#FF6B35] text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {size}px
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleDownload}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#FF6B35] hover:bg-[#E55A2B] text-white rounded-lg font-medium transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>

                <p className="text-xs text-center text-gray-500 mt-4">
                  Or visit: <span className="font-mono">{url}</span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}