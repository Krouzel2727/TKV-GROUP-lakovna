import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaPhoneAlt, FaClock } from 'react-icons/fa';
import { siteData } from '../config/siteData';
import { Container } from './ui';
import { btn } from './buttons';
import logo from '../assets/logo_remove_BG.png';

const phone = siteData.contacts.roman.phone;
const tel = `tel:${phone.replace(/\s+/g, '')}`;

// Sleduje, která sekce je právě na obrazovce (zvýraznění v menu).
// Aktivní je poslední sekce, jejíž začátek už přejel 40 % výšky okna; nahoře (hero) není aktivní nic.
const useActiveSection = (ids: string[]) => {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.4;
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= line && rect.bottom > line) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids]);
  return active;
};

const sectionIds = siteData.nav.map((link) => link.href.replace('#', ''));

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Zablokování scrollu stránky a zavření klávesou Esc při otevřeném mobilním menu
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false);
    if (isOpen) window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        {/* Horní lišta: divize skupiny + rychlý kontakt (jen na počítači) */}
        <div
          className={`hidden overflow-hidden bg-ink text-sm text-silver transition-[height] duration-300 lg:block ${
            scrolled ? 'h-0' : 'h-10'
          }`}
        >
          <Container className="flex h-10 items-center justify-between">
            <nav aria-label={siteData.divisionsLabel} className="flex items-center gap-1">
              <span className="mr-2 font-display font-bold uppercase tracking-[0.18em] text-silver">
                {siteData.groupName}
              </span>
              {siteData.divisions.map((d) => {
                const current = d.brand === siteData.brand;
                return (
                  <a
                    key={d.brand}
                    href={d.url}
                    aria-current={current ? 'page' : undefined}
                    className={`flex items-center gap-2 rounded-sm px-3 py-1 transition-colors ${
                      current ? 'bg-steel text-white' : 'hover:text-white'
                    }`}
                  >
                    <span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary" />
                    {d.name}
                  </a>
                );
              })}
            </nav>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <FaClock aria-hidden="true" className="text-primary" />
                {siteData.contacts.hala1.open}
              </span>
              <a href={tel} className="flex items-center gap-2 font-semibold text-white hover:text-primary">
                <FaPhoneAlt aria-hidden="true" className="text-primary" />
                <span className="sr-only">{siteData.topBar.phoneLabel}: </span>
                {phone}
              </a>
            </div>
          </Container>
        </div>

        {/* Hlavní navigace */}
        <div
          className={`border-b transition-all duration-300 ${
            scrolled ? 'border-line bg-white/95 shadow-[0_8px_30px_-12px_rgb(0_0_0/0.25)] backdrop-blur' : 'border-transparent bg-white'
          }`}
        >
          <Container className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-16' : 'h-20'}`}>
            <a href="/" aria-label={siteData.navbar.homeLabel} className="relative z-[60] shrink-0" onClick={() => setIsOpen(false)}>
              <img
                src={logo}
                alt={siteData.navbar.logoAlt}
                width={992}
                height={196}
                className={`w-auto transition-all duration-300 ${scrolled ? 'h-8 md:h-9' : 'h-9 md:h-11'}`}
              />
            </a>

            <div className="hidden items-center gap-8 md:flex">
              <nav aria-label={siteData.navbar.navLabel} className="flex items-center gap-1">
                {siteData.nav.map((link) => {
                  const isActive = active === link.href.slice(1);
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      aria-current={isActive ? 'location' : undefined}
                      className={`relative px-3 py-2 font-medium transition-colors after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:origin-left after:bg-primary after:transition-transform ${
                        isActive ? 'text-ink after:scale-x-100' : 'text-body after:scale-x-0 hover:text-ink hover:after:scale-x-100'
                      }`}
                    >
                      {link.label}
                    </a>
                  );
                })}
              </nav>
              <a href="#formular" className={`${btn.primary} hidden !px-5 !py-2.5 text-sm lg:inline-flex`}>
                {siteData.navbar.mobileCta}
              </a>
            </div>

            <button
              className="relative z-[60] -mr-2 flex h-11 w-11 items-center justify-center text-2xl text-ink md:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={siteData.navbar.menuToggleLabel}
              aria-expanded={isOpen}
              aria-controls="mobilni-menu"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </Container>
        </div>
      </header>

      {/* Mobilní menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-ink/60 backdrop-blur-sm md:hidden"
            />
            <motion.div
              id="mobilni-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
              className="fixed right-0 top-0 z-50 flex h-[100dvh] w-[85%] max-w-sm flex-col bg-white px-6 pb-8 pt-24 shadow-2xl md:hidden"
            >
              <nav aria-label={siteData.navbar.navLabel} className="flex flex-col">
                {siteData.nav.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + index * 0.06 }}
                    className="flex items-center justify-between border-b border-line py-4 font-display text-2xl font-bold uppercase text-ink"
                  >
                    {link.label}
                    <span aria-hidden="true" className="text-primary">
                      →
                    </span>
                  </motion.a>
                ))}
              </nav>

              <div className="mt-auto space-y-3">
                <a href={tel} className={`${btn.outlineDark} w-full`}>
                  <FaPhoneAlt aria-hidden="true" /> {phone}
                </a>
                <a href="#formular" onClick={() => setIsOpen(false)} className={`${btn.primary} w-full`}>
                  {siteData.navbar.mobileCta}
                </a>
                <div className="flex flex-wrap gap-2 pt-3 text-sm">
                  {siteData.divisions.map((d) => (
                    <a
                      key={d.brand}
                      href={d.url}
                      className="flex items-center gap-2 rounded-sm border border-line px-3 py-1.5 text-body"
                    >
                      <span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary" />
                      {d.name}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
