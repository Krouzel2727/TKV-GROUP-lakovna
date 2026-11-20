import { lazy, Suspense, useEffect, useRef, useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import type HCaptchaType from '@hcaptcha/react-hcaptcha';
import { FaPhoneAlt, FaEnvelope, FaClock, FaMapMarkerAlt, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { siteData } from '../config/siteData';
import { fadeInUp } from '../utils/animations';
import { Container, SectionHeader } from './ui';
import { btn } from './buttons';

// Klíče jsou v souboru .env (viz .env.example)
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? '';
const HCAPTCHA_SITE_KEY = import.meta.env.VITE_HCAPTCHA_SITE_KEY ?? '';

// hCaptcha (cca 100 kB + skripty třetí strany) se načte až ve chvíli, kdy se návštěvník blíží k formuláři
const HCaptcha = lazy(() => import('@hcaptcha/react-hcaptcha'));

const inputClass =
  'w-full rounded-sm border border-line bg-white px-4 py-3 text-ink placeholder:text-muted/70 transition-colors focus:border-primary-strong focus:outline-none focus:ring-2 focus:ring-primary/40';
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

  return (
    <section id="kontakt" className="bg-concrete py-20 sm:py-28">
      <Container>
        <SectionHeader index="05" eyebrow={cs.eyebrow} title={cs.title} lead={cs.lead} />

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Kontaktní údaje */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="space-y-6 lg:col-span-5"
          >
            <div className="chamfer bg-graphite p-7 text-white sm:p-8">
              <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-white">{contacts.hala1.name}</h3>
              <dl className="mt-6 space-y-5">
                <div className="relative pl-9">
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60">
                    <FaMapMarkerAlt aria-hidden="true" className="absolute left-0 top-0.5 text-lg text-primary" />
                    {cs.addressLabel}
                  </dt>
                  <dd className="mt-1">
                      <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="font-medium text-white underline decoration-primary decoration-2 underline-offset-4 hover:text-primary">
                        {contacts.hala1.adres}
                      </a>
                      <span className="sr-only"> ({cs.navigateTitle})</span>
                  </dd>
                </div>
                <div className="relative pl-9">
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60">
                    <FaClock aria-hidden="true" className="absolute left-0 top-0.5 text-lg text-primary" />
                    {cs.hoursLabel}
                  </dt>
                  <dd className="mt-1 font-medium">{contacts.hala1.open}</dd>
                </div>
              </dl>
              <p className="mt-6 border-t border-white/10 pt-5 text-sm text-white/65">
                <span className="font-semibold text-primary">{cs.icoLabel}</span> {contacts.hala1.ico}
                <span className="mx-3 text-white/25">|</span>
                <span className="font-semibold text-primary">{cs.dicLabel}</span> {contacts.hala1.dico}
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted">{cs.peopleLabel}</h3>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {people.map((person) => (
                  <li key={person.name} className="border-l-4 border-primary bg-white p-5">
                    <p className="font-display text-xl font-bold uppercase tracking-tight text-ink">{person.name}</p>
                    <a href={`tel:${person.phone.replace(/\s+/g, '')}`} className="mt-3 flex items-center gap-2 font-semibold text-ink hover:text-primary-strong">
                      <FaPhoneAlt aria-hidden="true" className="text-sm text-primary-strong" />
                      {person.phone}
                    </a>
                    <a href={`mailto:${person.email}`} className="mt-1.5 flex items-center gap-2 break-all text-sm text-muted hover:text-primary-strong">
                      <FaEnvelope aria-hidden="true" className="shrink-0 text-sm text-primary-strong" />
                      {person.email}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Formulář */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: 0.1 }}
            id="formular"
            ref={formWrapRef}
            className="scroll-mt-28 bg-white p-6 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.25)] sm:p-10 lg:col-span-7"
          >
            <h3 className="font-display text-3xl font-bold uppercase tracking-tight">{cs.formTitle}</h3>
            <form ref={formRef} onSubmit={onSubmit} onFocus={() => setLoadCaptcha(true)} className="mt-8 space-y-5">
              <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="f-name" className={labelClass}>
                    {cs.labels.name} <span aria-hidden="true" className="text-primary-strong">*</span>
                  </label>
                  <input id="f-name" type="text" name="name" autoComplete="name" required className={inputClass} placeholder={cs.placeholders.name} />
                </div>
                <div>
                  <label htmlFor="f-phone" className={labelClass}>
                    {cs.labels.phone}
                  </label>
                  <input id="f-phone" type="tel" name="phone" autoComplete="tel" className={inputClass} placeholder={cs.placeholders.phone} />
                </div>
              </div>

              <div>
                <label htmlFor="f-email" className={labelClass}>
                  {cs.labels.email} <span aria-hidden="true" className="text-primary-strong">*</span>
                </label>
                <input id="f-email" type="email" name="email" autoComplete="email" required className={inputClass} placeholder={cs.placeholders.email} />
              </div>

              <div>
                <label htmlFor="f-message" className={labelClass}>
                  {cs.labels.message} <span aria-hidden="true" className="text-primary-strong">*</span>
                </label>
                <textarea id="f-message" name="message" rows={5} required className={`${inputClass} resize-y`} placeholder={cs.placeholders.message} />
              </div>

              <div className="flex items-start gap-3">
                <input
                  id="gdpr"
                  name="gdpr"
                  type="checkbox"
                  required
                  className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded-sm border-line accent-[var(--color-primary-strong)]"
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
                      status.kind === 'success' ? 'bg-primary-soft text-primary-strong' : 'bg-red-50 text-red-800'
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

              <button type="submit" disabled={status.kind === 'sending'} className={`${btn.primary} w-full disabled:cursor-wait disabled:opacity-70`}>
                {status.kind === 'sending' ? st.sending : cs.labels.submit}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Mapa */}
        <div className="mt-6 h-80 overflow-hidden border border-line bg-line sm:h-96">
          <iframe
            src={contacts.mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={cs.mapTitle}
          />
        </div>
      </Container>
    </section>
  );
};

export default Contact;
