import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { siteData } from '../config/siteData';
import { fadeInLeft } from '../utils/animations';
import { getImage } from '../utils/images';

// Fotky, které se střídají na pozadí úvodní sekce (nastavení v siteData.hero.images)
const heroImages = siteData.hero.images.map((name) => getImage(name));

const Hero = () => {
  const [current, setCurrent] = useState(0);
  // Další fotky se načtou až po načtení stránky – první fotka má přednost (rychlejší zobrazení)
  const [restReady, setRestReady] = useState(false);

  useEffect(() => {
    const onLoad = () => setRestReady(true);
    if (document.readyState === 'complete') {
      const timeout = setTimeout(onLoad, 0);
      return () => clearTimeout(timeout);
    }
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  useEffect(() => {
    if (!restReady) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [restReady]);

  return (
    <section className="relative h-screen flex items-center justify-start bg-dark overflow-hidden pt-20">
      {heroImages.map((img, index) =>
        index === 0 || restReady ? (
          <img
            key={index}
            src={img.src}
            srcSet={img.srcSet}
            sizes="100vw"
            alt=""
            aria-hidden="true"
            decoding="async"
            fetchPriority={index === 0 ? 'high' : 'low'}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
              index === current ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : null,
      )}
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 container mx-auto px-4 text-left">
        <div className="max-w-3xl">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeInLeft}
            className="font-bold text-primary mb-6 drop-shadow-lg"
          >
            <span className="block text-sm md:text-base font-semibold uppercase tracking-[0.2em] text-white/80 mb-3">
              {siteData.hero.eyebrow}
            </span>
            <span className="block text-5xl md:text-6xl lg:text-7xl">{siteData.hero.title}</span>
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeInLeft}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white leading-relaxed drop-shadow-md"
          >
            {siteData.hero.subtitle}
          </motion.p>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInLeft}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4 mt-10"
          >
            <a
              href="#formular"
              className="inline-block bg-primary text-white font-semibold py-3 px-8 rounded-md border-2 border-primary hover:bg-white hover:text-primary transition-all duration-300 shadow-lg"
            >
              {siteData.hero.btnPrimary}
            </a>
            <a
              href="#kontakt"
              className="inline-block bg-transparent text-white font-semibold py-3 px-8 rounded-md border-2 border-white hover:bg-white hover:text-dark transition-all duration-300"
            >
              {siteData.hero.btnSecondary}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
