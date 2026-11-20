import { useEffect, useState } from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import { siteData } from '../config/siteData';

// Plovoucí tlačítko „Zavolat“ na mobilu – objeví se po odscrollování z úvodní sekce, v sekci Kontakt se skryje
const FloatingCall = () => {
  const [visible, setVisible] = useState(false);
  const phone = siteData.contacts.roman.phone;

  useEffect(() => {
    // Skryje se v sekci Kontakt, kde jsou telefony i formulář (aby nepřekrývalo obsah)
    const onScroll = () => {
      const contact = document.getElementById('kontakt')?.getBoundingClientRect();
      const inContact = !!contact && contact.top < window.innerHeight * 0.6 && contact.bottom > 0;
      setVisible(window.scrollY > window.innerHeight * 0.8 && !inContact);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      href={`tel:${phone.replace(/\s+/g, '')}`}
      aria-label={`${siteData.floatingCall.label}: ${phone}`}
      tabIndex={visible ? undefined : -1}
      aria-hidden={visible ? undefined : true}
      className={`fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-primary px-5 py-3.5 font-semibold text-on-primary shadow-[0_12px_30px_-8px_rgb(0_0_0/0.45)] transition-all duration-300 md:hidden ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
    >
      <FaPhoneAlt aria-hidden="true" />
      {siteData.floatingCall.label}
    </a>
  );
};

export default FloatingCall;
