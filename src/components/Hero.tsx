import { useEffect, useState } from 'react';
import { siteData } from '../config/siteData';
import { getImage } from '../utils/images';
import { Container } from './ui';
import { btn } from './buttons';

// Fotky, které se střídají na pozadí úvodní sekce (nastavení v siteData.hero.images)
const heroImages = siteData.hero.images.map((name) => getImage(name));
const INTERVAL = 6000;

const Hero = () => {
  const { hero } = siteData;
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
    const timeout = setTimeout(() => setCurrent((prev) => (prev + 1) % heroImages.length), INTERVAL);
    return () => clearTimeout(timeout);
  }, [restReady, current]);

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-graphite pt-20 lg:pt-[7.5rem]">
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
            className={`absolute inset-0 h-full w-full scale-105 object-cover transition-[opacity,transform] duration-[1500ms] ease-out ${
              index === current ? 'scale-100 opacity-100' : 'opacity-0'
            }`}
          />
        ) : null,
      )}
      {/* Tmavý přechod zleva – text je čitelný a fotka zůstává vidět */}
      <div className="absolute inset-0 bg-gradient-to-r from-graphite via-graphite/85 to-graphite/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-graphite via-transparent to-transparent" />
      <div className="bg-blueprint absolute inset-0 opacity-60" />

      <Container className="relative z-10 flex flex-1 flex-col justify-center py-16">
        <div className="max-w-3xl">
          {/* Animace úvodního textu je čistě v CSS – text se zobrazí hned, bez čekání na JavaScript (rychlejší LCP) */}
          <h1 className="animate-rise-in text-white">
            <span className="flex items-center gap-3 font-display text-sm font-semibold uppercase tracking-[0.22em] text-primary sm:text-base">
              <span aria-hidden="true" className="h-0.5 w-10 bg-primary" />
              {hero.eyebrow}
            </span>
            <span className="mt-5 block font-display text-6xl font-bold uppercase leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl">
              {hero.title}
            </span>
          </h1>
          <p className="animate-rise-in mt-6 max-w-2xl text-lg leading-relaxed text-white/80 [animation-delay:120ms] sm:text-xl">
            {hero.subtitle}
          </p>
          <div className="animate-rise-in mt-10 flex flex-wrap gap-3 [animation-delay:240ms]">
            <a href="#formular" className={btn.primary}>
              {hero.btnPrimary} <span aria-hidden="true">→</span>
            </a>
            <a href="#kontakt" className={btn.outlineLight}>
              {hero.btnSecondary}
            </a>
          </div>
        </div>
      </Container>

      {/* Klíčová fakta + přepínání fotek */}
      <Container className="relative z-10 pb-8">
        <div className="animate-rise-in [animation-delay:360ms]">
          <dl className="grid grid-cols-2 border-t border-white/15 sm:grid-cols-4">
            {hero.facts.map((fact, i) => (
              <div
                key={fact.label}
                className={`flex flex-col-reverse justify-end border-white/15 py-5 pr-4 sm:border-t-0 sm:pl-6 ${
                  i % 2 === 1 ? 'border-l pl-4' : ''
                } ${i > 1 ? 'border-t' : ''} ${i === 0 ? 'sm:pl-0' : 'sm:border-l'}`}
              >
                <dt className="mt-1 text-sm text-white/65">{fact.label}</dt>
                <dd className="font-display text-3xl font-bold text-white sm:text-4xl">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-2 flex justify-end gap-1">
            {heroImages.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                aria-label={`${hero.slideLabel} ${i + 1}`}
                aria-current={i === current ? 'true' : undefined}
                className="group flex h-6 w-10 items-center"
              >
                <span
                  className={`h-0.5 w-full transition-colors ${i === current ? 'bg-primary' : 'bg-white/30 group-hover:bg-white/60'}`}
                />
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
