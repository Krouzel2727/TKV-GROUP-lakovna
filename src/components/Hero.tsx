import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { siteData } from '../config/siteData';
import { fadeInLeft } from '../utils/animations';
import heroImg1 from '../assets/gallery/IMG_16.webp';
import heroImg2 from '../assets/gallery/IMG_14.webp';
import heroImg3 from '../assets/gallery/IMG_19.webp';

// Fotky, které se střídají na pozadí úvodní sekce
const heroImages = [heroImg1, heroImg2, heroImg3];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-start bg-dark overflow-hidden pt-20">
      {heroImages.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 container mx-auto px-4 text-left">
        <div className="max-w-3xl">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeInLeft}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary mb-6 drop-shadow-lg"
          >
            {siteData.hero.title}
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
