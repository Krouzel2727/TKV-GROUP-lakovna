import { motion } from 'framer-motion';
import { siteData } from '../config/siteData';
import { fadeInUp } from '../utils/animations';
import { Container, Eyebrow } from './ui';
import { btn } from './buttons';

// Odkaz na sesterskou divizi – zobrazuje se v jejích barvách (data-brand)
const CtaSection = () => {
  const { title, subtitle, btnText, url } = siteData.ctaSection;

  return (
    <section className="bg-blueprint relative overflow-hidden bg-graphite py-16 sm:py-20">
      <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1.5 bg-primary" />
      <Container>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="max-w-2xl">
            <Eyebrow dark />
            <h2 className="mt-4 font-display text-3xl font-bold uppercase leading-tight tracking-tight text-white sm:text-4xl">{title}</h2>
            <p className="mt-3 text-lg text-silver">{subtitle}</p>
          </div>
          <a href={url} target="_blank" rel="noreferrer" className={`${btn.primary} shrink-0 self-start lg:self-auto`}>
            {btnText} <span aria-hidden="true">↗</span>
          </a>
        </motion.div>
      </Container>
    </section>
  );
};

export default CtaSection;
