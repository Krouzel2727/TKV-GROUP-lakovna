import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaTimes, FaExpand } from 'react-icons/fa';
import { siteData } from '../config/siteData';
import { getImage } from '../utils/images';
import { Container, SectionHeader } from './ui';

// Fotky a jejich pořadí/popisky se nastavují v siteData.gallerySection.photos
const galleryImages = siteData.gallerySection.photos.map((photo) => ({
  ...getImage(photo.file),
  alt: photo.alt,
}));
const total = galleryImages.length;
const pad = (n: number) => String(n).padStart(2, '0');
const nextIndex = (i: number | null) => (i === null ? null : (i + 1) % total);
const prevIndex = (i: number | null) => (i === null ? null : (i - 1 + total) % total);

// Šířka jednoho kroku posunu pásu (fotka + mezera)
const getStep = (track: HTMLElement | null) => {
  const first = track?.firstElementChild as HTMLElement | null;
  if (!track || !first) return 0;
  return first.offsetWidth + parseFloat(getComputedStyle(track).columnGap || '0');
};

const arrowCls =
  'flex h-12 w-12 items-center justify-center rounded-sm border border-ink/20 text-ink transition-colors hover:border-primary hover:bg-primary disabled:pointer-events-none disabled:opacity-30';

const Gallery = () => {
  const t = siteData.gallerySection;
  const trackRef = useRef<HTMLUListElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ index: 0, visible: 1, atStart: true, atEnd: false });
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  const updatePosition = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const s = getStep(track) || 1;
    setPosition({
      index: Math.round(track.scrollLeft / s),
      visible: Math.max(1, Math.round(track.clientWidth / s)),
      atStart: track.scrollLeft < 4,
      atEnd: track.scrollLeft + track.clientWidth >= track.scrollWidth - 4,
    });
  }, []);

  const scrollByItems = (n: number) => trackRef.current?.scrollBy({ left: n * getStep(trackRef.current), behavior: 'smooth' });

  // Sledování posunu pásu (šipky, swipe, kolečko myši)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      if (!frame)
        frame = requestAnimationFrame(() => {
          frame = 0;
          updatePosition();
        });
    };
    onScroll();
    track.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [updatePosition]);

  // Automatický posun jen když je galerie vidět
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!t.autoplayMs || reduced || paused || !inView || lightboxIndex !== null) return;
    const timer = setInterval(() => {
      const track = trackRef.current;
      if (!track) return;
      if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 4) track.scrollTo({ left: 0, behavior: 'smooth' });
      else track.scrollBy({ left: getStep(track), behavior: 'smooth' });
    }, t.autoplayMs);
    return () => clearInterval(timer);
  }, [t.autoplayMs, paused, inView, lightboxIndex]);

  // --- Lightbox ---
  const open = (index: number, trigger: HTMLElement) => {
    lastTrigger.current = trigger;
    setLightboxIndex(index);
  };
  const close = () => {
    setLightboxIndex(null);
    lastTrigger.current?.focus();
  };
  const next = () => setLightboxIndex(nextIndex);
  const prev = () => setLightboxIndex(prevIndex);

  // Zablokování scrollu stránky + ovládání klávesnicí v náhledu
  const isOpen = lightboxIndex !== null;
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
        lastTrigger.current?.focus();
      }
      if (e.key === 'ArrowRight') setLightboxIndex(nextIndex);
      if (e.key === 'ArrowLeft') setLightboxIndex(prevIndex);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  const onTouchStart = (e: React.TouchEvent) => (touchStartX.current = e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
    touchStartX.current = null;
  };

  const shownTo = Math.min(total, position.index + position.visible);
  const progress = (shownTo / total) * 100;

  return (
    <section ref={sectionRef} id="reference" className="bg-blueprint-light overflow-hidden bg-concrete py-20 sm:py-28">
      <Container>
        <div className="flex items-end justify-between gap-6">
          <SectionHeader index="04" title={t.title} />
          <div className="mb-12 hidden gap-2 sm:flex">
            <button type="button" onClick={() => scrollByItems(-1)} disabled={position.atStart} aria-label={t.prevLabel} className={arrowCls}>
              <FaChevronLeft />
            </button>
            <button type="button" onClick={() => scrollByItems(1)} disabled={position.atEnd} aria-label={t.nextLabel} className={arrowCls}>
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Posuvný pás fotek – swipe, šipky, kolečko myši; automaticky se posouvá */}
        <ul
          ref={trackRef}
          className="scrollbar-none -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 sm:mx-0 sm:scroll-px-0 sm:px-0"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
        >
          {galleryImages.map((image, idx) => (
            <li key={image.src} className="w-[85%] shrink-0 snap-start sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]">
              <button
                type="button"
                onClick={(e) => open(idx, e.currentTarget)}
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-sm bg-silver/30"
              >
                <span className="sr-only">{t.openLabel}: </span>
                <img
                  src={image.src}
                  srcSet={image.srcSet}
                  sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 85vw"
                  width={800}
                  height={600}
                  alt={image.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-ink/85 to-transparent p-4 pt-12 text-left text-sm text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  <span className="line-clamp-2">{image.alt}</span>
                  <FaExpand className="shrink-0 text-primary" />
                </span>
              </button>
            </li>
          ))}
        </ul>

        {/* Ukazatel postupu */}
        <div className="mt-8 flex items-center gap-5">
          <span className="font-display text-lg font-bold tabular-nums text-ink" aria-live="polite">
            {pad(shownTo)} <span className="text-body">/ {pad(total)}</span>
          </span>
          <div className="h-0.5 flex-1 bg-silver/40">
            <div className="h-full bg-primary transition-[width] duration-500" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex gap-2 sm:hidden">
            <button type="button" onClick={() => scrollByItems(-1)} disabled={position.atStart} aria-label={t.prevLabel} className={arrowCls}>
              <FaChevronLeft />
            </button>
            <button type="button" onClick={() => scrollByItems(1)} disabled={position.atEnd} aria-label={t.nextLabel} className={arrowCls}>
              <FaChevronRight />
            </button>
          </div>
        </div>
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
                {pad(lightboxIndex + 1)} / {pad(total)}
              </span>
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center text-2xl text-silver transition-colors hover:text-primary"
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
                className="absolute left-2 hidden h-12 w-12 items-center justify-center rounded-sm bg-steel text-xl text-white transition-colors hover:bg-primary hover:text-on-primary sm:left-6 sm:flex"
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
                className="absolute right-2 hidden h-12 w-12 items-center justify-center rounded-sm bg-steel text-xl text-white transition-colors hover:bg-primary hover:text-on-primary sm:right-6 sm:flex"
              >
                <FaChevronRight />
              </button>
            </div>

            <div className="flex items-center justify-between gap-4 p-4 sm:p-6" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={prev}
                aria-label={t.lightboxPrev}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-steel text-white sm:hidden"
              >
                <FaChevronLeft />
              </button>
              <p className="flex-1 text-center text-sm text-silver">{galleryImages[lightboxIndex].alt}</p>
              <button
                type="button"
                onClick={next}
                aria-label={t.lightboxNext}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-steel text-white sm:hidden"
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
