import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { siteData } from '../config/siteData';
import logo from '../assets/logo_remove_BG.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Po odscrollování zesílí stín a zmenší se padding
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Zablokování scrollu stránky při otevřeném mobilním menu
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-lg py-3' : 'bg-white/95 backdrop-blur-sm py-4'
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <a href="/" className="flex-shrink-0 relative z-[60]" onClick={() => setIsOpen(false)}>
            <img
              src={logo}
              alt={siteData.navbar.logoAlt}
              width={781}
              height={196}
              className="h-10 md:h-14 w-auto object-contain transition-all duration-300"
            />
          </a>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex gap-6 font-semibold text-textMain" aria-label={siteData.navbar.navLabel}>
              {siteData.nav.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="inline-block transform hover:scale-110 hover:text-primary transition-all duration-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden text-2xl text-textMain hover:text-primary transition-colors relative z-[60]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={siteData.navbar.menuToggleLabel}
            aria-expanded={isOpen}
            aria-controls="mobilni-menu"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
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
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
              id="mobilni-menu"
              className="fixed top-0 right-0 h-screen w-3/4 max-w-sm bg-white shadow-2xl z-50 flex flex-col md:hidden pt-28 px-8"
            >
              <nav className="flex flex-col gap-6 font-bold text-xl text-textMain" aria-label={siteData.navbar.navLabel}>
                {siteData.nav.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    className="inline-block hover:text-primary transition-colors border-b border-gray-100 pb-4"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>
              <div className="mt-auto pb-10">
                <a
                  href="#formular"
                  onClick={() => setIsOpen(false)}
                  className="block text-center w-full bg-primary text-white font-bold py-4 rounded-lg hover:bg-green-500 transition-colors shadow-lg mb-6"
                >
                  {siteData.navbar.mobileCta}
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
