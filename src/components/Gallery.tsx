import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaTimes, FaExpand } from 'react-icons/fa';
import { siteData } from '../config/siteData';
import { getImage } from '../utils/images';
import { Container, SectionHeader } from './ui';
import { btn } from './buttons';

// Fotky a jejich pořadí/popisky se nastavují v siteData.gallerySection.photos
const galleryImages = siteData.gallerySection.photos.map((photo) => ({
  ...getImage(photo.file),
  alt: photo.alt,
}));

const Gallery = () => {
  const t = siteData.gallerySection;
  const [expanded, setExpanded] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  const visible = expanded ? galleryImages : galleryImages.slice(0, t.initialCount);
  const total = galleryImages.length;

  const open = (index: number, trigger: HTMLElement) => {
    lastTrigger.current = trigger;
    setLightboxIndex(index);
  };
  const close = useCallback(() => {
    setLightboxIndex(null);
    lastTrigger.current?.focus();
  }, []);
  const next = useCallback(() => setLightboxIndex((i) => (i === null ? null : (i + 1) % total)), [total]);
  const prev = useCallback(() => setLightboxIndex((i) => (i === null ? null : (i - 1 + total) % total)), [total]);

  // Zablokování scrollu stránky + ovládání klávesnicí v náhledu
  useEffect(() => {
    if (lightboxIndex === null) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [lightboxIndex, close, next, prev]);

  // Swipe prstem na mobilu
  const onTouchStart = (e: React.TouchEvent) => (touchStartX.current = e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
    touchStartX.current = null;
  };

  return (
    <section id="reference" className="bg-concrete py-20 sm:py-28">
      <Container>
        <SectionHeader index="04" eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

        <ul className="grid grid-flow-dense grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {visible.map((image, idx) => (
            <motion.li
              key={image.src}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: (idx % 4) * 0.05 }}
              className={idx === 0 ? 'col-span-2 row-span-2' : ''}
            >
              <button
                type="button"
                onClick={(e) => open(idx, e.currentTarget)}
                className="group relative block aspect-square w-full overflow-hidden rounded-sm bg-line"
              >
                <span className="sr-only">{t.openLabel}: </span>
                <img
                  src={image.src}
                  srcSet={image.srcSet}
                  sizes={idx === 0 ? '(min-width: 1024px) 600px, (min-width: 768px) 66vw, 100vw' : '(min-width: 1024px) 300px, (min-width: 768px) 33vw, 50vw'}
                  width={800}
                  height={800}
                  alt={image.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span aria-hidden="true" className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/80 via-ink/0 to-transparent p-4 text-left opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="flex w-full items-end justify-between gap-3 text-sm text-white">
                    <span className="line-clamp-2">{image.alt}</span>
                    <FaExpand aria-hidden="true" className="shrink-0 text-primary" />
                  </span>
                </span>
              </button>
            </motion.li>
          ))}
        </ul>

        {total > t.initialCount && (
          <div className="mt-10 flex justify-center">
            <button type="button" onClick={() => setExpanded(!expanded)} className={btn.outlineDark} aria-expanded={expanded}>
              {expanded ? t.showLess : `${t.showAll} (${total})`}
            </button>
          </div>
        )}
      </Container>

      {/* Lightbox – zvětšený náhled */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex flex-col bg-ink/95 backdrop-blur-md"
            onClick={close}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            role="dialog"
            aria-modal="true"
            aria-label={galleryImages[lightboxIndex].alt}
          >
            <div className="flex items-center justify-between p-4 text-white sm:p-6" onClick={(e) => e.stopPropagation()}>
              <span className="font-display text-lg font-semibold tracking-wider" aria-live="polite">
                {String(lightboxIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center text-2xl text-white/80 transition-colors hover:text-primary"
                onClick={close}
                aria-label={t.lightboxClose}
                autoFocus
              >
                <FaTimes />
              </button>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20">
              <motion.img
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                src={galleryImages[lightboxIndex].large}
                srcSet={galleryImages[lightboxIndex].srcSet}
                sizes="90vw"
                alt={galleryImages[lightboxIndex].alt}
                className="max-h-full max-w-full rounded-sm object-contain shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label={t.lightboxPrev}
                className="absolute left-2 hidden h-12 w-12 items-center justify-center rounded-sm bg-white/10 text-xl text-white transition-colors hover:bg-primary hover:text-on-primary sm:left-6 sm:flex"
              >
                <FaChevronLeft />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label={t.lightboxNext}
                className="absolute right-2 hidden h-12 w-12 items-center justify-center rounded-sm bg-white/10 text-xl text-white transition-colors hover:bg-primary hover:text-on-primary sm:right-6 sm:flex"
              >
                <FaChevronRight />
              </button>
            </div>

            <div className="flex items-center justify-between gap-4 p-4 sm:p-6" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={prev}
                aria-label={t.lightboxPrev}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-white/10 text-white sm:hidden"
              >
                <FaChevronLeft />
              </button>
              <p className="flex-1 text-center text-sm text-white/75">{galleryImages[lightboxIndex].alt}</p>
              <button
                type="button"
                onClick={next}
                aria-label={t.lightboxNext}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-white/10 text-white sm:hidden"
              >
                <FaChevronRight />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
