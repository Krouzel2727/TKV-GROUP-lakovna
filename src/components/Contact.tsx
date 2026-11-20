import { lazy, Suspense, useEffect, useRef, useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import type HCaptchaType from '@hcaptcha/react-hcaptcha';
import { FaPhoneAlt, FaEnvelope, FaClock, FaMapMarkerAlt, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { siteData } from '../config/siteData';
import { fadeInUp } from '../utils/animations';
import { Container, SectionHeader } from './ui';
import { btn, card } from './buttons';

// Klíče jsou v souboru .env (viz .env.example)
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? '';
const HCAPTCHA_SITE_KEY = import.meta.env.VITE_HCAPTCHA_SITE_KEY ?? '';

// hCaptcha (cca 100 kB + skripty třetí strany) se načte až ve chvíli, kdy se návštěvník blíží k formuláři
const HCaptcha = lazy(() => import('@hcaptcha/react-hcaptcha'));

const inputClass =
  'w-full rounded-sm border border-line bg-white px-4 py-3 text-ink placeholder:text-silver transition-colors focus:border-ink focus:outline-none focus:ring-2 focus:ring-primary/40';
const labelClass = 'mb-2 block text-sm font-semibold text-ink';

type Status = { kind: 'idle' | 'sending' | 'success' | 'error'; message: string };

const Contact = () => {
  const { contactSection: cs, contacts, GDPR } = siteData;
  const st = cs.status;

  const [status, setStatus] = useState<Status>({ kind: 'idle', message: '' });
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const captchaRef = useRef<HCaptchaType>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const formWrapRef = useRef<HTMLDivElement>(null);
  const [loadCaptcha, setLoadCaptcha] = useState(false);

  useEffect(() => {
    const el = formWrapRef.current;
    if (!el || loadCaptcha) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) setLoadCaptcha(true);
      },
      { rootMargin: '600px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loadCaptcha]);

  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contacts.hala1.adres)}`;

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!captchaToken) {
      setStatus({ kind: 'error', message: st.captchaMissing });
      return;
    }
    setStatus({ kind: 'sending', message: st.sending });

    const formData = new FormData(event.currentTarget);
    formData.delete('g-recaptcha-response');
    formData.set('h-captcha-response', captchaToken);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });
      const text = await response.text();

      let data: { success?: boolean; message?: string };
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error('Selhalo parsování JSONu:', err);
        setStatus({ kind: 'error', message: st.parseError });
        return;
      }

      if (data.success) {
        setStatus({ kind: 'success', message: st.success });
        formRef.current?.reset();
        setCaptchaToken(null);
        captchaRef.current?.resetCaptcha();
      } else {
        setStatus({ kind: 'error', message: `${st.errorPrefix}${data.message || st.unknownError}` });
      }
    } catch (err) {
      console.error('Chyba připojení:', err);
      setStatus({ kind: 'error', message: `${st.connectionErrorPrefix}${err instanceof Error ? err.message : String(err)}` });
    }
  };

  const people = [contacts.roman, contacts.jakub];
  const linkCls = 'decoration-primary decoration-2 underline-offset-4 hover:underline';

  return (
    <section id="kontakt" className="bg-concrete py-20 sm:py-28">
      <Container>
        {/* Nadpis vlevo, telefony na Romana a Kubu vpravo */}
        <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <SectionHeader title={cs.title} />
          <motion.ul
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="mb-10 grid gap-6 sm:grid-cols-2 lg:mb-12 lg:flex lg:gap-0 lg:divide-x lg:divide-silver/50"
          >
            {people.map((person) => (
              <li key={person.name} className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-body">{person.name}</p>
                <a
                  href={`tel:${person.phone.replace(/\s+/g, '')}`}
                  className={`mt-1 flex items-center gap-2.5 font-display text-3xl font-bold text-ink ${linkCls}`}
                >
                  <FaPhoneAlt aria-hidden="true" className="text-lg text-primary" />
                  {person.phone}
                </a>
                <a href={`mailto:${person.email}`} className={`mt-1 inline-flex items-center gap-2 break-all text-sm text-body hover:text-ink ${linkCls}`}>
                  <FaEnvelope aria-hidden="true" className="shrink-0 text-primary" />
                  {person.email}
                </a>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Mapa s údaji o provozovně vedle formuláře */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className={`${card.light} grid overflow-hidden lg:grid-cols-2`}
        >
          <div className="relative flex flex-col bg-concrete">
            <iframe
              src={contacts.mapUrl}
              width="100%"
              height="100%"
              className="h-80 w-full lg:absolute lg:inset-0 lg:h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={cs.mapTitle}
            />
            {/* Karta provozovny – na počítači vpravo nahoře na mapě (nezakrývá logo a podmínky Googlu), na mobilu pod mapou */}
            <div className="relative border-t border-line bg-white p-6 lg:absolute lg:right-5 lg:top-5 lg:max-w-xs lg:rounded-sm lg:border lg:border-t-[3px] lg:border-t-primary lg:shadow-[0_20px_40px_-20px_rgb(36_34_34/0.45)]">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-body">{contacts.hala1.name}</h3>
              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                title={cs.navigateTitle}
                className={`mt-2 flex items-start gap-2.5 font-display text-xl font-bold uppercase tracking-tight text-ink ${linkCls}`}
              >
                <FaMapMarkerAlt aria-hidden="true" className="mt-1 shrink-0 text-base text-primary" />
                {contacts.hala1.adres}
              </a>
              <p className="mt-2 flex items-center gap-2.5 text-ink">
                <FaClock aria-hidden="true" className="shrink-0 text-primary" />
                {contacts.hala1.open}
              </p>
              <p className="mt-2 text-sm text-body">
                {cs.icoLabel} {contacts.hala1.ico}
                <span aria-hidden="true" className="mx-2 text-silver">
                  |
                </span>
                {cs.dicLabel} {contacts.hala1.dico}
              </p>
              <a href={mapsLink} target="_blank" rel="noopener noreferrer" className={`mt-4 inline-block text-sm font-semibold text-ink ${linkCls}`}>
                {cs.navigateTitle} <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <div id="formular" ref={formWrapRef} className="scroll-mt-28 p-6 sm:p-10">
            <h3 className="font-display text-3xl font-bold uppercase tracking-tight">{cs.formTitle}</h3>
            <form ref={formRef} onSubmit={onSubmit} onFocus={() => setLoadCaptcha(true)} className="mt-8 space-y-5">
              <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="f-name" className={labelClass}>
                    {cs.labels.name}{' '}
                    <span aria-hidden="true" className="text-body">
                      *
                    </span>
                  </label>
                  <input
                    id="f-name"
                    type="text"
                    name="name"
                    autoComplete="name"
                    required
                    className={inputClass}
                    placeholder={cs.placeholders.name}
                  />
                </div>
                <div>
                  <label htmlFor="f-phone" className={labelClass}>
                    {cs.labels.phone}
                  </label>
                  <input
                    id="f-phone"
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    className={inputClass}
                    placeholder={cs.placeholders.phone}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="f-email" className={labelClass}>
                  {cs.labels.email}{' '}
                  <span aria-hidden="true" className="text-body">
                    *
                  </span>
                </label>
                <input
                  id="f-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  className={inputClass}
                  placeholder={cs.placeholders.email}
                />
              </div>

              <div>
                <label htmlFor="f-message" className={labelClass}>
                  {cs.labels.message}{' '}
                  <span aria-hidden="true" className="text-body">
                    *
                  </span>
                </label>
                <textarea
                  id="f-message"
                  name="message"
                  rows={5}
                  required
                  className={`${inputClass} resize-y`}
                  placeholder={cs.placeholders.message}
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  id="gdpr"
                  name="gdpr"
                  type="checkbox"
                  required
                  className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded-sm border-line accent-primary"
                />
                <label htmlFor="gdpr" className="cursor-pointer text-sm font-medium leading-snug text-ink">
                  {GDPR.agree}
                  <span className="mt-1 block text-xs font-normal text-muted">{GDPR.text}</span>
                </label>
              </div>

              {/* min-h rezervuje místo pro hCaptchu, aby stránka při jejím načtení neposkočila */}
              <div className="min-h-[78px] w-full overflow-x-auto">
                {loadCaptcha && (
                  <Suspense fallback={null}>
                    <HCaptcha
                      sitekey={HCAPTCHA_SITE_KEY}
                      languageOverride={siteData.seo.lang}
                      onVerify={(token) => setCaptchaToken(token)}
                      ref={captchaRef}
                    />
                  </Suspense>
                )}
              </div>

              <div role="status" aria-live="polite">
                {status.kind !== 'idle' && status.kind !== 'sending' && (
                  <p
                    className={`flex items-start gap-3 rounded-sm p-4 text-sm font-semibold ${
                      status.kind === 'success'
                        ? 'border-l-4 border-primary bg-primary-soft text-ink'
                        : 'border-l-4 border-ink bg-concrete text-ink'
                    }`}
                  >
                    {status.kind === 'success' ? (
                      <FaCheckCircle aria-hidden="true" className="mt-0.5 shrink-0" />
                    ) : (
                      <FaExclamationTriangle aria-hidden="true" className="mt-0.5 shrink-0" />
                    )}
                    {status.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={status.kind === 'sending'}
                className={`${btn.primary} w-full disabled:cursor-wait disabled:opacity-70`}
              >
                {status.kind === 'sending' ? st.sending : cs.labels.submit}
              </button>
            </form>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Contact;
