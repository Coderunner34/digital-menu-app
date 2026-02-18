import { useState, useEffect, useRef } from 'react';
import { 
  Upload, X, Heart, Share2, Download, Camera, 
  Image as ImageIcon, ChevronLeft, ChevronRight,
  User, MapPin, MessageSquare, Search
} from 'lucide-react';
import { toast } from 'sonner';
import { getGalleryImages, addGalleryImage, deleteGalleryImage } from '../../utils/storage';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryImage {
  id: string;
  url: string;
  uploadedAt: string;
  likes: number;
  liked: boolean;
  caption: string;
  author: string;
  location: string;
}

interface Comment {
  id: string;
  imageId: string;
  author: string;
  text: string;
  timestamp: string;
}

export function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [commentText, setCommentText] = useState('');
  const [uploadCaption, setUploadCaption] = useState('');
  const [uploadLocation, setUploadLocation] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load images from storage
  useEffect(() => {
    loadImages();
    loadComments();
  }, []);

  const loadImages = () => {
    const storedImages = getGalleryImages();
    
    // Get existing likes from localStorage
    const savedLikes = localStorage.getItem('gallery_likes');
    const likesData = savedLikes ? JSON.parse(savedLikes) : {};
    
    // Get existing image metadata
    const savedMetadata = localStorage.getItem('gallery_metadata');
    const metadataData = savedMetadata ? JSON.parse(savedMetadata) : {};

    const formattedImages: GalleryImage[] = storedImages.map((url, index) => ({
      id: `img-${Date.now()}-${index}`,
      url,
      uploadedAt: metadataData[url]?.uploadedAt || new Date().toISOString(),
      likes: likesData[url] || 0,
      liked: false,
      caption: metadataData[url]?.caption || '',
      author: metadataData[url]?.author || 'Guest',
      location: metadataData[url]?.location || '',
    }));

    setImages(formattedImages);
    setIsLoading(false);
  };

  const loadComments = () => {
    const savedComments = localStorage.getItem('gallery_comments');
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  };

  const saveComments = (newComments: Comment[]) => {
    localStorage.setItem('gallery_comments', JSON.stringify(newComments));
    setComments(newComments);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }

    setUploading(true);

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      
      // Add to storage
      addGalleryImage(result);
      
      // Save metadata
      const savedMetadata = localStorage.getItem('gallery_metadata');
      const metadataData = savedMetadata ? JSON.parse(savedMetadata) : {};
      metadataData[result] = {
        uploadedAt: new Date().toISOString(),
        caption: uploadCaption,
        author: 'You',
        location: uploadLocation
      };
      localStorage.setItem('gallery_metadata', JSON.stringify(metadataData));

      // Add to state
      const newImage: GalleryImage = {
        id: `img-${Date.now()}`,
        url: result,
        uploadedAt: new Date().toISOString(),
        likes: 0,
        liked: false,
        caption: uploadCaption,
        author: 'You',
        location: uploadLocation,
      };
      
      setImages(prev => [newImage, ...prev]);
      
      toast.success('Photo uploaded successfully!');
      
      setUploadCaption('');
      setUploadLocation('');
      setShowUploadModal(false);
      setUploading(false);
    };
    
    reader.readAsDataURL(file);
  };

  const handleDelete = (imageId: string) => {
    if (!window.confirm('Delete this photo?')) return;
    
    const image = images.find(img => img.id === imageId);
    if (!image) return;
    
    deleteGalleryImage(image.url);
    
    // Remove metadata
    const savedMetadata = localStorage.getItem('gallery_metadata');
    if (savedMetadata) {
      const metadataData = JSON.parse(savedMetadata);
      delete metadataData[image.url];
      localStorage.setItem('gallery_metadata', JSON.stringify(metadataData));
    }
    
    // Remove likes
    const savedLikes = localStorage.getItem('gallery_likes');
    if (savedLikes) {
      const likesData = JSON.parse(savedLikes);
      delete likesData[image.url];
      localStorage.setItem('gallery_likes', JSON.stringify(likesData));
    }
    
    // Remove comments for this image
    const updatedComments = comments.filter(c => c.imageId !== imageId);
    saveComments(updatedComments);
    
    setImages(prev => prev.filter(img => img.id !== imageId));
    
    if (selectedImage?.id === imageId) {
      setSelectedImage(null);
    }
    
    toast.success('Photo deleted');
  };

  const handleLike = (imageId: string) => {
    setImages(prev => prev.map(img => {
      if (img.id === imageId) {
        const newLiked = !img.liked;
        const newLikes = newLiked ? img.likes + 1 : img.likes - 1;
        
        // Save to localStorage
        const savedLikes = localStorage.getItem('gallery_likes');
        const likesData = savedLikes ? JSON.parse(savedLikes) : {};
        likesData[img.url] = newLikes;
        localStorage.setItem('gallery_likes', JSON.stringify(likesData));
        
        return {
          ...img,
          liked: newLiked,
          likes: newLikes
        };
      }
      return img;
    }));
  };

  const handleShare = (image: GalleryImage) => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this photo',
        text: image.caption,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleAddComment = (imageId: string) => {
    if (!commentText.trim()) return;
    
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      imageId,
      author: 'You',
      text: commentText,
      timestamp: new Date().toISOString()
    };
    
    const updatedComments = [...comments, newComment];
    saveComments(updatedComments);
    
    setCommentText('');
    toast.success('Comment added');
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return;
    
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    } else {
      newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedImage(images[newIndex]);
  };

  const filteredImages = images.filter(img => 
    img.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
    img.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    img.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const imageComments = (imageId: string) => 
    comments.filter(c => c.imageId === imageId).sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      
      {/* Header */}
      <div className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl mb-4">Gallery</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Share your moments with our community
          </p>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search */}
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search photos..."
                className="w-full pl-9 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>

            {/* Upload Button */}
            <button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              <Upload className="w-4 h-4" />
              Upload Photo
            </button>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {filteredImages.length === 0 ? (
          <div className="text-center py-20">
            <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">
              No photos yet
            </h3>
            <p className="text-gray-500 mb-6">
              {searchQuery ? 'Try a different search' : 'Be the first to share!'}
            </p>
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg text-sm font-medium"
            >
              Upload Photo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="group relative bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <div className="aspect-square">
                  <img
                    src={image.url}
                    alt={image.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                        <User className="w-3 h-3" />
                      </div>
                      <span className="text-sm">{image.author}</span>
                    </div>
                    
                    {image.caption && (
                      <p className="text-sm line-clamp-2 mb-2">{image.caption}</p>
                    )}
                    
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleLike(image.id); }}
                        className="flex items-center gap-1 text-sm"
                      >
                        <Heart className={`w-4 h-4 ${image.liked ? 'fill-red-500 text-red-500' : ''}`} />
                        <span>{image.likes}</span>
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleShare(image); }}
                        className="flex items-center gap-1 text-sm"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={(e) => { e.stopPropagation(); handleDelete(image.id); }}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setShowUploadModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-medium text-gray-900 dark:text-white">Upload Photo</h2>
                <button onClick={() => setShowUploadModal(false)}>
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 mb-4 text-center cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
              >
                {uploading ? (
                  <div className="py-4">
                    <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Uploading...</p>
                  </div>
                ) : (
                  <>
                    <Camera className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                      Click to upload
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  value={uploadCaption}
                  onChange={(e) => setUploadCaption(e.target.value)}
                  placeholder="Add a caption"
                  className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-900 border-0 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
                <input
                  type="text"
                  value={uploadLocation}
                  onChange={(e) => setUploadLocation(e.target.value)}
                  placeholder="Location (optional)"
                  className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-900 border-0 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            {/* Navigation */}
            <button
              onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <button
              onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="max-w-5xl max-h-[80vh] p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.url}
                alt={selectedImage.caption}
                className="w-full h-full object-contain rounded-lg"
              />
            </motion.div>

            {/* Info Panel */}
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 text-white"
            >
              <div className="max-w-4xl mx-auto">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium">{selectedImage.author}</p>
                        <p className="text-sm text-gray-300">
                          {formatDate(selectedImage.uploadedAt)}
                          {selectedImage.location && ` • ${selectedImage.location}`}
                        </p>
                      </div>
                    </div>
                    
                    {selectedImage.caption && (
                      <p className="text-lg mb-4">{selectedImage.caption}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleLike(selectedImage.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <Heart className={`w-5 h-5 ${selectedImage.liked ? 'fill-red-500 text-red-500' : ''}`} />
                      <span>{selectedImage.likes}</span>
                    </button>
                    <button
                      onClick={() => handleShare(selectedImage)}
                      className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Comments */}
                <div className="mt-6 pt-6 border-t border-white/20">
                  <h4 className="font-medium mb-4">
                    Comments ({imageComments(selectedImage.id).length})
                  </h4>

                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddComment(selectedImage.id)}
                      placeholder="Add a comment..."
                      className="flex-1 px-3 py-2 bg-white/10 border-0 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-white/30 text-white placeholder-gray-400"
                    />
                    <button
                      onClick={() => handleAddComment(selectedImage.id)}
                      className="px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                    >
                      Post
                    </button>
                  </div>

                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {imageComments(selectedImage.id).map((comment) => (
                      <div key={comment.id} className="bg-white/5 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{comment.author}</span>
                          <span className="text-xs text-gray-400">
                            {formatDate(comment.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-300">{comment.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}