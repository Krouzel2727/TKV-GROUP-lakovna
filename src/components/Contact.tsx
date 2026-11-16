import { useRef, useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { FaPhone } from 'react-icons/fa';
import { FaMapLocationDot } from 'react-icons/fa6';
import { siteData } from '../config/siteData';
import { fadeInUp } from '../utils/animations';

// Klíče jsou v souboru .env (viz .env.example)
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? '';
const HCAPTCHA_SITE_KEY = import.meta.env.VITE_HCAPTCHA_SITE_KEY ?? '';

const inputClass =
  'w-full px-4 py-3 rounded-lg bg-bgLight border-none focus:ring-2 focus:ring-primary outline-none transition-shadow';
const labelClass = 'block text-sm font-semibold text-textMain mb-2';

const Contact = () => {
  const { contactSection: cs, contacts, GDPR } = siteData;
  const st = cs.status;

  const [result, setResult] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const captchaRef = useRef<HCaptcha>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contacts.hala1.adres)}`;

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult(st.sending);

    if (!captchaToken) {
      setResult(st.captchaMissing);
      return;
    }

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
        setResult(st.parseError);
        return;
      }

      if (data.success) {
        setResult(st.success);
        formRef.current?.reset();
        setCaptchaToken(null);
        captchaRef.current?.resetCaptcha();
      } else {
        setResult(`${st.errorPrefix}${data.message || st.unknownError}`);
      }
    } catch (err) {
      console.error('Chyba připojení:', err);
      setResult(`${st.connectionErrorPrefix}${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const resultClass =
    result === st.success
      ? 'bg-green-100 text-green-700'
      : result === st.sending
        ? 'bg-blue-100 text-blue-700'
        : 'bg-red-100 text-red-700';

  const people = [
    { person: contacts.roman, delay: 0.1 },
    { person: contacts.jakub, delay: 0.2 },
  ];

  return (
    <section id="kontakt" className="py-20 bg-bgLight">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-primary">{cs.title}</h2>

        <div className="max-w-5xl mx-auto mb-16">
          {/* Provozovna */}
          <div className="grid grid-cols-1 gap-8 mb-8">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border-l-4 border-primary flex flex-col sm:flex-row items-start sm:items-center gap-6"
            >
              <div className="bg-primary/10 p-5 rounded-full text-primary text-3xl shrink-0">
                <a
                  href={mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-textMain font-medium hover:text-primary transition-colors inline-block"
                  title={cs.navigateTitle}
                >
                  <FaMapLocationDot />
                </a>
              </div>
              <div className="flex-1 w-full">
                <a
                  href={mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-textMain font-medium hover:text-primary transition-colors inline-block"
                  title={cs.navigateTitle}
                >
                  <h3 className="text-xl md:text-2xl font-bold text-primary mb-2">{contacts.hala1.name}</h3>
                </a>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <a
                      href={mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-textMain font-medium hover:text-primary transition-colors inline-block"
                      title={cs.navigateTitle}
                    >
                      {contacts.hala1.adres}
                    </a>
                    <p className="text-textLight text-sm mt-1">{contacts.hala1.open}</p>
                  </div>
                  <div className="sm:flex sm:justify-end">
                    <div>
                      <p className="text-textLight text-sm font-medium">
                        <span className="text-primary font-bold">{cs.icoLabel}</span> {contacts.hala1.ico}
                      </p>
                      <p className="text-textLight text-sm font-medium mt-1">
                        <span className="text-primary font-bold">{cs.dicLabel}</span> {contacts.hala1.dico}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Kontaktní osoby */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {people.map(({ person, delay }) => (
              <motion.div
                key={person.name}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay }}
                className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-primary flex items-center gap-6"
              >
                <div className="bg-primary/10 p-4 rounded-full text-primary text-2xl shrink-0">
                  <FaPhone />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary mb-1">{person.name}</h3>
                  <a
                    href={`tel:${person.phone.replace(/\s+/g, '')}`}
                    className="text-textMain font-medium mb-1 block hover:text-primary transition-colors"
                  >
                    {person.phone}
                  </a>
                  <a
                    href={`mailto:${person.email}`}
                    className="text-textLight text-sm hover:text-primary transition-colors block"
                  >
                    {person.email}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mapa + formulář */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100">
          <div className="h-96 lg:h-auto min-h-[400px]">
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

          <div id="formular" className="p-5 sm:p-10 lg:p-14 scroll-mt-24 w-full">
            <h3 className="text-2xl font-bold text-primary mb-6">{cs.formTitle}</h3>
            <form ref={formRef} onSubmit={onSubmit} className="space-y-6">
              <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>{cs.labels.name}</label>
                  <input type="text" name="name" required className={inputClass} placeholder={cs.placeholders.name} />
                </div>
                <div>
                  <label className={labelClass}>{cs.labels.phone}</label>
                  <input type="tel" name="phone" className={inputClass} placeholder={cs.placeholders.phone} />
                </div>
              </div>

              <div>
                <label className={labelClass}>{cs.labels.email}</label>
                <input type="email" name="email" required className={inputClass} placeholder={cs.placeholders.email} />
              </div>

              <div>
                <label className={labelClass}>{cs.labels.message}</label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  className={`${inputClass} resize-none`}
                  placeholder={cs.placeholders.message}
                />
              </div>

              <div className="flex items-start gap-3 mt-4 mb-2">
                <div className="flex items-center h-5">
                  <input
                    id="gdpr"
                    name="gdpr"
                    type="checkbox"
                    required
                    className="w-5 h-5 border border-gray-300 rounded bg-bgLight text-primary focus:ring-2 focus:ring-primary/50 accent-primary cursor-pointer mt-0.5"
                  />
                </div>
                <label htmlFor="gdpr" className="text-sm font-medium text-textMain cursor-pointer leading-tight">
                  {GDPR.agree}
                  <span className="block text-textLight mt-1 font-normal text-xs mb-2">{GDPR.text}</span>
                </label>
              </div>

              <div className="w-full overflow-x-auto pb-2">
                <HCaptcha sitekey={HCAPTCHA_SITE_KEY} onVerify={(token) => setCaptchaToken(token)} ref={captchaRef} />
              </div>

              {result && <div className={`p-4 rounded-lg text-sm font-bold ${resultClass}`}>{result}</div>}

              <button
                type="submit"
                className="w-full bg-primary text-white font-bold py-4 rounded-lg hover:bg-green-500 transition-colors shadow-lg"
              >
                {cs.labels.submit}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
