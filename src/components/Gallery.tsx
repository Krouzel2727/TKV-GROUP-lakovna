import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import { siteData } from '../config/siteData';

import { getImage } from '../utils/images';

// Fotky a jejich pořadí/popisky se nastavují v siteData.gallerySection.photos
const galleryImages = siteData.gallerySection.photos.map((photo) => ({
  ...getImage(photo.file),
  alt: photo.alt,
}));

const GAP = 24; // mezera mezi fotkami v px (odpovídá třídě gap-6)

const Gallery = () => {
  const t = siteData.gallerySection;
  const [sliderIndex, setSliderIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const [itemWidth, setItemWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Na mobilu 1 fotka přes celou šířku, jinak 3 vedle sebe
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const mobile = window.innerWidth < 768;
        setIsMobile(mobile);
        setItemWidth(mobile ? width : (width - GAP * 2) / 3);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const maxIndex = isMobile ? galleryImages.length - 1 : galleryImages.length - 3;

  const handleNextSlide = useCallback(() => {
    setSliderIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const handlePrevSlide = () => {
    setSliderIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const goToSlide = (idx: number) => {
    setSliderIndex(idx > maxIndex ? maxIndex : idx);
  };

  // Automatické posouvání (pozastaví se při otevřeném náhledu)
  useEffect(() => {
    if (lightboxIndex !== null || itemWidth === 0) return;
    const interval = setInterval(handleNextSlide, 4500);
    return () => clearInterval(interval);
  }, [sliderIndex, lightboxIndex, itemWidth, handleNextSlide]);

  // Zablokování scrollu stránky při otevřeném náhledu
  useEffect(() => {
    document.body.style.overflow = lightboxIndex === null ? 'unset' : 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [lightboxIndex]);

  const lightboxNext = () =>
    setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % galleryImages.length));
  const lightboxPrev = () =>
    setLightboxIndex((prev) => (prev === null ? null : prev === 0 ? galleryImages.length - 1 : prev - 1));

  // Klávesové zkratky v náhledu
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') lightboxNext();
      if (e.key === 'ArrowLeft') lightboxPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  return (
    <section id="reference" className="py-20 bg-bgLight overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-4xl font-bold text-center mb-12 text-primary">{t.title}</h2>

        <div className="flex items-center justify-between gap-4 md:gap-8">
          <button
            onClick={handlePrevSlide}
            className="p-3 md:p-4 bg-white rounded-full shadow-md text-primary hover:bg-primary hover:text-white transition-colors z-10 shrink-0"
            aria-label={t.prevLabel}
          >
            <FaChevronLeft className="text-xl md:text-2xl" />
          </button>

          <div ref={containerRef} className="flex-1 overflow-hidden py-2 relative">
            <motion.div
              className="flex gap-6"
              initial={{ opacity: 0 }}
              animate={{
                x: itemWidth > 0 ? -(itemWidth + GAP) * sliderIndex : 0,
                opacity: itemWidth > 0 ? 1 : 0,
              }}
              transition={{ type: 'tween', duration: 0.5, ease: 'easeInOut' }}
            >
              {galleryImages.map((image, idx) => (
                <div
                  key={idx}
                  onClick={() => setLightboxIndex(idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setLightboxIndex(idx);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`${t.openLabel}: ${image.alt}`}
                  style={{ width: itemWidth > 0 ? itemWidth : '100%' }}
                  className="flex-shrink-0 aspect-square rounded-xl shadow-md cursor-pointer overflow-hidden group bg-gray-200"
                >
                  <img
                    src={image.src}
                    srcSet={image.srcSet}
                    sizes="(min-width: 768px) 360px, 80vw"
                    width={800}
                    height={800}
                    alt={image.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              ))}
            </motion.div>
          </div>

          <button
            onClick={handleNextSlide}
            className="p-3 md:p-4 bg-white rounded-full shadow-md text-primary hover:bg-primary hover:text-white transition-colors z-10 shrink-0"
            aria-label={t.nextLabel}
          >
            <FaChevronRight className="text-xl md:text-2xl" />
          </button>
        </div>

        <div className="flex justify-center flex-wrap gap-2 mt-10 px-4">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              aria-label={`${t.goToLabel} ${idx + 1}`}
              className={`h-2.5 md:h-3 rounded-full transition-all duration-300 ${
                sliderIndex === idx ? 'bg-primary w-8 md:w-10' : 'bg-gray-300 w-2.5 md:w-3 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox – zvětšený náhled */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            onClick={() => setLightboxIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label={galleryImages[lightboxIndex].alt}
          >
            <button
              className="absolute top-4 md:top-8 right-4 md:right-8 text-white/70 hover:text-primary text-4xl transition-colors z-50"
              onClick={() => setLightboxIndex(null)}
              aria-label={t.lightboxClose}
              autoFocus
            >
              <FaTimes />
            </button>

            <div className="absolute top-6 left-6 text-white font-medium bg-black/50 px-4 py-2 rounded-full border border-white/20 z-50 shadow-lg">
              {lightboxIndex + 1} / {galleryImages.length}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                lightboxPrev();
              }}
              aria-label={t.lightboxPrev}
              className="absolute left-2 md:left-8 text-white/70 hover:text-primary text-3xl md:text-5xl bg-black/40 hover:bg-black/60 p-3 md:p-4 rounded-full transition-all z-50 shadow-xl"
            >
              <FaChevronLeft />
            </button>

            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              src={galleryImages[lightboxIndex].large}
              srcSet={galleryImages[lightboxIndex].srcSet}
              sizes="90vw"
              alt={galleryImages[lightboxIndex].alt}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)]"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                lightboxNext();
              }}
              aria-label={t.lightboxNext}
              className="absolute right-2 md:right-8 text-white/70 hover:text-primary text-3xl md:text-5xl bg-black/40 hover:bg-black/60 p-3 md:p-4 rounded-full transition-all z-50 shadow-xl"
            >
              <FaChevronRight />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
